"use client";
import React from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Chip,
} from "@heroui/react";
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
  const handleSelect = (key: string) => {
    if (!selectedDepartments.includes(key)) {
      setSelectedDepartments([...selectedDepartments, key]);
    }
  };

  const handleRemove = (key: string) => {
    setSelectedDepartments(selectedDepartments.filter((item) => item !== key));
  };

  return (
    <div className="w-full max-w-md space-y-3">
      <Autocomplete
        label="ค้นหาและเลือกหน่วยงาน"
        placeholder="พิมพ์ชื่อหน่วยงาน"
        defaultItems={stockDepartments.map((d) => ({
          key: d.departmentName,
          label: d.departmentName,
        }))}
        onSelectionChange={(key) => {
          if (typeof key === "string") handleSelect(key);
        }}
      >
        {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
      </Autocomplete>

      <div className="flex flex-wrap gap-2">
        {selectedDepartments.map((dept) => (
          <Chip key={dept} onClose={() => handleRemove(dept)} variant="flat">
            {dept}
          </Chip>
        ))}
      </div>
    </div>
  );
}
