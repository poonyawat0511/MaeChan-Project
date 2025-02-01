"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { StockUser } from "@/utils/types/stock-user";

interface AuthContextType {
  stockUser: StockUser | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [stockUser, setStockUser] = useState<StockUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        if (token.split(".").length === 3) {
          const decodedUser = jwtDecode<StockUser>(token);
          setStockUser(decodedUser);
        } else {
          console.error("Invalid token format");
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);
  
  const login = (token: string) => {
    try {
      if (token.split(".").length === 3) {
        localStorage.setItem("token", token);
        const decodedUser = jwtDecode<StockUser>(token);
        setStockUser(decodedUser);
      } else {
        throw new Error("Invalid token format");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setStockUser(null);
  };

  return (
    <AuthContext.Provider value={{ stockUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
