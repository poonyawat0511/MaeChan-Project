"use client";
import React from "react";
import { Calendar } from "lucide-react";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";

interface YearFilterProps {
  filterYear: number;
  allYears: number[];
  setFilterYear: (year: number) => void;
}

export default function YearFilter({
  filterYear,
  allYears,
  setFilterYear,
}: YearFilterProps) {
  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <Button variant="bordered" startContent={<Calendar size={16} />}>
          ปี: {filterYear}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="เลือกปี" variant="faded">
        {allYears.map((year) => (
          <DropdownItem key={year} onPress={() => setFilterYear(year)}>
            {year}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
