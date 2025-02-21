import { StockRequest } from "../types/stock-request";
import { camundaTaksApiApprover, camundaTaksApiDirector, requestApi, springRequestByTaskApi } from "../api/api";
import { Task } from "../types/task";
import { jwtDecode } from "jwt-decode";

export const getStockRequests = async (): Promise<StockRequest[]> => {
  try {
    const response = await fetch(requestApi, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch stock requests");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching stock requests:", error);
    throw error;
  }
};

// Function to get Camunda tasks based on user role
export const getCamundaTasks = async (): Promise<Task[]> => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("User is not authenticated.");
      }
  
      const decodedToken = jwtDecode<{ role?: string }>(token);
      const role = decodedToken.role || "USER";
      let apiUrl = "";
  
      if (role === "APPROVER") {
        apiUrl = camundaTaksApiApprover;
      } else if (role === "DIRECTOR") {
        apiUrl = camundaTaksApiDirector;
      }
  
      if (!apiUrl) return [];
  
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch tasks.");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching Camunda tasks:", error);
      throw error;
    }
  };
  
  // Function to fetch Stock Request by Task ID
  export const getStockRequestByTaskId = async (
    processInstanceId: string
  ): Promise<StockRequest | null> => {
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
  
      return await response.json();
    } catch (err) {
      console.error("Error fetching stock request:", err);
      return null;
    }
  };