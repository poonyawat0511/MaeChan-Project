"use client";
import React from "react";
import { Select, SelectItem } from "@heroui/react";
import { StockDepartment } from "@/utils/types/stock-department";

interface DepartmentFilterProps {
  selectedDepartments: string[];
  setSelectedDepartments: (departments: string[]) => void;
  stockDepartments: StockDepartment[];
}

export default function DepartmentFilter({
  selectedDepartments,
  setSelectedDepartments,
  stockDepartments,
}: DepartmentFilterProps) {
  return (
    <Select
      className="max-w-xs"
      label="เลือกหน่วยงาน"
      placeholder="ทั้งหมด"
      selectionMode="multiple"
      selectedKeys={selectedDepartments}
      onSelectionChange={(keys) =>
        setSelectedDepartments(Array.from(keys) as string[])
      }
    >
      {stockDepartments.map((dept) => (
        <SelectItem key={dept.departmentName}>
          {dept.departmentName}
        </SelectItem>
      ))}
    </Select>
  );
}
