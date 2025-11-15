import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

// API Endpoints
export const camundaTaksApiApprover =
  "/engine-rest/task?candidateGroup=Approver";
export const camundaTaksApiDirector =
  "/engine-rest/task?candidateGroup=Director";
export const camundaTaskSubmit = "/engine-rest/task";
export const springRequestByTaskApi = (processInstanceId: string) =>
  `/spring-requests/task/${processInstanceId}`;
export const requestApi = "/stock-requests";
export const requestPaginatedApi = "/stock-requests/paginated";
export const userHospitalApi = "/user-hospital";
export const userHospitalPaginatedApi = "/user-hospital/paginated"
export const dayApi = "/notify-days";
export const timeApi = "/notify-time"
export const targetApi = "/notify-target-user"
export const targetPaginatedApi = "/notify-target-user/paginated"
export const stockRequestListApi = "/stock-request-list"
export const stockPoApi = "/stock-po"
export const warehouseApi = "/stock-warehouse"
export const signOutApi = "/auth/signout"
export const signInApi = "/auth/signin"
export const departmentApi = "/stock-departments"
export const budgetApi = "/stock-budgets"
export const budgetPaginatedApi = "/stock-budgets/paginated"
export const budgetTypeApi = "stock-budget-types"
export const bugetListApi = "stock-budget-list"
export const budgetListPageApi = "stock-budget-list/paginated"
export const bugetListTrApi ="stock-buget-list-tr"
export const dashboardSummaryApi = "/dashboard-summary"
export const yearApi = "/dashboard-summary/years"
export const stockRequestListBatchApi = "/stock-request-list/batch"