"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Button,
  Tooltip,
  Image,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import {
  TrashIcon,
  ExclamationCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import SignaturePreviewModal from "../modals/SignaturePreviewModal";
import { Role } from "@/types/role";
import { UserHospital } from "@/types/user-hospital";

interface UserHospitalTableProps {
  UserHospitals: UserHospital[];
  currentPage: number;
  onDelete: (userId: number) => void;
  onUpdateRole: (userId: number, role: Role) => void;
}

export default function UserHospitalTable({
  UserHospitals,
  onDelete,
  onUpdateRole,
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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [updatingRoleId, setUpdatingRoleId] = useState<number | null>(null);

  const translateRoleToThai = (role: Role): string => {
    switch (role) {
      case "ADMIN":
        return "แอดมิน";
      case "APPROVER":
        return "ผู้ตรวจสอบ";
      case "DIRECTOR":
        return "ผู้อำนวยการ";
      case "USER":
        return "ผู้ใช้ทั่วไป";
      default:
        return role;
    }
  };

  const allRoles: Role[] = [Role.APPROVER, Role.DIRECTOR, Role.ADMIN];

  return (
    <div className="bg-white p-6 w-full h-full flex flex-col">
      <Table
        aria-label="User Hospital Table"
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
                      return user.officerId?.officerId || "-";
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
                        <Dropdown>
                          <DropdownTrigger>
                            <Button
                              size="sm"
                              variant="ghost"
                              endContent={<ChevronDownIcon className="h-4 w-4" />}
                              isLoading={updatingRoleId === user.id}
                              className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === "ADMIN"
                                ? "bg-purple-100 text-purple-800"
                                : user.role === "DIRECTOR"
                                  ? "bg-green-100 text-green-800"
                                  : user.role === "APPROVER"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                            >
                              {translateRoleToThai(user.role)}
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu
                            aria-label="เปลี่ยนตำแหน่ง"
                            onAction={async (selectedRole) => {
                              if (selectedRole === user.role) return;
                              setUpdatingRoleId(user.id);
                              try {
                                const res = await fetch(
                                  `/user-hospital/${user.id}/role?role=${selectedRole}`,
                                  {
                                    method: "PATCH",
                                    credentials: "include",
                                  }
                                );
                                if (res.ok) {
                                  onUpdateRole(user.id, selectedRole as Role);
                                } else {
                                  alert("เปลี่ยนตำแหน่งไม่สำเร็จ");
                                }
                              } catch {
                                alert("เกิดข้อผิดพลาดในการเปลี่ยนตำแหน่ง");
                              } finally {
                                setUpdatingRoleId(null);
                              }
                            }}
                          >
                            {allRoles.map((role) => (
                              <DropdownItem key={role}>
                                {translateRoleToThai(role)}
                              </DropdownItem>
                            ))}
                          </DropdownMenu>
                        </Dropdown>
                      );
                    }

                    if (columnKey === "signaturePath" || columnKey === "signature") {
                      const imageUrl = user.signaturePath ?? user.signature;
                      return imageUrl ? (
                        <div className="relative group">
                          <Image
                            src={imageUrl}
                            alt="Signature"
                            onClick={() => setPreviewUrl(imageUrl)}
                            className="w-16 h-16 object-contain border rounded-md shadow-sm cursor-pointer group-hover:opacity-90 transition-all"
                          />
                        </div>
                      ) : (
                        <span className="text-gray-400 italic text-sm">ไม่มีลายเซ็น</span>
                      );
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

                    return typeof value === "string" || typeof value === "number" ? (
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
        <span>กำลังแสดง {UserHospitals.length} ผู้ใช้</span>
      </div>

      {previewUrl && (
        <SignaturePreviewModal
          isOpen={!!previewUrl}
          onClose={() => setPreviewUrl(null)}
          imageUrl={previewUrl}
        />
      )}
    </div>
  );
}
