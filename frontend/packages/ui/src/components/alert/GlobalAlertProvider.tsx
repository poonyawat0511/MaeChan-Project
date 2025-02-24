'use client'

import { Alert } from "@heroui/react";
import React, { createContext, useState, useContext, ReactNode } from "react";


type AlertType = "default" | "primary" | "secondary" | "success" | "warning" | "danger";

interface AlertState {
  message: string;
  type: AlertType;
  visible: boolean;
}

interface AlertContextProps {
  showAlert: (message: string, type?: AlertType, duration?: number) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const GlobalAlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<AlertState>({ message: "", type: "default", visible: false });

  const showAlert = (message: string, type: AlertType = "default", duration: number = 3000) => {
    setAlert({ message, type, visible: true });

    setTimeout(() => {
      setAlert((prev) => ({ ...prev, visible: false }));
    }, duration);
  };

  const hideAlert = () => setAlert((prev) => ({ ...prev, visible: false }));

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      {alert.visible && (
        <div className="fixed top-5 right-5 w-auto z-50">
          <Alert color={alert.type} title={alert.message} />
        </div>
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlert must be used within an AlertProvider");
  return context;
};
