
import { NextRequest } from "next/server";
import { StockUser } from "../types/stock-user";
import { jwtDecode } from "jwt-decode";

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const decodeToken = (): StockUser | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Invalid Token", error);
    return null;
  }
};

export const extractUserFromCookie = (request: NextRequest) => {
  const token = request.cookies.get("jwt")?.value;

  if (!token) return null;

  try {
    return jwtDecode<{ role?: string }>(token);
  } catch (error) {
    console.error("Invalid JWT:", error);
    return null;
  }
};