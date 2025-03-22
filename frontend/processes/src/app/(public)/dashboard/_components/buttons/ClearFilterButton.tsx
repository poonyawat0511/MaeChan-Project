"use client";
import React from "react";
import { Button } from "@heroui/react";

interface ClearFilterButtonProps {
  onClear: () => void;
}

export default function ClearFilterButton({ onClear }: ClearFilterButtonProps) {
  return (
    <Button
      size="sm"
      variant="bordered"
      className="ml-auto"
      onPress={onClear}
    >
      ล้างหน่วยงานที่เลือก
    </Button>
  );
}
