import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8081",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401 || error.response?.status === 403) {
//       window.location.href = "/signin";
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;

// API Endpoints
export const camundaTaksApiApprover =
  "/engine-rest/task?candidateGroup=Approver";
export const camundaTaksApiDirector =
  "/engine-rest/task?candidateGroup=Director";
export const camundaTaskSubmit = "/engine-rest/task";
export const springRequestByTaskApi = (processInstanceId: string) =>
  `/spring-requests/task/${processInstanceId}`;
export const requestApi = "/stock-requests";
