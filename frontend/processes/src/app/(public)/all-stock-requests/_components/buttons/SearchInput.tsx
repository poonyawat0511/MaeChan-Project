"use client";
import { Input } from "@heroui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <Input
      classNames={{
        base: "w-full sm:w-72",
        inputWrapper:
          "bg-white border border-gray-200 shadow-sm hover:border-violet-300 hover:shadow-md transition-all duration-150 h-10 rounded-lg",
        input: "text-sm",
        clearButton: "text-gray-400 hover:text-gray-600",
      }}
      placeholder="ค้นหาด้วยเลขที่ใบขอซื้อ"
      size="sm"
      startContent={
        <MagnifyingGlassIcon className="h-4 w-4 text-gray-500 flex-shrink-0" />
      }
      type="search"
      value={value}
      onValueChange={onChange}
      isClearable
      aria-label="ค้นหาใบขอซื้อ"
    />
  );
}
