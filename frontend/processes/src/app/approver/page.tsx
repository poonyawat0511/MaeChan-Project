"use client";
import { Button, Chip, IconButton } from "@mui/material";
import "./style.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect, useState } from "react";
import { Task } from "@/utils/types/task";
import TaskCard from "@/components/Tasks/Task.Card";
import { StockRequest } from "@/utils/types/stock-request";
import generatePDF from "@/utils/pdf/generatePDF";
import PdfPreview from "@/components/Pdf/PdfPreview";
import { ArrowForward } from "@mui/icons-material";
import HorizontalLinearAlternativeLabelStepper from "@/share/stepper";

const camundaTaksApiApprover = `http://localhost:8081/engine-rest/task?candidateGroup=Approver`;
const camundaTaskSubmit = `http://localhost:8081/engine-rest/task`;
const stockRequestByTaskApi = (processInstanceId: string) =>
  `http://localhost:8081/stock-requests/task/${processInstanceId}`;

export default function ApproverPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [stockRequest, setStockRequest] = useState<StockRequest | null>(null);

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
      const response = await fetch(stockRequestByTaskApi(processInstanceId), {
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

  const handleSubmit = async (task: Task) => {
    try {
      // Extract token from cookies
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

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
          requestId: { value: stockRequest.id, type: "String" },
          stockSubjectPerson: { value: stockUserId, type: "String" },
        },
      };

      const response = await fetch(
        `${camundaTaskSubmit}/${task.id}/submit-form`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
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
    <div className="flex-1 py-1">
      <div className="mx-5 py-10 px-5 rounded-md">
        <div className="flex items-center gap-4 mb-6 justify-between">
          <h1 className="text-3xl font-bold text-gray-800 ml-5">
            Explore Task
          </h1>
          <IconButton
            sx={{
              backgroundColor: "inherit",
              color: "black",
              borderColor: "inherit",
            }}
          >
            <AccountCircleIcon />
          </IconButton>
        </div>

        <div className="px-2 py-2 flex">
          <div className="drop-shadow-xl p-5 bg-gray-300 rounded-xl flex-1 max-h-[32rem] max-w-[100%] overflow-auto scrollbar-hidden">
            <div className="mb-2">
              <h2 className="text-xl font-bold text-gray-600">
                Total Tasks:
                <Chip
                  label={tasks.length}
                  color="warning"
                  sx={{
                    fontSize: "0.875rem",
                    height: "24px",
                    padding: "0 8px",
                  }}
                />
              </h2>
            </div>
            <TaskCard
              tasks={tasks}
              onTaskClick={(task) => handleTaskClick(task)}
            />
          </div>

          <div className="drop-shadow-xl p-5 bg-gray-300 rounded-xl flex-1 max-h-[50rem] overflow-auto scrollbar-hidden ml-5 flex flex-col items-center">
            {selectedPdfUrl && (
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
                  <Button onClick={handleClosePreview} color="secondary">
                    X
                  </Button>
                  <Button
                    variant="outlined"
                    endIcon={<ArrowForward />}
                    color="secondary"
                    onClick={() => selectedTask && handleSubmit(selectedTask)}
                    sx={{
                      borderRadius: "20px",
                    }}
                  >
                    Approve
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
