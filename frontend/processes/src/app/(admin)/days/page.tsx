"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Badge,
} from "@heroui/react";

import {
  getNotifyDay,
  getNotifyTime,
  getUserHospital,
} from "@/utils/services/getApi";
import { Days } from "@/utils/types/day";
import { Times } from "@/utils/types/time";
import LoadingScreen from "@/components/loading/loading";
import { axiosInstance, dayApi, targetApi, timeApi } from "@/utils/api/api";
import TimeFormModal from "@/app/(admin)/days/_components/modals/TimeModalForm";
import { useAlert } from "@/components/alerts/GlobalAlertProvider";
import { UserHospital } from "@/utils/types/user-hospital";
import DayCard from "./_components/cards/DayCard";
import { Target } from "@/utils/types/target";
import TimeSelectorCard from "./_components/cards/TimeSelectorCard";
import ScheduleManagementCard from "./_components/cards/ScheduleManagementCard";
import TargetUsersCard from "./_components/cards/TargetUsersCard";

export default function DayPage() {
  const [days, setDays] = useState<Days[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [editDataTime, setEditDataTime] = useState<{
    id?: string;
    time: string;
  } | null>(null);
  const [selectedTime, setSelectedTime] = useState("รายการเวลาที่แจ้งเตือน");
  const [times, setTimes] = useState<Times[]>([]);
  const [users, setUsers] = useState<UserHospital[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<UserHospital[]>([]);
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const { showAlert } = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [selectedCurrentPage, setSelectedCurrentPage] = useState(1);
  const selectedUsersPerPage = 5;



  useEffect(() => {
    const fetchSelectedUsers = async () => {
      try {
        const response = await axiosInstance.get<Target[]>(targetApi);

        // Extract the actual user data from the targetUser field
        const users = response.data.map((record) => record.targetUser)
          .filter((user): user is UserHospital => user !== null);
        setSelectedUsers(users);
      } catch (error) {
        console.error("Error fetching selected users:", error, isAuthorized);
      }
    };

    fetchSelectedUsers();
  }, []);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const data = await getNotifyDay();
      const time = await getNotifyTime();
      const user = await getUserHospital();
      setDays(data);
      setTimes(time);
      setUsers(user);
      setIsAuthorized(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsAuthorized(false);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Reset pagination เมื่อมีการค้นหาใหม่
  useEffect(() => {
    setCurrentPage(1);
  }, [userSearchQuery]);

  useEffect(() => {
    setSelectedCurrentPage(1);
  }, [selectedUsers]);

  const handleCreateTime = () => {
    setEditDataTime(null);
    setIsTimeModalOpen(true);
  };

  const handleToggleActive = async (updatedDay: Days) => {
    try {
      const response = await axiosInstance.patch(`${dayApi}/${updatedDay.id}`, {
        name: updatedDay.name,
        active: updatedDay.active,
      });
      showAlert(`Update Active Status Sucessfully!`, `success`);
      console.log("Updated Response:", response.data);

      setDays((prevDays) =>
        prevDays.map((day) =>
          day.id === updatedDay.id ? (response.data as Days) : day
        )
      );
    } catch (error) {
      console.error("Error updating day:", error);
    }
  };

  const handleSubmitTime = async (data: { time: string }) => {
    try {
      let response;
      console.log("Submitting new time:", data);

      if (editDataTime && editDataTime.id) {
        response = await axiosInstance.patch(
          `${timeApi}/${editDataTime.id}`,
          data
        );
      } else {
        response = await axiosInstance.post(timeApi, data);
      }

      console.log("Response:", response.data);
      fetchData();
      setIsTimeModalOpen(false);
      showAlert("Time Created Successfully", "success");
    } catch (error) {
      showAlert("Time Create Failed", "danger");
      console.error("Error submitting time:", error);
    }
  };

  const handleDeleteTime = async (id: string) => {
    try {
      await axiosInstance.delete(`${timeApi}/${id}`);
      setTimes((prevTimes) => prevTimes.filter((time) => time.id !== id));
      showAlert("Time Deleted Successfully", "success");
      console.log("Time deleted successfully");
    } catch (error) {
      console.error("Error deleting time:", error);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    console.log("Selected time:", time);
  };

  const handleAddUser = async (user: UserHospital) => {
    if (!selectedUsers.some((selectedUser) => selectedUser.id === user.id)) {
      try {
        const response = await axiosInstance.post(targetApi, {
          targetUser: user.id,
        });

        showAlert("User Added Successfully", "success");
        console.log("User added successfully:", response.data);

        setSelectedUsers((prevUsers) => [...prevUsers, user]);
      } catch (error) {
        console.error("Error adding user:", error);
      }
    }
  };

  const handleRemoveUser = async (id: number) => {
    try {
      const response = await axiosInstance.get<Target[]>(targetApi);
      const targetUsers = response.data;

      // Find the target record that matches the user ID
      const targetRecord = targetUsers.find(
        (record) => record.targetUser.id === id
      );

      if (!targetRecord) {
        console.warn(`No matching target record found for UserId: ${id}`);
        return;
      }

      // Remove from API
      await axiosInstance.delete(`${targetApi}/${targetRecord.id}`);

      // Remove from state
      setSelectedUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== id)
      );

      showAlert("User Removed Successfully", "success");
      console.log(`User with API id ${targetRecord.id} removed successfully`);
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const totalSelectedPages = Math.ceil(selectedUsers.length / selectedUsersPerPage);
  const paginatedSelectedUsers = selectedUsers.slice(
    (selectedCurrentPage - 1) * selectedUsersPerPage,
    selectedCurrentPage * selectedUsersPerPage
  );


  if (loading) {
    return <LoadingScreen message="Loading users..." />;
  }

  return (
    <div className="h-screen w-full p-4 overflow-auto">
      {/* Main Layout - Using flex container for better responsiveness */}
      <div className="flex flex-col lg:flex-row gap-4 h-full">
        {/* Left Section (Schedule management + Weekly schedule) */}
        <div className="flex-1 flex flex-col gap-4 min-h-0">
          {/* Top Row with Schedule Management and Time Selector */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Schedule Management Card */}
            <ScheduleManagementCard refreshing={refreshing} onRefresh={fetchData} />


            {/* Time Selection Card */}
            <TimeSelectorCard
              times={times}
              selectedTime={selectedTime}
              onSelect={handleTimeSelect}
              onDelete={handleDeleteTime}
              onCreate={handleCreateTime}
            />
          </div>

          {/* Weekly Schedule Section */}
          <Card className="flex-1 min-h-0 overflow-auto">
            <CardHeader className="flex justify-between items-center px-3 py-2">
              <h3 className="text-base sm:text-lg font-semibold">
                ตารางรายสัปดาห์
              </h3>
              <Badge color="primary" variant="flat">
                {days.length} วันที่กำหนดไว้
              </Badge>
            </CardHeader>
            <Divider />
            <CardBody className="p-3 overflow-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {days.map((day) => (
                  <DayCard
                    key={day.id}
                    days={[day]}
                    onActive={handleToggleActive}
                  />
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right Section: Target Users Card */}
        <div className="w-full lg:w-72 xl:w-80 min-h-0 flex flex-col">
          <TargetUsersCard
            users={users}
            selectedUsers={selectedUsers}
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
            paginatedUsers={paginatedUsers}
            paginatedSelectedUsers={paginatedSelectedUsers}
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
