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
import { Role } from "@/utils/types/role";
import { UserHospital } from "@/utils/types/user-hospital";

interface UserHospitalTableProps {
  UserHospitals: UserHospital[];
  currentPage: number;
  onDelete: (userId: number) => void;
}

export default function UserHospitalTable({
  UserHospitals,
  onDelete,
}: UserHospitalTableProps) {
  const columns = [
    { key: "id", label: "ID" },
    { key: "firstName", label: "ขื่อ" },
    { key: "lastName", label: "นามสกุล" },
    { key: "email", label: "อีเมล" },
    { key: "role", label: "ตำแหน่ง" },
    { key: "officerId", label: "รหัสประจำตัวโรงพยาบาล" },
    { key: "lineId", label: "Line UID" },
    { key: "signaturePath", label: "ลายเซ็น" },
    { key: "actions", label: "ลบ" },
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
        <TableBody items={UserHospitals} emptyContent={"ไม่พบผู้ใช้"}>
          {(user) => (
            <TableRow
              key={user.id}
              className={
                UserHospitals.indexOf(user) % 2 === 0
                  ? "bg-white hover:bg-blue-50"
                  : "bg-gray-50 hover:bg-blue-50"
              }
            >
              {(columnKey) => (
                <TableCell>
                  {(() => {
                    const value = user[columnKey as keyof UserHospital];

                    if (columnKey === "officerId") {
                      return (
                        <span className="font-mono text-xs text-gray-500">
                          {user.id}
                        </span>
                      );
                    }
                    if (columnKey === "email") {
                      return (
                        <a
                          href={`mailto:${user.email}`}
                          className="text-blue-600 hover:underline"
                        >
                          {user.email}
                        </a>
                      );
                    }
                    if (columnKey === "role") {
                      return (
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
                      );
                    }
                    if (columnKey === "signaturePath") {
                      return user.signaturePath ? (
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
                          ไม่มีลายเซ็น
                        </span>
                      );
                    }
                    if (columnKey === "stockUserId") {
                      return user.officerId
                        ? `${user.officerId.officerId}`
                        : "-";
                    }
                    if (columnKey === "actions") {
                      return (
                        <Tooltip content="ลบผู้ใช้">
                          <Button
                            size="sm"
                            color="danger"
                            variant="light"
                            isIconOnly
                            className="flex items-center justify-center"
                            onPress={() => onDelete(user.id)}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </Tooltip>
                      );
                    }

                    return typeof value === "string" ||
                      typeof value === "number" ? (
                      value
                    ) : (
                      <span className="text-gray-400 italic text-sm">—</span>
                    );
                  })()}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="mt-4 text-sm text-gray-500 flex items-center gap-2">
        <ExclamationCircleIcon className="h-4 w-4 text-gray-400" />
        <span>Showing {UserHospitals.length} users</span>
      </div>
    </div>
  );
}
