"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Button,
  Tooltip,
} from "@heroui/react";
import { TrashIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { StockUser } from "@/utils/types/stock-user";
import { Role } from "@/utils/types/role";

interface StockUserTableProps {
  stockUsers: StockUser[];
  currentPage: number;
  onDelete: (userId: string) => void;
}

export default function StockUserTable({
  stockUsers,
  onDelete,
}: StockUserTableProps) {
  const columns = [
    { key: "stockUserId", label: "ID" },
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "userHospitalId", label: "Hospital ID" },
    { key: "lineId", label: "Line UID" },
    { key: "signaturePath", label: "Signature" },
    { key: "actions", label: "Actions" },
  ];

  return (
    <div className="bg-white p-6 w-full h-full flex flex-col">
      <Table
        aria-label="Stock Users Table"
        className="w-full min-w-max"
        classNames={{
          th: "bg-gray-50 text-gray-600 font-medium px-4 py-3 text-sm",
          td: "px-4 py-3",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              className="sticky top-0 bg-gray-50 z-10"
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={stockUsers} emptyContent={"No users found"}>
          {(user) => (
            <TableRow
              key={user.stockUserId}
              className={
                stockUsers.indexOf(user) % 2 === 0
                  ? "bg-white hover:bg-blue-50"
                  : "bg-gray-50 hover:bg-blue-50"
              }
            >
              {(columnKey) => (
                <TableCell>
                  {columnKey === "stockUserId" ? (
                    <span className="font-mono text-xs text-gray-500">
                      {user.stockUserId}
                    </span>
                  ) : columnKey === "email" ? (
                    <a
                      href={`mailto:${user.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {user.email}
                    </a>
                  ) : columnKey === "role" ? (
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role.includes("ADMIN" as Role)
                          ? "bg-purple-100 text-purple-800"
                          : user.role.includes("DIRECTOR" as Role)
                          ? "bg-green-100 text-green-800"
                          : user.role.includes("APPROVER" as Role)
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  ) : columnKey === "signaturePath" ? (
                    user.signaturePath ? (
                      <div className="relative group">
                        <img
                          src={user.signaturePath}
                          alt="Signature"
                          className="w-16 h-16 object-contain border rounded-md shadow-sm group-hover:opacity-90 transition-all"
                        />

                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-md flex items-center justify-center transition-all"></div>
                      </div>
                    ) : (
                      <span className="text-gray-400 italic text-sm">
                        No Signature
                      </span>
                    )
                  ) : columnKey === "actions" ? (
                    <Tooltip content="Delete user">
                      <Button
                        size="sm"
                        color="danger"
                        variant="light"
                        isIconOnly
                        className="flex items-center justify-center"
                        onPress={() => onDelete(user.stockUserId)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </Tooltip>
                  ) : (
                    user[columnKey as keyof StockUser] || (
                      <span className="text-gray-400 italic text-sm">—</span>
                    )
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="mt-4 text-sm text-gray-500 flex items-center gap-2">
        <ExclamationCircleIcon className="h-4 w-4 text-gray-400" />
        <span>Showing {stockUsers.length} users</span>
      </div>
    </div>
  );
}
