"use client";
import React from "react";
import { Button, Tooltip } from "@heroui/react";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";

interface SortButtonProps {
  sortOrder: "asc" | "desc";
  onClick: () => void;
}

export default function SortButton({ sortOrder, onClick }: SortButtonProps) {
  return (
    <Tooltip content={`เรียงตามวันที่: ${sortOrder === "asc" ? "เก่าไปใหม่" : "ใหม่ไปเก่า"}`}>
      <Button
        onPress={onClick}
        className="rounded-full bg-white border border-gray-200 hover:bg-violet-50 hover:border-violet-200 text-gray-700 px-4 py-2 flex items-center gap-2 transition-all shadow-sm"
        variant="flat"
        size="sm"
        startContent={
          <ArrowsUpDownIcon className={`h-4 w-4 ${sortOrder === "asc" ? "text-indigo-600" : "text-purple-600"} transition-colors`} />
        }
      >
        <span className="font-medium">{sortOrder === "asc" ? "เรียงจากเก่าไปใหม่" : "เรียงจากใหม่ไปเก่า"}</span>
      </Button>
    </Tooltip>
  );
}
