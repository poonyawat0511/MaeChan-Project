import {
  axiosInstance,
  dayApi,
  stockPoApi,
  stockRequestListApi,
  targetApi,
  timeApi,
  userHospitalApi,
  warehouseApi,
} from "../api/api";
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
import { Times } from "../types/time";
import { Target } from "../types/target";
import { UserHospital } from "../types/user-hospital";
import { StockRequestList } from "../types/stock-request-list";
import { StockPo } from "../types/stock-po";
import { StockWarehouse } from "../types/stock-warehouse";

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

export const getUserHospital = async (): Promise<UserHospital[]> => {
  try {
    const response = await axiosInstance.get<UserHospital[]>(userHospitalApi);
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

export const getStockRequestList = async (): Promise<StockRequestList[]> => {
  try {
    const response = await axiosInstance.get<StockRequestList[]>(stockRequestListApi);
    return response.data;
  } catch (error) {
    console.error("Error fetching Stock Request List :", error);
    throw error;
  }
};

export const getStockPo = async (): Promise<StockPo[]> => {
  try {
    const response = await axiosInstance.get<StockPo[]>(stockPoApi);
    return response.data;
  } catch (error) {
    console.error("Error fetching Stock Po :", error);
    throw error;
  }
};

export const getStockWarehouse = async (): Promise<StockWarehouse[]> => {
  try {
    const response = await axiosInstance.get<StockWarehouse[]>(warehouseApi);
    return response.data;
  } catch (error) {
    console.error("Error fetching Stock Warehouse :", error);
    throw error;
  }
};