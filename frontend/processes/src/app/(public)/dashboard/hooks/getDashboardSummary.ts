import { axiosInstance } from "@/utils/api/api";
import { DashboardSummaryDTO } from "@/utils/types/dashboardSummaryDTO";


export const getDashboardSummary = async (
    year: number,
    month: string,
    departments: string[]
  ): Promise<DashboardSummaryDTO> => {
    const params = {
      year: year.toString(),
      month,
      ...(departments.length > 0 && { departments: departments.join(",") }),
    };
  
    const response = await axiosInstance.get<DashboardSummaryDTO>("/dashboard-summary", {
      params,
    });
  
    return response.data;
  };
