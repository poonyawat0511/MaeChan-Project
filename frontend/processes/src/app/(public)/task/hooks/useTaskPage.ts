"use client";
import { useState, useEffect } from "react";
import { Task } from "@/utils/types/task";
import { StockRequest } from "@/utils/types/stock-request";
import { StockRequestList } from "@/utils/types/stock-request-list";
import generatePDF from "@/utils/services/generatePDF";
import { getCamundaTasks, getStockRequestList } from "@/utils/services/getApi";
import { axiosInstance, camundaTaskSubmit, springRequestByTaskApi } from "@/utils/api/api";
import { getAuthenticatedUser } from "@/utils/auth/auth";
import { useAlert } from "@/components/alerts/GlobalAlertProvider";

export const useTaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>("USER");
  const [requestList, setRequestList] = useState<StockRequestList[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<() => void>(() => () => { });
  const { showAlert } = useAlert();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getAuthenticatedUser();
        if (user) setUserRole(user.role || "USER");

        const taskData = await getCamundaTasks();
        const stockRequestList = await getStockRequestList();

        setTasks(
          taskData.sort(
            (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
          )
        );
        setRequestList(stockRequestList);
      } catch {
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTaskClick = async (task: Task) => {
    setSelectedTask(task);
    try {
      const res = await axiosInstance.get<{ stockRequest: StockRequest }>(
        springRequestByTaskApi(task.processInstanceId)
      );
      const stockRequest = res.data?.stockRequest;
      if (!stockRequest) {
        setSelectedPdfUrl(null);
        setError("No stock request found for this task.");
        return;
      }
      const pdfUrl = generatePDF(stockRequest, requestList);
      setSelectedPdfUrl(pdfUrl);
    } catch {
      setSelectedPdfUrl(null);
      setError("Failed to generate PDF.");
    }
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

      const response = await axiosInstance.get<{ stockRequest: StockRequest }>(
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
  };
};
