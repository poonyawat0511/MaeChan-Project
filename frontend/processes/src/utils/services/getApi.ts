import { axiosInstance, dayApi, stockUserApi, targetApi, timeApi } from "../api/api";
import { StockRequest } from "../types/stock-request";
import { Task } from "../types/task";
import { jwtDecode } from "jwt-decode";
import {
  camundaTaksApiApprover,
  camundaTaksApiDirector,
  requestApi,
  springRequestByTaskApi,
} from "../api/api";
import { Days } from "../types/day";
import { StockUser } from "../types/stock-user";
import { Times } from "../types/time";
import { Target } from "../types/target";

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

export const getStockUser = async (): Promise<StockUser[]> => {
  try {
    const response = await axiosInstance.get<StockUser[]>(stockUserApi);
    return response.data;
  } catch (error) {
    console.error("Error fetching stock users:", error);
    throw error;
  }
};

export const getNotifyDay = async (): Promise<Days[]> => {
  try {
    const response = await axiosInstance.get<Days[]>(dayApi);
    return response.data;
  } catch (error) {
    console.error("Error fetching Days :", error);
    throw error;
  }
};

export const getNotifyTime = async (): Promise<Times[]> => {
  try {
    const response = await axiosInstance.get<Times[]>(timeApi);
    return response.data;
  } catch (error) {
    console.error("Error fetching Time :", error);
    throw error;
  }
};

export const getNotifyTarget = async (): Promise<Target[]> => {
  try {
    const response = await axiosInstance.get<Target[]>(targetApi);
    return response.data;
  } catch (error) {
    console.error("Error fetching Target :", error);
    throw error;
  }
};

