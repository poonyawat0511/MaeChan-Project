"use client";

import { useState } from "react";
import { Badge, Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { axiosInstance, timeApi } from "@/utils/api/api";
import { useAlert } from "@/components/alerts/GlobalAlertProvider";
import LoadingScreen from "@/components/loading/loading";
import DayCard from "./_components/cards/DayCard";
import TimeFormModal from "./_components/modals/TimeModalForm";
import ScheduleManagementCard from "./_components/cards/ScheduleManagementCard";
import TimeSelectorCard from "./_components/cards/TimeSelectorCard";
import TargetUsersCard from "./_components/cards/TargetUsersCard";
import { useDayPage } from "./hooks/useDayPage";

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
    return <LoadingScreen message="Loading users..." />;
  }

  return (
    <div className="h-screen w-full p-4 overflow-auto">
      <div className="flex flex-col lg:flex-row gap-4 h-full">
        <div className="flex-1 flex flex-col gap-4 min-h-0">
          <div className="flex flex-col sm:flex-row gap-4">
            <ScheduleManagementCard refreshing={refreshing} onRefresh={fetchData} />

            <TimeSelectorCard
              times={times}
              selectedTime={selectedTime}
              onSelect={handleTimeSelect}
              onDelete={handleDeleteTime}
              onCreate={handleCreateTime}
            />
          </div>

          <Card className="flex-1 min-h-0 overflow-auto">
            <CardHeader className="flex justify-between items-center px-3 py-2">
              <h3 className="text-base sm:text-lg font-semibold">ตารางรายสัปดาห์</h3>
              <Badge color="primary" variant="flat">{days.length} วันที่กำหนดไว้</Badge>
            </CardHeader>
            <Divider />
            <CardBody className="p-3 overflow-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {days.map((day) => (
                  <DayCard key={day.id} days={[day]} onActive={handleToggleActive} />
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="w-full lg:w-72 xl:w-80 min-h-0 flex flex-col">
          <TargetUsersCard
            users={users}
            userSearchQuery={userSearchQuery}
            onSearchChange={setUserSearchQuery}
            onAddUser={handleAddUser}
            onRemoveUser={handleRemoveUser}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages} // ✅ แก้ตรงนี้
            selectedCurrentPage={selectedCurrentPage}
            setSelectedCurrentPage={setSelectedCurrentPage}
            totalSelectedPages={totalSelectedPages}
            paginatedSelectedUsers={paginatedSelectedUsers}
            paginatedUsers={paginatedUsers}
          />
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
