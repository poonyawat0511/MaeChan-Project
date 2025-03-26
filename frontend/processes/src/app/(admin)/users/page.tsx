"use client";

import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Pagination,
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

import { axiosInstance, userHospitalApi } from "@/utils/api/api";
import { useAlert } from "@/components/alerts/GlobalAlertProvider";
import LoadingScreen from "@/components/loading/loading";
import EmptyState from "@/components/emptys/EmptyState";
import BlurModal from "@/components/modals/BlurModal";
import { getUserHospital } from "@/utils/services/getApi";
import { UserHospital } from "@/utils/types/user-hospital";
import UserHospitalTable from "@/app/(admin)/users/_components/UserHospitalTable";

export default function UserPage() {
  const [users, setUsers] = useState<UserHospital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const itemsPerPage = 10;
  const { showAlert } = useAlert();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const userData = await getUserHospital();
      setUsers(userData);
      setError(null);
    } catch {
      console.log("Session expired. Redirecting to sign-in...", error);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = (stockUserId: number) => {
    setSelectedUserId(stockUserId);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedUserId) return;
    try {
      await axiosInstance.delete(`${userHospitalApi}/${selectedUserId}`);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== selectedUserId)
      );
      showAlert(`Deteletd user successfully!`, `success`);
    } catch (error) {
      showAlert(`Deteletd user Failed!`, `danger`);
      console.error("Error deleting user:", error);
    } finally {
      setIsModalOpen(false);
      setSelectedUserId(null);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <LoadingScreen message="Loading users..." />;
  }

  return (
    <div className="flex justify-center w-full min-h-screen bg-gray-50 p-4 md:p-6">
      <Card className="bg-white shadow-md w-full flex flex-col border border-gray-100">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center">
            <div className="mr-4">
              <div className="h-12 w-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl shadow-md flex items-center justify-center mr-4">
                <UserGroupIcon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                ผู้ใช้ทั้งหมด
              </h1>
              <p className="text-gray-500 text-sm">
                {filteredUsers.length} ผู้ใช้ทั้งหมด
              </p>
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
              startContent={
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
              }
              type="search"
              value={searchQuery}
              onValueChange={setSearchQuery}
              isClearable
              aria-label="Search users"
            />

            <div className="flex gap-2">
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
          </div>
        </CardHeader>

        <CardBody className="p-0 overflow-auto flex-grow">
          {filteredUsers.length === 0 ? (
            <EmptyState
              message="ไม่พบผู้ใช้"
              subMessage={
                searchQuery
                  ? `ไม่พบผลลัพธ์ที่ตรงกับ "${searchQuery}"ลองใช้คำค้นหาอื่น`
                  : "ไม่มีผู้ใช้ที่พร้อมใช้งาน เพิ่มผู้ใช้ใหม่เพื่อเริ่มต้น"
              }
              showClearButton={!!searchQuery}
              onClear={() => setSearchQuery("")}
            />
          ) : (
            <UserHospitalTable
            UserHospitals={paginatedUsers}
            currentPage={currentPage}
            onDelete={handleConfirmDelete}
          />          
          )}
        </CardBody>

        <CardFooter className="flex justify-between items-center py-3 px-6 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Showing{" "}
            {Math.min(
              filteredUsers.length,
              (currentPage - 1) * itemsPerPage + 1
            )}{" "}
            - {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{" "}
            {filteredUsers.length} users
          </p>

          {filteredUsers.length > 0 && (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="flat"
                isDisabled={currentPage === 1}
                onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="text-gray-700"
              >
                Previous
              </Button>
              <Pagination
                color="secondary"
                page={currentPage}
                total={totalPages}
                onChange={setCurrentPage}
                showControls={false}
                className="mx-2"
              />
              <Button
                size="sm"
                variant="flat"
                isDisabled={currentPage === totalPages || totalPages === 0}
                onPress={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="text-gray-700"
              >
                Next
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>

      <BlurModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="ยืนยันการลบผู้ใช้"
        onAction={handleDelete}
        actionLabel="ยืนยัน"
      >
        <p>
        คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้รายนี้ การกระทำนี้ไม่สามารถย้อนกลับได้
        </p>
      </BlurModal>
    </div>
  );
}
