"use client";
import {
  CardHeader,
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import {
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
  EllipsisVerticalIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

type UserHeaderCardProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  totalUsers: number;
};

export default function UserHeaderCard({
  searchQuery,
  setSearchQuery,
  totalUsers,
}: UserHeaderCardProps) {
  return (
    <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between px-6 py-5 border-b border-gray-100">
      <div className="flex items-center">
        <div className="mr-4">
          <div className="h-12 w-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl shadow-md flex items-center justify-center mr-4">
            <UserGroupIcon className="h-6 w-6 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-800">ผู้ใช้ทั้งหมด</h1>
          <p className="text-gray-500 text-sm">{totalUsers} ผู้ใช้ทั้งหมด</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 items-center">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-xs",
            inputWrapper:
              "bg-gray-50 hover:bg-gray-100 focus-within:bg-white border-2 border-gray-200",
          }}
          placeholder="ค้นหาผู้ใช้ ..."
          size="sm"
          startContent={<MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />}
          type="search"
          value={searchQuery}
          onValueChange={setSearchQuery}
          isClearable
        />

        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="bordered"
              className="min-w-0 px-2 border-gray-200"
              isIconOnly
            >
              <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="User actions">
            <DropdownItem
              key="export-users"
              startContent={<ArrowDownTrayIcon className="h-4 w-4" />}
            >
              ดาวน์โหลดข้อมูล
            </DropdownItem>
            <DropdownItem
              key="filter-options"
              startContent={<FunnelIcon className="h-4 w-4" />}
            >
              การกรอง
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </CardHeader>
  );
}
