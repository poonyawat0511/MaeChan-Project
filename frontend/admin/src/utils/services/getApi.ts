import { axiosInstance, dayApi, stockUserApi } from "../api/api";
import { Days } from "../types/day";
import { StockUser } from "../types/stock-user";

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
