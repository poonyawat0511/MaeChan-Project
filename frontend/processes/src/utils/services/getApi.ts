import {
  axiosInstance,
  budgetApi,
  budgetListPageApi,
  budgetPaginatedApi,
  budgetTypeApi,
  bugetListApi,
  bugetListTrApi,
  dashboardSummaryApi,
  dayApi,
  departmentApi,
  requestPaginatedApi,
  stockPoApi,
  stockRequestListApi,
  stockRequestListBatchApi,
  targetApi,
  targetPaginatedApi,
  timeApi,
  userHospitalApi,
  userHospitalPaginatedApi,
  warehouseApi,
} from "../api/api";
import { StockRequest } from "../types/stock-request";
import { Task } from "../types/task";
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
import { getAuthenticatedUser } from "../auth/auth";
import { StockDepartment } from "../types/stock-department";
import { StockBudget } from "../types/stock-budget";
import { StockBudgetList } from "../types/stock-buget-list";
import { StockBudgetType } from "../types/stock-budget-type";
import { StockBudgetListTr } from "../types/stock-budget-list-tr";

// Function to get stock requests
import { Page } from "@/utils/types/page"; // ✅ สร้าง type เพิ่ม
import { DashboardSummaryDTO } from "../types/dashboardSummaryDTO";

export const getStockRequestsByPageTable = async (
  page = 0,
  size = 12,
  search = ""
): Promise<Page<StockRequest>> => {
  try {
    const response = await axiosInstance.get<Page<StockRequest>>(
      `${requestPaginatedApi}?page=${page}&size=${size}&search=${encodeURIComponent(search)}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching stock requests:", error);
    throw error;
  }
};


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
    // ✅ Fetch user role from `/auth/me`
    const user = await getAuthenticatedUser();
    if (!user) {
      throw new Error("User is not authenticated.");
    }

    const role = user.role || "USER";
    const apiUrl =
      role === "APPROVER"
        ? camundaTaksApiApprover
        : role === "DIRECTOR"
          ? camundaTaksApiDirector
          : "";

    if (!apiUrl) return [];

    // ✅ Fetch tasks based on role
    const response = await axiosInstance.get<Task[]>(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching Camunda tasks:", error);
    return [];
  }
};

export const getPaginatedCamundaTasks = async (
  page = 0,
  size = 10,
  sortBy: "created" | "priority" = "created",
  sortOrder: "asc" | "desc" = "desc"
): Promise<{ tasks: Task[]; total: number }> => {
  try {
    const user = await getAuthenticatedUser();
    if (!user) throw new Error("User is not authenticated.");

    const role = user.role || "USER";
    const candidateGroup =
      role === "APPROVER" ? "Approver" :
        role === "DIRECTOR" ? "Director" :
          null;

    if (!candidateGroup) return { tasks: [], total: 0 };

    const firstResult = page * size;

    // ใช้ endpoint แบบกำหนด params แยก ไม่ต้องแก้ path ตรงๆ
    const [taskRes, countRes] = await Promise.all([
      axiosInstance.get<Task[]>("/engine-rest/task", {
        params: {
          candidateGroup,
          firstResult,
          maxResults: size,
          sortBy,
          sortOrder,
        },
      }),
      axiosInstance.post<{ count: number }>("/engine-rest/task/count", {
        candidateGroup,
      }),
    ]);

    return {
      tasks: taskRes.data,
      total: countRes.data.count,
    };
  } catch (error) {
    console.error("Error fetching paginated Camunda tasks:", error);
    return { tasks: [], total: 0 };
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

export const getUserHospitalByPageTable = async (
  page = 0,
  size = 12,
  search = ""
): Promise<Page<UserHospital>> => {
  try {
    const response = await axiosInstance.get<Page<UserHospital>>(
      `${userHospitalPaginatedApi}?page=${page}&size=${size}&search=${search}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user Hospital :", error);
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

export const getNotifyTargetByPageTable = async (page = 0, size = 8): Promise<Page<Target>> => {
  try {
    const response = await axiosInstance.get<Page<Target>>(
      `${targetPaginatedApi}?page=${page}&size=${size}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching target user :", error);
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

export const getStockDepartments = async (): Promise<StockDepartment[]> => {
  try {
    const response = await axiosInstance.get<StockDepartment[]>(departmentApi);
    return response.data;
  } catch (error) {
    console.error("Error fetching Stock Departments :", error);
    throw error;
  }
}

export const getStockBugets = async (): Promise<StockBudget[]> => {
  try {
    const response = await axiosInstance.get<StockBudget[]>(budgetApi);
    return response.data;
  } catch (error) {
    console.error("Error fetching Stock Budgets :", error);
    throw error;
  }
}

export const getStockBugetsByPageTable = async (
  page = 0,
  size = 12,
): Promise<Page<StockBudget>> => {
  try {
    const response = await axiosInstance.get<Page<StockBudget>>(
      `${budgetPaginatedApi}?page=${page}&size=${size}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching stock budgets:", error);
    throw error;
  }
};

export const getStockBudgetType = async (): Promise<StockBudgetType[]> => {
  try {
    const response = await axiosInstance.get<StockBudgetType[]>(budgetTypeApi);
    return response.data;
  } catch (error) {
    console.error("Error fetching Stock Budget Type :", error);
    throw error;
  }
}

export const getStockBudgetList = async (): Promise<StockBudgetList[]> => {
  try {
    const response = await axiosInstance.get<StockBudgetList[]>(bugetListApi);
    return response.data;
  } catch (error) {
    console.error("Error fetching Stock Budget List :", error);
    throw error;
  }
}

export const getStockBugetsListByPageTable = async (
  page = 0,
  size = 12,
): Promise<Page<StockBudgetList>> => {
  try {
    const response = await axiosInstance.get<Page<StockBudgetList>>(
      `${budgetListPageApi}?page=${page}&size=${size}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Stock Budgets List:", error);
    throw error;
  }
};

export const getStockBudgetListTr = async (): Promise<StockBudgetListTr[]> => {
  try {
    const response = await axiosInstance.get<StockBudgetListTr[]>(bugetListTrApi);
    return response.data;
  } catch (error) {
    console.error("Error fetching Stock Budget List Tr :", error);
    throw error;
  }
}

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

  const response = await axiosInstance.get<DashboardSummaryDTO>(dashboardSummaryApi, {
    params,
  });

  return response.data;
};

export async function getStockRequestBatchList(requestIds: number[]): Promise<StockRequestList[]> {
  const res = await axiosInstance.post<StockRequestList[]>(
    stockRequestListBatchApi,
    requestIds
  );
  return res.data;
}
