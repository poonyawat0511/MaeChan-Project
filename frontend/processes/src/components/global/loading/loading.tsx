"use client";

import { Spinner } from "@heroui/react";

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = "Loading..." }) => {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" color="primary" />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
