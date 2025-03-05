import { NextRequest } from "next/server";

import { jwtDecode } from "jwt-decode";
import { userHospital } from "../types/user-hospital";

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const decodeToken = (): userHospital | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<userHospital & { exp?: number }>(token);

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

export const extractUserFromCookie = (
  request: NextRequest
): userHospital | null => {
  const token = request.cookies.get("jwt")?.value;
  if (!token) return null;

  try {
    return jwtDecode<userHospital>(token);
  } catch (error) {
    console.error("Invalid JWT:", error);
    return null;
  }
};
