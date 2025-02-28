"use client";
import { useEffect, useState } from "react";
import { Task } from "@/utils/types/task";
import TaskCard from "@/components/global/cards/Task.Card";
import { StockRequest } from "@/utils/types/stock-request";
import generatePDF from "@/utils/pdf/generatePDF";
import { Button, Chip, Avatar, Tooltip } from "@heroui/react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DocumentIcon,
  UserIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import BlurModal from "@/components/global/modals/BlurModal";
import { useAlert } from "@/components/global/alerts/GlobalAlertProvider";
import axiosInstance, {
  camundaTaskSubmit,
  springRequestByTaskApi,
} from "@/utils/api/api";
import { jwtDecode } from "jwt-decode";
import { getCamundaTasks } from "@/utils/services/getApi";
import PdfPreview from "@/components/global/pdf/PdfPreview";
import LoadingScreen from "@/components/global/loading/loading";

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<() => void>(() => () => {});
  const { showAlert } = useAlert();
  const [userRole, setUserRole] = useState<string>("USER");

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      try {
        const decodedToken = jwtDecode<{ role?: string }>(token);
        setUserRole(decodedToken.role || "USER");
      } catch (error) {
        console.error("Invalid token", error);
        setUserRole("USER");
      }
    }

    const fetchTasks = async () => {
      try {
        const tasksData = await getCamundaTasks();
        setTasks(tasksData);
      } catch {
        setError("Error fetching tasks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const fetchStockRequestByTaskId = async (
    processInstanceId: string
  ): Promise<StockRequest | null> => {
    try {
      const response = await axiosInstance.get<StockRequest>(
        springRequestByTaskApi(processInstanceId)
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching stock request:", error);
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

      await axiosInstance.post(
        `${camundaTaskSubmit}/${task.id}/submit-form`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
    setSelectedTask(null);
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
    return <LoadingScreen message="Loading requests..." />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md max-w-md">
          <div className="flex items-center">
            <XCircleIcon className="h-6 w-6 mr-2" />
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 py-1 h-screen flex flex-col bg-gradient-to-br from-white to-gray-50">
      <div className="mx-auto w-full max-w-7xl py-6 px-6 rounded-md flex flex-col h-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              Task Management
              <Chip 
                color="secondary" 
                variant="flat" 
                radius="sm"
                size="sm" 
                className="ml-4 font-medium text-xs py-1 capitalize bg-violet-100 text-violet-700"
              >
                {userRole}
              </Chip>
            </h1>
            <p className="text-gray-500 mt-1">Review and approve pending requests</p>
          </div>
          
          <Tooltip content={`Logged in as ${userRole}`}>
            <Avatar
              size="md"
              icon={<UserIcon />}
              className="bg-violet-100 text-violet-700"
            />
          </Tooltip>
        </div>
        
        <div className="flex items-center justify-between gap-4 mb-6 pb-3 border-b border-gray-200">
          <div className="flex items-center">
            <Button
              onPress={handleSort}
              className="rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 flex items-center space-x-2 transition-all"
              variant="flat"
              size="sm"
            >
              {sortOrder === "asc" ? (
                <ArrowUpIcon className="h-4 w-4" />
              ) : (
                <ArrowDownIcon className="h-4 w-4" />
              )}
              <span>Sort by Date</span>
            </Button>
            
            <Chip className="ml-4" variant="flat" color="primary">
              {tasks.length} Pending
            </Chip>
          </div>
          
          <Tooltip content="View completed tasks">
            <Button
              variant="light"
              size="sm"
              className="text-gray-600"
              startContent={<ClockIcon className="h-4 w-4" />}
            >
              History
            </Button>
          </Tooltip>
        </div>

        <div className="flex justify-between gap-6 flex-grow h-full">
          {/* Task List Panel */}
          <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm flex-1 max-w-[30%] h-[calc(100vh-220px)] overflow-auto scrollbar-hidden">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                <div className="flex items-center gap-x-2">
                  <Chip
                    color="secondary"
                    variant="dot"
                    className="border-none"
                  />
                  <p>Pending Tasks</p>
                  <Chip radius="full" color="default" size="sm" className="ml-2">
                    {tasks.length}
                  </Chip>
                </div>
              </h2>
            </div>
            {tasks.length > 0 ? (
              <TaskCard
                tasks={tasks}
                onTaskClick={(task) => handleTaskClick(task)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <DocumentIcon className="h-12 w-12 mb-2 opacity-30" />
                <p className="text-center">No pending tasks</p>
              </div>
            )}
          </div>

          {/* PDF Preview Panel */}
          <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm flex-1 overflow-hidden ml-5 flex flex-col h-[calc(100vh-220px)] justify-center items-center">
            {selectedPdfUrl ? (
              <div className="w-full h-full flex flex-col flex-grow min-h-0">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                  <h3 className="font-medium text-gray-700">
                    {selectedTask?.name || "Document Preview"}
                  </h3>
                  <Chip color="warning" size="sm" variant="flat">Review Required</Chip>
                </div>
                
                <div className="flex-grow overflow-hidden rounded-md border border-gray-200">
                  <PdfPreview pdfUrl={selectedPdfUrl} />
                </div>
                
                <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-100">
                  <Button
                    className="rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
                    onPress={handleClosePreview}
                    size="sm"
                    startContent={<XMarkIcon className="h-4 w-4" />}
                  >
                    Close
                  </Button>
                  
                  <div className="flex gap-3">
                    <Button
                      className="rounded-md bg-red-50 hover:bg-red-100 text-red-600 transition-all"
                      startContent={<XCircleIcon className="h-4 w-4" />}
                      size="sm"
                      onPress={() => selectedTask && handleRejecte(selectedTask)}
                    >
                      Reject
                    </Button>
                    
                    <Button
                      className="rounded-md bg-green-50 hover:bg-green-100 text-green-600 transition-all"
                      endContent={<CheckCircleIcon className="h-4 w-4" />}
                      size="sm"
                      onPress={() => selectedTask && handleApprove(selectedTask)}
                    >
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400">
                <DocumentIcon className="h-16 w-16 mb-3 opacity-20" />
                <p className="text-lg font-medium text-gray-500 mb-1">No document selected</p>
                <p className="text-sm text-gray-400">Select a task from the list to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Confirmation Modal */}
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
