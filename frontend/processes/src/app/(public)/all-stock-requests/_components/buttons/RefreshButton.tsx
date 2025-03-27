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
    <Tooltip content="Refresh data">
      <Button
        isIconOnly
        color="default"
        variant="light"
        size="sm"
        className="min-w-unit-10 w-10 h-10 rounded-full"
        onPress={onClick}
        isLoading={loading}
      >
        {!loading && <ArrowPathIcon className="h-5 w-5" />}
      </Button>
    </Tooltip>
  );
}
