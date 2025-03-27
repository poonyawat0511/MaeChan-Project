"use client";
import React from "react";
import { Button } from "@heroui/react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

interface SortButtonProps {
  sortOrder: "asc" | "desc";
  onClick: () => void;
}

export default function SortButton({ sortOrder, onClick }: SortButtonProps) {
  return (
    <Button
      onPress={onClick}
      className="rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 flex items-center space-x-2 transition-all"
      variant="flat"
      size="sm"
    >
      {sortOrder === "asc" ? (
        <ArrowUpIcon className="h-4 w-4" />
      ) : (
        <ArrowDownIcon className="h-4 w-4" />
      )}
      <span>เรียงตามวันที่</span>
    </Button>
  );
}
