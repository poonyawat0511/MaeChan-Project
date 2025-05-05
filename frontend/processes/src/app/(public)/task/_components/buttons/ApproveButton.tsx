"use client";
import { Button } from "@heroui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function ApproveButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      className="rounded-full bg-green-500 hover:bg-green-600 text-white transition-all shadow-md px-5 py-2"
      endContent={<CheckCircleIcon className="h-4 w-4" />}
      size="md"
      onPress={onClick}
      variant="flat"
    >
      <span className="font-medium">อนุมัติ</span>
    </Button>
  );
}
