"use client";
import "./style.css";
import { useEffect, useState } from "react";
import { Task } from "@/utils/types/task";
import TaskCard from "@/components/global/cards/Task.Card";
import { StockRequest } from "@/utils/types/stock-request";
import generatePDF from "@/utils/pdf/generatePDF";
import PdfPreview from "@/components/Pdf/PdfPreview";
import HorizontalLinearAlternativeLabelStepper from "@/share/stepper";
import { Button, Chip } from "@heroui/react";
import ArrowLeftIcon from "@/components/global/icons/arrowLeft.icon";
import XmarkIcon from "@/components/global/icons/x-mark.icon";
import { UserIcon } from "@heroicons/react/24/solid";
import ArrowRightIcon from "@/components/global/icons/arrowRight.icon";
import BlurModal from "@/components/global/modals/BlurModal";


const camundaTaksApiApprover = `http://localhost:8081/engine-rest/task?candidateGroup=Approver`;
const camundaTaskSubmit = `http://localhost:8081/engine-rest/task`;
const springRequestByTaskApi = (processInstanceId: string) =>
  `http://localhost:8081/spring-requests/task/${processInstanceId}`;

export default function ApproverPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [stockRequest, setStockRequest] = useState<StockRequest | null>(null);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<() => void>(() => () => {});

  useEffect(() => {
    const fetchCamundaApiApprover = async () => {
      try {
        const response = await fetch(camundaTaksApiApprover, {
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

    fetchCamundaApiApprover();
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
    confirmAction(() => executeReject(task));
  };

  const confirmAction = (action: () => void) => {
    setModalAction(() => action);
    setConfirmModalOpen(true);
  };

  const handleApprove = (task: Task) => {
    confirmAction(() => executeApprove(task));
  };

  const executeApprove = async (task: Task) => {
    try {
      const token = localStorage.getItem("jwt");

      if (!token) {
        setError("You must be logged in to approve this task.");
        return;
      }

      const stockRequest = await fetchStockRequestByTaskId(
        task.processInstanceId
      );
      if (!stockRequest) {
        setError("Stock request not found.");
        return;
      }

      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const stockUserId = decodedToken.stockUserId || "unknown";

      const requestBody = {
        variables: {
          requestId: { value: stockRequest.id.toString(), type: "String" },
          stockUserApprove: { value: stockUserId.toString(), type: "String" },
          requestComplete: {
            value: true,
            type: "Boolean",
          },
        },
      };

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
        throw new Error("Failed to submit task approval.");
      }

      alert("Task approved successfully!");
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
    } catch (err) {
      console.error("Error submitting task approval:", err);
      setError("Failed to approve task. Please try again.");
    }
    setConfirmModalOpen(false);
  };

  const executeReject = async (task: Task) => {
    try {
      const token = localStorage.getItem("jwt");

      if (!token) {
        setError("You must be logged in to approve this task.");
        return;
      }

      const stockRequest = await fetchStockRequestByTaskId(
        task.processInstanceId
      );
      if (!stockRequest) {
        setError("Stock request not found.");
        return;
      }

      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const stockUserId = decodedToken.stockUserId || "unknown";

      const requestBody = {
        variables: {
          requestId: { value: stockRequest.id.toString(), type: "String" },
          stockUserApprove: { value: stockUserId.toString(), type: "String" },
          requestComplete: {
            value: false,
            type: "Boolean",
          },
        },
      };

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
        throw new Error("Failed to submit task approval.");
      }

      alert("Task approved successfully!");
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
    } catch (err) {
      console.error("Error submitting task approval:", err);
      setError("Failed to approve task. Please try again.");
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

      setStockRequest(stockRequest);
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

  if (loading) {
    return <p>Request loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="flex-1 py-1 h-screen flex flex-col">
      <div className="mx-5 py-5 px-5 rounded-md flex flex-col h-full">
        <div className="flex items-center gap-4 mb-6 justify-between">
          <h1 className="text-3xl font-bold text-gray-800 ml-5">
            Explore Task
          </h1>
          <Button
            isIconOnly
            variant="ghost"
            className="border-transparent rounded-full"
          >
            <UserIcon className="border-1 rounded-full text-violet-300 text-sm" />
          </Button>
        </div>

        {/* Flex container for Task Card & PDF Preview */}
        <div className="flex justify-between gap-5 flex-grow h-full">
          {/* Task Card Section (Fixed Height & Scrollable) */}
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

          {/* PDF Preview Section */}
          <div
            className="p-5 bg-[#F8F8FF] rounded-xl flex-1 
            overflow-auto scrollbar-hidden ml-5 flex flex-col 
            h-[calc(100vh-150px)] justify-center items-center text-gray-500"
          >
            {selectedPdfUrl ? (
              <div className="w-full h-full flex flex-col flex-grow min-h-0">
                <div className="mb-3">
                  {stockRequest && (
                    <HorizontalLinearAlternativeLabelStepper
                      stockRequest={stockRequest}
                    />
                  )}
                </div>
                <PdfPreview pdfUrl={selectedPdfUrl} />
                <div className="flex justify-between items-center mt-3">
                  <Button
                    className="rounded-full border-none"
                    onPress={handleClosePreview}
                    color="danger"
                    variant="ghost"
                  >
                    <XmarkIcon />
                  </Button>
                  <div className="flex justify-between gap-5">
                    <Button
                      className="rounded-full"
                      variant="ghost"
                      startContent={<ArrowRightIcon />}
                      color="secondary"
                      onPress={() =>
                        selectedTask && handleRejecte(selectedTask)
                      }
                    >
                      Reject
                    </Button>
                    <Button
                      className="rounded-full"
                      variant="ghost"
                      endContent={<ArrowLeftIcon />}
                      color="secondary"
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
              <p className="text-xl font-semibold">PDF Preview</p>
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
