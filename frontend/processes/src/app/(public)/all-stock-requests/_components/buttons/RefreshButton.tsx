"use client";
import { Button, Tooltip } from "@heroui/react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function RefreshButton({
  onClick,
  loading,
}: {
  onClick: () => void;
  loading: boolean;
}) {
  return (
    <Tooltip content="รีเฟรชข้อมูล">
      <Button
        isIconOnly
        color="default"
        variant="bordered"
        size="sm"
        className="min-w-unit-10 w-10 h-10 rounded-full bg-white border-gray-200 shadow-sm hover:border-violet-300 hover:shadow-md transition-all duration-150"
        onPress={onClick}
        isLoading={loading}
        aria-label="รีเฟรชข้อมูล"
      >
        {!loading && <ArrowPathIcon className="h-4 w-4 text-gray-500" />}
      </Button>
    </Tooltip>
  );
}
