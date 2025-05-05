"use client";
import { Button } from "@heroui/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function ClosePreviewButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      className="rounded-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 transition-all shadow-sm"
      onPress={onClick}
      size="sm"
      variant="flat"
      startContent={<ArrowLeftIcon className="h-4 w-4" />}
    >
      <span className="font-medium">กลับ</span>
    </Button>
  );
}
