"use client";

import { useState } from "react";
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { axiosInstance, timeApi } from "@/utils/api/api";
import { useAlert } from "@/components/alerts/GlobalAlertProvider";
import LoadingScreen from "@/components/loading/loading";
import DayCard from "./_components/cards/DayCard";
import TimeFormModal from "./_components/modals/TimeModalForm";
import ScheduleManagementCard from "./_components/cards/ScheduleManagementCard";
import TimeSelectorCard from "./_components/cards/TimeSelectorCard";
import TargetUsersCard from "./_components/cards/TargetUsersCard";
import { useDayPage } from "./hooks/useDayPage";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function DayPage() {
  const {
    days,
    times,
    users,
    loading,
    refreshing,
    userSearchQuery,
    currentPage,
    selectedCurrentPage,
    totalPages,
    paginatedSelectedUsers,
    setUserSearchQuery,
    setCurrentPage,
    setSelectedCurrentPage,
    totalSelectedPages,
    fetchData,
    handleToggleActive,
    handleDeleteTime,
    handleAddUser,
    handleRemoveUser,
    paginatedUsers,
  } = useDayPage();

  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [editDataTime, setEditDataTime] = useState<{ id?: string; time: string } | null>(null);
  const [selectedTime, setSelectedTime] = useState("รายการเวลาที่แจ้งเตือน");
  const { showAlert } = useAlert();

  const handleCreateTime = () => {
    setEditDataTime(null);
    setIsTimeModalOpen(true);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleSubmitTime = async (data: { time: string }) => {
    try {
      if (editDataTime?.id) {
        await axiosInstance.patch(`${timeApi}/${editDataTime.id}`, data);
      } else {
        await axiosInstance.post(timeApi, data);
      }
      fetchData();
      setIsTimeModalOpen(false);
      showAlert("เพิ่มเวลาใหม่สำเร็จ", "success");
    } catch (error) {
      showAlert("Time Create Failed", "danger");
      console.error("Error submitting time:", error);
    }
  };

  if (loading) {
    return <LoadingScreen message="กำลังโหลดข้อมูล..." />;
  }

  return (
    <div className="min-h-screen w-full p-5 overflow-auto bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.header
          className="mb-8 border-b border-gray-200 pb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-blue-100 rounded-full">
              <CalendarDaysIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              จัดการตารางแจ้งเตือนประจำสัปดาห์
            </h1>
          </div>
          <p className="text-gray-600 text-lg ml-14">
            ตั้งค่าวันที่ต้องการให้ระบบแจ้งเตือน เลือกเวลา และกำหนดผู้ใช้ที่จะได้รับการแจ้งเตือน
          </p>
        </motion.header>

        <div className="flex flex-col lg:flex-row gap-6 h-full">
          <div className="flex-1 flex flex-col gap-6 min-h-0">
            <div className="flex flex-col md:flex-row gap-5">
              <ScheduleManagementCard refreshing={refreshing} onRefresh={fetchData} />
              <TimeSelectorCard
                times={times}
                selectedTime={selectedTime}
                onSelect={handleTimeSelect}
                onDelete={handleDeleteTime}
                onCreate={handleCreateTime}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="flex-1 min-h-0 overflow-hidden rounded-xl border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex justify-between items-center px-5 py-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <CalendarDaysIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-blue-800">ตารางรายสัปดาห์</h3>
                    {days.length} วัน
                  </div>
                </CardHeader>
                <Divider />
                <CardBody className="p-5 overflow-auto bg-gradient-to-b from-white to-gray-50">
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {days.map((day) => (
                      <DayCard key={day.id} days={[day]} onActive={handleToggleActive} />
                    ))}
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </div>

          <div className="w-full lg:w-80 xl:w-96 min-h-0 flex flex-col">
            <TargetUsersCard
              users={users}
              userSearchQuery={userSearchQuery}
              onSearchChange={setUserSearchQuery}
              onAddUser={handleAddUser}
              onRemoveUser={handleRemoveUser}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              selectedCurrentPage={selectedCurrentPage}
              setSelectedCurrentPage={setSelectedCurrentPage}
              totalSelectedPages={totalSelectedPages}
              paginatedSelectedUsers={paginatedSelectedUsers}
              paginatedUsers={paginatedUsers}
            />
          </div>
        </div>
      </div>

      <TimeFormModal
        isOpen={isTimeModalOpen}
        onClose={() => setIsTimeModalOpen(false)}
        title="เพิ่มเวลาการแจ้งเตือน"
        onSubmit={handleSubmitTime}
      />
    </div>
  );
}
