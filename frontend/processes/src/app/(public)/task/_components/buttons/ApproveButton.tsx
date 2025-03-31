"use client";
import { Button } from "@heroui/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function ApproveButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      className="rounded-md bg-green-50 hover:bg-green-100 text-green-600 transition-all"
      endContent={<CheckCircleIcon className="h-4 w-4" />}
      size="sm"
      onPress={onClick}
    >
      อนุมัติ
    </Button>
  );
}
