"use client";
import {
  CardHeader,
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tooltip,
} from "@heroui/react";
import {
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
  UserPlusIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

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
    <CardHeader className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
      <motion.div
        className="flex items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mr-4">
          <div className="h-14 w-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-md flex items-center justify-center">
            <UserGroupIcon className="h-7 w-7 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">ผู้ใช้ทั้งหมด</h1>
          <p className="text-gray-600 text-md">{totalUsers} ผู้ใช้ทั้งหมด</p>
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col md:flex-row w-full md:w-auto gap-3 items-center"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Input
          classNames={{
            base: "max-w-full md:max-w-xs",
            inputWrapper:
              "bg-white border-2 border-blue-200 hover:border-blue-300 focus-within:border-blue-400 shadow-sm h-12",
            input: "text-large font-medium"
          }}
          aria-label="ค้นหาผู้ใช้"
          placeholder="ค้นหาผู้ใช้ ..."
          size="lg"
          startContent={<MagnifyingGlassIcon className="h-5 w-5 text-blue-500" />}
          type="search"
          value={searchQuery}
          onValueChange={setSearchQuery}
          isClearable
        />
      </motion.div>
    </CardHeader>
  );
}
