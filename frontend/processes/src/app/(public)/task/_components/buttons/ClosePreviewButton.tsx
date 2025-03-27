"use client";
import { Button } from "@heroui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function ClosePreviewButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      className="rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
      onPress={onClick}
      size="sm"
      startContent={<XMarkIcon className="h-4 w-4" />}
    >
      ปิด
    </Button>
  );
}
