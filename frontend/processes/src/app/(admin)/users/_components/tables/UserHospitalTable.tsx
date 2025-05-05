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
  Badge,
} from "@heroui/react";
import {
  TrashIcon,
  ExclamationCircleIcon,
  ChevronDownIcon,
  EnvelopeIcon,
  IdentificationIcon,
} from "@heroicons/react/24/solid";
import { Role } from "@/utils/types/role";
import { UserHospital } from "@/utils/types/user-hospital";
import SignaturePreviewModal from "../modals/SignaturePreviewModal";
import { motion } from "framer-motion";

interface UserHospitalTableProps {
  UserHospitals: UserHospital[];
  currentPage: number;
  onDelete: (userId: number) => void;
  onUpdateRole: (userId: number, role: Role) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

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
    { key: "officerId", label: "รหัสประจำตัว" },
    { key: "signaturePath", label: "ลายเซ็น" },
    { key: "actions", label: "จัดการ" },
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

  const getRoleBadgeColors = (role: Role) => {
    switch (role) {
      case "ADMIN":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "DIRECTOR":
        return "bg-green-100 text-green-800 border-green-200";
      case "APPROVER":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const allRoles: Role[] = [Role.APPROVER, Role.DIRECTOR, Role.ADMIN ,Role.USER];

  return (
    <motion.div 
      className="bg-white p-4 md:p-6 w-full h-full flex flex-col" 
      variants={container}
      initial="hidden"
      animate="show"
    >
      <Table
        aria-label="รายการผู้ใช้ในระบบ"
        className="w-full min-w-max"
        classNames={{
          th: "bg-blue-50 text-gray-700 font-semibold px-4 py-4 text-md",
          td: "px-4 py-4 text-md",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              className="sticky top-0 bg-blue-50 z-10"
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
                  ? "bg-white hover:bg-blue-50 transition-colors group animate-fadeIn"
                  : "bg-gray-50 hover:bg-blue-50 transition-colors group animate-fadeIn"
              }
              style={{
                animationDelay: `${UserHospitals.indexOf(user) * 50}ms`
              }}
            >
              {(columnKey) => (
                <TableCell>
                  {(() => {
                    const value = user[columnKey as keyof UserHospital];

                    if (columnKey === "officerId") {
                      return user.officerId?.officerId ? (
                        <div className="flex items-center gap-2">
                          <IdentificationIcon className="h-5 w-5 text-blue-500" />
                          <span className="font-medium">{user.officerId.officerId}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic text-md">ไม่ระบุ</span>
                      );
                    }

                    if (columnKey === "email") {
                      return (
                        <div className="flex items-center gap-2">
                          <EnvelopeIcon className="h-5 w-5 text-green-500" />
                        <a
                          href={`mailto:${user.email}`}
                            className="text-blue-600 hover:underline font-medium group-hover:text-blue-800"
                        >
                          {user.email}
                        </a>
                        </div>
                      );
                    }

                    if (columnKey === "role") {
                      return (
                        <Dropdown>
                          <DropdownTrigger>
                            <Button
                              variant="ghost"
                              endContent={<ChevronDownIcon className="h-4 w-4" />}
                              isLoading={updatingRoleId === user.id}
                              className={`px-4 py-2 rounded-full text-md font-medium border ${getRoleBadgeColors(user.role)}`}
                              aria-label={`เปลี่ยนตำแหน่งของ ${user.firstName} ${user.lastName}`}
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
                            className="text-md"
                          >
                            {allRoles.map((role) => (
                              <DropdownItem key={role} className="py-3">
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
                            alt={`ลายเซ็นของ ${user.firstName} ${user.lastName}`}
                            onClick={() => setPreviewUrl(imageUrl)}
                            className="w-20 h-20 object-contain border-2 border-gray-200 rounded-md shadow-sm cursor-pointer group-hover:border-blue-300 transition-all"
                          />
                          <div className="absolute inset-0 bg-blue-500 bg-opacity-0 group-hover:bg-opacity-10 flex items-center justify-center transition-all rounded-md">
                            <p className="text-xs font-medium text-white opacity-0 group-hover:opacity-100 bg-blue-800 bg-opacity-70 px-2 py-1 rounded">คลิกเพื่อดู</p>
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic text-md">ไม่มีลายเซ็น</span>
                      );
                    }

                    if (columnKey === "actions") {
                      return (
                        <Tooltip content="ลบผู้ใช้" color="danger">
                          <Button
                            size="md"
                            color="danger"
                            variant="flat"
                            isIconOnly
                            aria-label={`ลบผู้ใช้ ${user.firstName} ${user.lastName}`}
                            className="flex items-center justify-center h-10 w-10"
                            onPress={() => onDelete(user.id)}
                          >
                            <TrashIcon className="h-5 w-5" />
                          </Button>
                        </Tooltip>
                      );
                    }

                    if (columnKey === "firstName" || columnKey === "lastName") {
                      return <span className="font-medium">{value as string}</span>;
                    }

                    return typeof value === "string" || typeof value === "number" ? (
                      value
                    ) : (
                      <span className="text-gray-400 italic text-md">—</span>
                    );
                  })()}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <motion.div 
        className="mt-6 text-md text-gray-600 flex items-center gap-2 border-t border-gray-100 pt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <ExclamationCircleIcon className="h-5 w-5 text-blue-500" />
        <span>กำลังแสดง <b>{UserHospitals.length}</b> ผู้ใช้</span>
      </motion.div>

      {previewUrl && (
        <SignaturePreviewModal
          isOpen={!!previewUrl}
          onClose={() => setPreviewUrl(null)}
          imageUrl={previewUrl}
        />
      )}
    </motion.div>
  );
}
