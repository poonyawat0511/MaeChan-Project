"use client";
import { useEffect, useState } from "react";
import { Task } from "@/utils/types/task";
import TaskCard from "@/components/global/cards/Task.Card";
import { StockRequest } from "@/utils/types/stock-request";
import generatePDF from "@/utils/pdf/generatePDF";
import PdfPreview from "@/components/Pdf/PdfPreview";
import { Button, Chip } from "@heroui/react";
import ArrowLeftIcon from "@/components/global/icons/arrowLeft.icon";
import XmarkIcon from "@/components/global/icons/x-mark.icon";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DocumentIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import ArrowRightIcon from "@/components/global/icons/arrowRight.icon";
import BlurModal from "@/components/global/modals/BlurModal";
import { useAlert } from "@/components/global/alerts/GlobalAlertProvider";
import {
  camundaTaksApiApprover,
  camundaTaksApiDirector,
  camundaTaskSubmit,
  springRequestByTaskApi,
} from "@/utils/api/api";
import { jwtDecode } from "jwt-decode";
export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<() => void>(() => () => {});
  const { showAlert } = useAlert();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    let apiUrl = "";

    if (token) {
      try {
        const decodedToken = jwtDecode<{ role?: string }>(token);
        const role = decodedToken.role || "USER";
        setUserRole(role);

        if (role === "APPROVER") {
          apiUrl = camundaTaksApiApprover;
        } else if (role === "DIRECTOR") {
          apiUrl = camundaTaksApiDirector;
        }
      } catch (error) {
        console.error("Invalid token", error);
        setUserRole("USER");
      }
    } else {
      setUserRole("USER");
    }

    if (!apiUrl) return;

    const fetchCamundaTasks = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const tasksData: Task[] = await response.json();
        setTasks(tasksData);
      } catch (err) {
        setError("Error fetching tasks. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCamundaTasks();
  }, []);

  const fetchStockRequestByTaskId = async (processInstanceId: string) => {
    try {
      const response = await fetch(springRequestByTaskApi(processInstanceId), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch stock request");
      }

      const stockRequest: StockRequest = await response.json();
      return stockRequest;
    } catch (err) {
      console.error("Error fetching stock request:", err);
      setError("Failed to fetch stock request. Please try again.");
      return null;
    }
  };

  const handleRejecte = (task: Task) => {
    confirmAction(() => executeTaskAction(task, false));
  };

  const confirmAction = (action: () => void) => {
    setModalAction(() => action);
    setConfirmModalOpen(true);
  };

  const handleApprove = (task: Task) => {
    confirmAction(() => executeTaskAction(task, true));
  };

  const executeTaskAction = async (task: Task, approve: boolean) => {
    try {
      const token = localStorage.getItem("jwt");

      if (!token) {
        showAlert("You must be logged in to perform this action.", "warning");
        return;
      }

      const stockRequest = await fetchStockRequestByTaskId(
        task.processInstanceId
      );
      if (!stockRequest) {
        showAlert("Stock request not found.", "danger");
        return;
      }

      const decodedToken = jwtDecode<{ stockUserId?: string; role?: string }>(
        token
      );
      const stockUserId = decodedToken.stockUserId || "unknown";
      const userRole = decodedToken.role || "USER";

      let requestBody = {};

      if (userRole === "DIRECTOR") {
        requestBody = {
          variables: {
            requestId: { value: stockRequest.id.toString(), type: "String" },
            stockSubjectPerson: {
              value: stockUserId.toString(),
              type: "String",
            },
            approve: { value: approve, type: "Boolean" },
          },
        };
      } else {
        requestBody = {
          variables: {
            requestId: { value: stockRequest.id.toString(), type: "String" },
            stockUserApprove: { value: stockUserId.toString(), type: "String" },
            requestComplete: { value: approve, type: "Boolean" },
          },
        };
      }

      const response = await fetch(
        `${camundaTaskSubmit}/${task.id}/submit-form`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to ${approve ? "approve" : "reject"} task.`);
      }

      showAlert(
        `Task ${approve ? "approved" : "rejected"} successfully!`,
        approve ? "success" : "warning"
      );
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
      setSelectedPdfUrl(null);
      setSelectedTask(null);
    } catch (err) {
      console.error(`Error ${approve ? "approving" : "rejecting"} task:`, err);
      showAlert(
        `Failed to ${approve ? "approve" : "reject"} task. Please try again.`,
        "danger"
      );
    }
    setConfirmModalOpen(false);
  };

  const handleTaskClick = async (task: Task) => {
    setSelectedTask(task);
    try {
      const stockRequest = await fetchStockRequestByTaskId(
        task.processInstanceId
      );
      if (!stockRequest) {
        setSelectedPdfUrl(null);
        setError("No stock request found for this task.");
        return;
      }

      const pdfUrl = generatePDF(stockRequest);
      setSelectedPdfUrl(pdfUrl);
      setError(null);
    } catch (err) {
      console.error("Error generating PDF:", err);
      setSelectedPdfUrl(null);
      setError("Failed to generate PDF. Please try again.");
    }
  };

  const handleClosePreview = () => {
    setSelectedPdfUrl(null);
  };

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.created.localeCompare(b.created);
      } else {
        return b.created.localeCompare(a.created);
      }
    });

    setTasks(sortedTasks);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  if (loading) {
    return <p>Request loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="flex-1 py-1 h-screen flex flex-col">
      <div className="mx-5 py-5 px-5 rounded-md flex flex-col h-full">
        <h1 className="text-3xl font-bold text-gray-800 ml-5">
          Explore Task {userRole}
        </h1>
        <div className="flex items-center justify-between gap-4 mb-3 pb-4 border-b-2">
          <Button
            onPress={handleSort}
            className="rounded-full bg-transparent hover:text-black px-3"
          >
            {sortOrder === "asc" ? (
              <ArrowUpIcon className="h-5 w-5" />
            ) : (
              <ArrowDownIcon className="h-5 w-5" />
            )}
            <span className="ml-2">Sort by Date</span>
          </Button>
          <Button
            isIconOnly
            variant="ghost"
            className="border-transparent rounded-full"
          >
            <UserIcon className="border-2 rounded-full text-violet-300 text-sm" />
          </Button>
        </div>

        <div className="flex justify-between gap-5 flex-grow h-full">
          <div
            className="p-5 bg-[#F8F8FF] rounded-xl flex-1 max-w-[30%] 
                          h-[calc(100vh-150px)] overflow-auto scrollbar-hidden"
          >
            <div className="mb-2">
              <h2 className="text-xl font-bold text-gray-600">
                <div className="flex items-center gap-x-2">
                  {" "}
                  <Chip
                    color="secondary"
                    variant="dot"
                    className="border-none"
                  />
                  <p>To Do</p>
                  <Chip radius="full" color="default" className="ml-2">
                    {" "}
                    {tasks.length}
                  </Chip>
                </div>
              </h2>
            </div>
            <TaskCard
              tasks={tasks}
              onTaskClick={(task) => handleTaskClick(task)}
            />
          </div>

          <div
            className="p-5 bg-[#F8F8FF] rounded-xl flex-1 
            overflow-auto scrollbar-hidden ml-5 flex flex-col 
            h-[calc(100vh-150px)] justify-center items-center text-gray-500"
          >
            {selectedPdfUrl ? (
              <div className="w-full h-full flex flex-col flex-grow min-h-0">
                <PdfPreview pdfUrl={selectedPdfUrl} />
                <div className="flex justify-between items-center mt-3">
                  <Button
                    className="rounded-full bg-transparent hover:text-danger"
                    onPress={handleClosePreview}
                    color="default"
                  >
                    <XmarkIcon />
                  </Button>
                  <div className="flex justify-between gap-5">
                    <Button
                      className="rounded-full bg-transparent hover:text-danger"
                      startContent={<ArrowRightIcon />}
                      color="default"
                      onPress={() =>
                        selectedTask && handleRejecte(selectedTask)
                      }
                    >
                      Reject
                    </Button>
                    <Button
                      className="rounded-full bg-transparent hover:text-success"
                      endContent={<ArrowLeftIcon />}
                      color="default"
                      onPress={() =>
                        selectedTask && handleApprove(selectedTask)
                      }
                    >
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xl font-semibold">
                PDF Preview <DocumentIcon />
              </p>
            )}
          </div>
        </div>
      </div>
      <BlurModal
        isOpen={isConfirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onAction={modalAction}
        title="Decision Confirm"
        actionLabel="Confirm"
      >
        <p>Are you sure you want to proceed with this action?</p>
      </BlurModal>
    </div>
  );
}
