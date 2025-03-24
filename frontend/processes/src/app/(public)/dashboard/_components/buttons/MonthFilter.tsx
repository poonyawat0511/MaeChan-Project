"use client";
import React from "react";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Calendar } from "lucide-react";

interface MonthOption {
    label: string;
    value: string;
}

interface MonthFilterProps {
    filterMonth: string;
    setFilterMonth: (month: string) => void;
    months: MonthOption[];
}

export default function MonthFilter({
    filterMonth,
    setFilterMonth,
    months,
}: MonthFilterProps) {
    return (
        <Dropdown backdrop="blur">
            <DropdownTrigger>
                <Button variant="bordered" startContent={<Calendar size={16} />}>
                    เดือน: {filterMonth}
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="เลือกเดือน" variant="faded">
                {months.map((month) => (
                    <DropdownItem
                        key={month.value}
                        onPress={() => setFilterMonth(month.value)}
                    >
                        {month.label}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
}
