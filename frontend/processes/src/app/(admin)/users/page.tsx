"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
} from "@heroui/react";

import { axiosInstance, userHospitalApi } from "@/utils/api/api";
import { useAlert } from "@/components/alerts/GlobalAlertProvider";
import LoadingScreen from "@/components/loading/loading";
import EmptyState from "@/components/emptys/EmptyState";
import { getUserHospital } from "@/utils/services/getApi";
import { UserHospital } from "@/utils/types/user-hospital";
import UserHospitalTable from "@/app/(admin)/users/_components/tables/UserHospitalTable";
import UserHeaderCard from "./_components/cards/UserHeaderCard";
import UserFooterCard from "./_components/cards/UserFooterCard";
import UserDeleteModal from "./_components/modals/UserDeleteModal";


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
        <UserHeaderCard
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          totalUsers={filteredUsers.length}
        />

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

        <UserFooterCard
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredUsers.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />

      </Card>

      <UserDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />

    </div>
  );
}
