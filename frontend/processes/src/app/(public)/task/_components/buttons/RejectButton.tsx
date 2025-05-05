"use client";
import { Button } from "@heroui/react";
import { XCircleIcon } from "@heroicons/react/24/outline";

export default function RejectButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      className="rounded-full bg-white border border-red-200 hover:bg-red-50 text-red-500 transition-all shadow-sm px-5 py-2"
      startContent={<XCircleIcon className="h-4 w-4" />}
      size="md"
      variant="flat"
      onPress={onClick}
    >
      <span className="font-medium">ไม่อนุมัติ</span>
    </Button>
  );
}
