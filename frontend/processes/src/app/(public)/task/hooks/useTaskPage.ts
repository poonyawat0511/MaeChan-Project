"use client";
import { useState, useEffect } from "react";
import { Task } from "@/utils/types/task";
import { SpringRequest } from "@/utils/types/spring-request";
import generatePDF from "@/utils/services/generatePDF";
import { getPaginatedCamundaTasks } from "@/utils/services/getApi";
import { axiosInstance, camundaTaskSubmit, springRequestByTaskApi } from "@/utils/api/api";
import { getAuthenticatedUser } from "@/utils/auth/auth";
import { useAlert } from "@/components/alerts/GlobalAlertProvider";
import { UserHospital } from "@/utils/types/user-hospital";

export const useTaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>("USER");
  const [springRequests, setSpringRequests] = useState<SpringRequest[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<() => void>(() => () => {});
  const [totalTasks, setTotalTasks] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [userHospitals, setUserHospitals] = useState<UserHospital[]>([]);

  const { showAlert } = useAlert();

  // 🔁 Load all user hospitals
  useEffect(() => {
    const fetchUserHospitals = async () => {
      try {
        const res = await axiosInstance.get<UserHospital[]>("/user-hospital");
        setUserHospitals(res.data);
      } catch (err) {
        console.error("Error fetching user hospitals:", err);
      }
    };
    fetchUserHospitals();
  }, []);

  // 🔁 Load tasks and stock requests
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getAuthenticatedUser();
        if (user) setUserRole(user.role || "USER");

        const { tasks: pagedTasks, total } = await getPaginatedCamundaTasks(page, size);

        const springData: (SpringRequest | null)[] = await Promise.all(
          pagedTasks.map((task) =>
            axiosInstance
              .get<SpringRequest>(springRequestByTaskApi(task.processInstanceId))
              .then((res) => res.data)
              .catch(() => null)
          )
        );

        setTasks(pagedTasks);
        setTotalTasks(total);
        setSpringRequests(springData.filter((r): r is SpringRequest => r !== null));
      } catch {
        setError("Error fetching task or stock requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, size, sortOrder]);

  // ✅ Click a task, generate PDF
  const handleTaskClick = async (task: Task) => {
    setSelectedTask(task);
    const spring = springRequests.find((s) => s.camundaTaskId === task.processInstanceId);
    if (!spring?.stockRequest) {
      setSelectedPdfUrl(null);
      setError("No stock request found for this task.");
      return;
    }

    const requester = userHospitals.find(
      (u) => u.officerId?.officerId === spring.stockRequest.stockUser?.officerId
    );
    const approver = userHospitals.find(
      (u) => u.officerId?.officerId === spring.stockRequest.stockUserApprove?.officerId
    );

    const signatures = {
      requesterSignature: requester?.signaturePath,
      approverSignature: approver?.signaturePath,
    };

    const pdfUrl = generatePDF(spring.stockRequest, [], signatures);
    setSelectedPdfUrl(pdfUrl);
  };

  const handleClosePreview = () => {
    setSelectedTask(null);
    setSelectedPdfUrl(null);
  };

  const confirmAction = (action: () => void) => {
    setModalAction(() => action);
    setConfirmModalOpen(true);
  };

  const handleApprove = (task: Task) => {
    confirmAction(() => executeTaskAction(task, true));
  };

  const handleReject = (task: Task) => {
    confirmAction(() => executeTaskAction(task, false));
  };

  const executeTaskAction = async (task: Task, approve: boolean) => {
    try {
      const user = await getAuthenticatedUser();
      if (!user?.id) {
        showAlert("User ID not found.", "warning");
        return;
      }

      const response = await axiosInstance.get<SpringRequest>(
        springRequestByTaskApi(task.processInstanceId)
      );
      const stockRequest = response.data?.stockRequest;
      if (!stockRequest?.requestId) {
        showAlert("Invalid stock request", "danger");
        return;
      }

      const requestBody =
        user.role === "DIRECTOR"
          ? {
              variables: {
                requestId: { value: stockRequest.requestId.toString(), type: "String" },
                stockSubjectPerson: { value: user.id.toString(), type: "String" },
                approve: { value: approve, type: "Boolean" },
              },
            }
          : {
              variables: {
                requestId: { value: stockRequest.requestId.toString(), type: "String" },
                stockUserApprove: { value: user.id.toString(), type: "String" },
                requestComplete: { value: approve, type: "Boolean" },
              },
            };

      await axiosInstance.post(`${camundaTaskSubmit}/${task.id}/submit-form`, requestBody);

      setTasks((prev) => prev.filter((t) => t.id !== task.id));
      showAlert(`Task ${approve ? "approved" : "rejected"} successfully`, approve ? "success" : "warning");
      handleClosePreview();
    } catch {
      showAlert("Failed to process task.", "danger");
    } finally {
      setConfirmModalOpen(false);
    }
  };

  const handleSort = () => {
    const sorted = [...tasks].sort((a, b) =>
      sortOrder === "asc"
        ? a.created.localeCompare(b.created)
        : b.created.localeCompare(a.created)
    );
    setTasks(sorted);
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return {
    tasks,
    selectedTask,
    selectedPdfUrl,
    userRole,
    error,
    loading,
    sortOrder,
    isConfirmModalOpen,
    modalAction,
    handleTaskClick,
    handleClosePreview,
    handleApprove,
    handleReject,
    handleSort,
    setConfirmModalOpen,
    page,
    size,
    setPage,
    setSize,
    totalTasks,
    springRequests,
  };
};
