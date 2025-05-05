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
import { useUserPage } from "./hooks/useUserPage";
import { motion } from "framer-motion";
import { UsersIcon } from "@heroicons/react/24/outline";

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

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
    return <LoadingScreen message="กำลังโหลดข้อมูลผู้ใช้..." />;
  }

  return (
    <motion.div 
      className="flex justify-center w-full min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl w-full">
        <motion.header className="mb-6" variants={itemVariants}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-blue-100 rounded-full">
              <UsersIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              จัดการผู้ใช้งานระบบ
            </h1>
          </div>
          <p className="text-gray-600 text-lg ml-14">
            ค้นหา เพิ่ม แก้ไข หรือลบข้อมูลผู้ใช้งานระบบได้ที่นี่
          </p>
        </motion.header>

        <motion.div variants={itemVariants}>
          <Card className="bg-white shadow-lg border border-blue-100 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
        <UserHeaderCard
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          totalUsers={totalItems}
        />

        <CardBody className="p-0 overflow-auto flex-grow">
          {users.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
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
                </motion.div>
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
        </motion.div>
      </div>

      <UserDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </motion.div>
  );
}