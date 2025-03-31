"use client";
import { Button, Tooltip } from "@heroui/react";
import { ClockIcon } from "@heroicons/react/24/solid";

export default function HistoryButton() {
  return (
    <Tooltip content="ดูประวัติงานที่เสร็จสิ้น">
      <Button
        variant="light"
        size="sm"
        className="text-gray-600"
        startContent={<ClockIcon className="h-4 w-4" />}
      >
        ประวัติงานที่เสร็จสิ้น
      </Button>
    </Tooltip>
  );
}
