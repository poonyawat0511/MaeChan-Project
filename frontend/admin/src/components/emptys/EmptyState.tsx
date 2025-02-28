import React from "react";
import { Button } from "@heroui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface EmptyStateProps {
  message: string;
  subMessage?: string;
  showClearButton?: boolean;
  onClear?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  subMessage,
  showClearButton = false,
  onClear,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 p-6">
      <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <MagnifyingGlassIcon className="h-8 w-8 text-gray-400" />
      </div>
      <p className="text-gray-700 font-medium mb-1">{message}</p>
      {subMessage && (
        <p className="text-gray-500 text-sm text-center max-w-md">
          {subMessage}
        </p>
      )}
      {showClearButton && onClear && (
        <Button color="primary" variant="flat" className="mt-4" onPress={onClear}>
          Clear Search
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
