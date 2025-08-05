"use client";
import {
  Card,
  CardBody,
} from "@heroui/react";
import LoadingScreen from "@/components/loading/loading";
import EmptyState from "@/components/emptys/EmptyState";
import UserHospitalTable from "@/app/(admin)/users/_components/tables/UserHospitalTable";
import UserHeaderCard from "./_components/cards/UserHeaderCard";
import UserFooterCard from "./_components/cards/UserFooterCard";
import UserDeleteModal from "./_components/modals/UserDeleteModal";
import { useUserPage } from "../../../hooks/useUserPage";

export default function UserPage() {
  const {
    users,
    loading,
    searchQuery,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    isModalOpen,
    setSearchQuery,
    setCurrentPage,
    setIsModalOpen,
    handleConfirmDelete,
    handleDelete,
    updateUserRole,
  } = useUserPage();

  if (loading) {
    return <LoadingScreen message="Loading users..." />;
  }

  return (
    <div className="flex justify-center w-full min-h-screen bg-gray-50 p-4 md:p-6">
      <Card className="bg-white shadow-md w-full flex flex-col border border-gray-100">
        <UserHeaderCard
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          totalUsers={totalItems}
        />

        <CardBody className="p-0 overflow-auto flex-grow">
          {users.length === 0 ? (
            <EmptyState
              message="ไม่พบผู้ใช้"
              subMessage={
                searchQuery
                  ? `ไม่พบผลลัพธ์ที่ตรงกับ "${searchQuery}" ลองใช้คำค้นหาอื่น`
                  : "ไม่มีผู้ใช้ที่พร้อมใช้งาน เพิ่มผู้ใช้ใหม่เพื่อเริ่มต้น"
              }
              showClearButton={!!searchQuery}
              onClear={() => setSearchQuery("")}
            />
          ) : (
            <UserHospitalTable
              UserHospitals={users}
              currentPage={currentPage}
              onDelete={handleConfirmDelete}
              onUpdateRole={updateUserRole}
            />
          )}
        </CardBody>

        <UserFooterCard
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
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