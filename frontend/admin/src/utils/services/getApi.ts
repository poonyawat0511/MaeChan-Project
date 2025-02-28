import { axiosInstance, stockUserApi } from "../api/api";
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
