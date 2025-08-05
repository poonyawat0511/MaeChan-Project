import { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

import { axiosInstance } from "../api/api";
import { UserHospital } from "@/types/user-hospital";

// ✅ Get JWT token from cookies (Client Side)
export const getTokenFromClient = (): string | null => {
  if (typeof window !== "undefined") {
    const cookies = document.cookie.split("; ").find(row => row.startsWith("jwt="));
    return cookies ? cookies.split("=")[1] : null;
  }
  return null;
};

// ✅ Get JWT token from cookies (Server Side)
export const getTokenFromServer = (request: NextRequest): string | null => {
  return request.cookies.get("jwt")?.value || null;
};

// ✅ Check if user is authenticated based on the token in cookies
export const isAuthenticated = (request?: NextRequest): boolean => {
  const token = request ? getTokenFromServer(request) : getTokenFromClient();
  return !!token;
};

// ✅ Decode JWT safely from cookies
export const decodeToken = (request?: NextRequest): UserHospital | null => {
  const token = request ? getTokenFromServer(request) : getTokenFromClient();
  if (!token) return null;

  try {
    const decoded = jwtDecode<UserHospital & { exp?: number }>(token);

    // ✅ Check if the token is expired
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      console.warn("Token expired");
      return null;
    }

    return decoded;
  } catch (error) {
    console.error("Invalid Token", error);
    return null;
  }
};

// ✅ Extract user from JWT in cookies for Middleware
export const extractUserFromCookie = (request: NextRequest): UserHospital | null => {
  return decodeToken(request);
};

// ✅ Fetch the logged-in user's details from `/auth/me`
export const getAuthenticatedUser = async (): Promise<UserHospital | null> => {
  try {
    const response = await axiosInstance.get<UserHospital>("/auth/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching authenticated user:", error);
    return null; // Return null if not authenticated
  }
};

// ✅ Fetch user role securely
export const getUserRole = async (): Promise<string | null> => {
  try {
    const response = await axiosInstance.get<{ role: string }>("/auth/me");

    if (!response.data.role) {
      console.warn("User role not found in response, defaulting to 'USER'");
      return "USER"; // ✅ Default role if missing
    }

    return response.data.role;
  } catch (error) {
    console.error("Error fetching user role:", error);
    return "USER"; // ✅ Default to USER in case of error
  }
};
