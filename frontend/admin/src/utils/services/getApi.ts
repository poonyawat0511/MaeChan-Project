import { axiosInstance, dayApi, stockUserApi, timeApi } from "../api/api";
import { Days } from "../types/day";
import { StockUser } from "../types/stock-user";
import { Times } from "../types/time";

// Function to get stock requests
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
