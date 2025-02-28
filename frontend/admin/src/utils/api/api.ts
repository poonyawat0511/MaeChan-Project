import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8081",
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

export const stockUserApi = "/stock-user";
export const dayApi = "/notify-days";
