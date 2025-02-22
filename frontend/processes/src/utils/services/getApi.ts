import axiosInstance from "../api/api";
import { StockRequest } from "../types/stock-request";
import { Task } from "../types/task";
import { jwtDecode } from "jwt-decode";
import {
  camundaTaksApiApprover,
  camundaTaksApiDirector,
  requestApi,
  springRequestByTaskApi,
} from "../api/api";

// Function to get stock requests
export const getStockRequests = async (): Promise<StockRequest[]> => {
  try {
    const response = await axiosInstance.get<StockRequest[]>(requestApi);
    return response.data;
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

    const response = await axiosInstance.get<Task[]>(apiUrl);
    return response.data;
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
    const response = await axiosInstance.get<StockRequest>(
      springRequestByTaskApi(processInstanceId)
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching stock request:", error);
    return null;
  }
};
