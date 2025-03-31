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
        base: "w-full sm:w-64",
        inputWrapper:
          "bg-default-100 border-1 hover:bg-default-200/70 transition-all",
      }}
      placeholder="ค้นหาด้วยเลขที่ใบขอซื้อ"
      size="sm"
      startContent={<MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />}
      type="search"
      value={value}
      onValueChange={onChange}
      isClearable
    />
  );
}
