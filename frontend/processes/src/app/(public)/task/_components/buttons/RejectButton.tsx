"use client";
import { Button } from "@heroui/react";
import { XCircleIcon } from "@heroicons/react/24/solid";

export default function RejectButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      className="rounded-md bg-red-50 hover:bg-red-100 text-red-600 transition-all"
      startContent={<XCircleIcon className="h-4 w-4" />}
      size="sm"
      onPress={onClick}
    >
      ไม่อนุมัติ
    </Button>
  );
}
