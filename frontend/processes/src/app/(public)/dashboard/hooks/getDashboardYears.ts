import { axiosInstance } from "@/utils/api/api";

export const getDashboardYears = async (): Promise<number[]> => {
  const response = await axiosInstance.get<number[]>("/dashboard-summary/years");
  return response.data;
};
