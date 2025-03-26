"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Button,
  Avatar,
  Badge,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
  Chip,
} from "@heroui/react";

import {
  getNotifyDay,
  getNotifyTime,
  getUserHospital,
} from "@/utils/services/getApi";
import { Days } from "@/utils/types/day";
import {
  ArrowPathIcon,
  CalendarDaysIcon,
  ClockIcon,
  XMarkIcon,
  UserPlusIcon,
  UserMinusIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Times } from "@/utils/types/time";
import LoadingScreen from "@/components/loading/loading";
import { axiosInstance, dayApi, targetApi, timeApi } from "@/utils/api/api";
import TimeFormModal from "@/app/(admin)/days/_components/TimeModalForm";
import { useAlert } from "@/components/alerts/GlobalAlertProvider";
import { UserHospital } from "@/utils/types/user-hospital";
import DayCard from "./_components/DayCard";
import { Target } from "@/utils/types/target";

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
        console.error("Error fetching selected users:", error,isAuthorized);
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
            <Card className="flex-1 bg-gradient-to-r from-purple-500 to-blue-200">
              <CardBody className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 sm:p-4">
                <div className="flex items-center gap-3">
                  <Avatar
                    icon={<CalendarDaysIcon />}
                    className="bg-white text-secondary"
                    size="md"
                  />
                  <div>
                    <h2 className="text-white font-bold m-0 text-lg sm:text-xl">
                      จัดการตารางเวลา
                    </h2>
                    <p className="text-primary-100 text-xs sm:text-sm">
                      กำหนดค่าและจัดการตารางงานรายสัปดาห์ของคุณ
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 mt-2 sm:mt-0">
                  <Button
                    color="default"
                    variant="flat"
                    startContent={<ArrowPathIcon />}
                    isLoading={refreshing}
                    onPress={fetchData}
                    size="sm"
                  >
                    รีเฟรชข้อมูล
                  </Button>
                </div>
              </CardBody>
            </Card>

            {/* Time Selection Card */}
            <Card className="w-full sm:w-auto sm:min-w-[220px] lg:max-w-[250px]">
              <CardHeader className="px-3 py-2">
                <h4 className="text-base font-semibold">เวลาที่แจ้งเตือน</h4>
              </CardHeader>
              <Divider />
              <CardBody className="p-3">
                <p className="text-gray-600 mb-2 text-xs sm:text-sm">
                  เพิ่มเวลาสำหรับตารางงานของคุณ:
                </p>
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="bordered"
                      startContent={<ClockIcon className="h-4 w-4" />}
                      className="w-full justify-between text-xs sm:text-sm"
                      size="sm"
                    >
                      {selectedTime}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Time selection">
                    {times.map((time) => (
                      <DropdownItem
                        key={time.id}
                        onPress={() => handleTimeSelect(time.time)}
                      >
                        <div className="flex justify-between items-center w-full">
                          {time.time}
                          <Button
                            size="sm"
                            variant="light"
                            color="danger"
                            onPress={() => handleDeleteTime(time.id)}
                          >
                            <XMarkIcon className="h-3 w-3" />
                          </Button>
                        </div>
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <Button
                  color="primary"
                  className="w-full mt-3 text-xs sm:text-sm"
                  size="sm"
                  onPress={handleCreateTime}
                >
                  เพิ่มเวลาการแจ้งเตือน
                </Button>
              </CardBody>
            </Card>
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
          <Card className="h-full flex flex-col">
            <CardHeader className="px-3 py-2 flex-shrink-0">
              <div className="flex justify-between items-center">
                <h4 className="text-base font-semibold">
                  ผู้ใช้สำหรับการแจ้งเตือน
                </h4>
                <Badge color="secondary" variant="flat">
                  {selectedUsers.length} คน
                </Badge>
              </div>
            </CardHeader>
            <Divider />

            {/* Selected Users Section */}
            <CardBody className="p-3 flex-1 overflow-hidden flex flex-col">
              <h5 className="text-xs font-medium text-gray-700 mb-2">
                เลือกผู้ใช้
              </h5>
              <div className="overflow-auto mb-3" style={{ maxHeight: "25%" }}>
                {paginatedSelectedUsers.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {paginatedSelectedUsers
                      .filter((user) => user != null)
                      .map((user) => (
                        <Chip
                          key={user.id}
                          onClose={() => handleRemoveUser(user.id)}
                          avatar={<Avatar name={user.firstName} size="sm" />}
                          variant="flat"
                          color="primary"
                          size="sm"
                        >
                          {user.firstName}
                        </Chip>
                      ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-xs">ไม่มีผู้ใช้ที่เลือก</p>
                )}
              </div>

              {totalSelectedPages > 1 && (
                <div className="flex justify-center mt-2 gap-2">
                  <Button
                    size="sm"
                    variant="flat"
                    onPress={() =>
                      setSelectedCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    isDisabled={selectedCurrentPage === 1}
                  >
                    ก่อนหน้า
                  </Button>
                  {[...Array(totalSelectedPages)].map((_, index) => (
                    <Button
                      key={index}
                      size="sm"
                      variant={
                        selectedCurrentPage === index + 1 ? "solid" : "flat"
                      }
                      onPress={() => setSelectedCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                  <Button
                    size="sm"
                    variant="flat"
                    onPress={() =>
                      setSelectedCurrentPage((prev) =>
                        Math.min(prev + 1, totalSelectedPages)
                      )
                    }
                    isDisabled={selectedCurrentPage === totalSelectedPages}
                  >
                    ถัดไป
                  </Button>
                </div>
              )}


              <Divider className="my-2" />

              {/* User Search */}
              <h5 className="text-xs font-medium text-gray-700 mb-2">
                เพิ่มผู้ใช้รับการแจ้งเตือน
              </h5>
              <Input
                placeholder="ค้นหาผู้ใช้ ..."
                startContent={
                  <MagnifyingGlassIcon className="h-3 w-3 text-gray-400" />
                }
                size="sm"
                className="mb-2"
                value={userSearchQuery}
                onChange={(e) => setUserSearchQuery(e.target.value)}
              />

              {/* User List */}
              <div className="overflow-auto flex-1">
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar name={user.firstName} size="sm" />
                        <div>
                          <p className="text-xs font-medium">{user.firstName}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <Button
                        isIconOnly
                        size="sm"
                        color="primary"
                        variant="light"
                        onPress={() => handleAddUser(user)}
                        disabled={selectedUsers.some(
                          (selectedUser) => selectedUser.id === user.id
                        )}
                      >
                        {selectedUsers.some(
                          (selectedUser) => selectedUser.id === user.id
                        ) ? (
                          <UserMinusIcon className="h-3 w-3" />
                        ) : (
                          <UserPlusIcon className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-xs text-center py-2">
                    ไม่พบผู้ใช้ที่ตรงกับคำค้นหา
                  </p>
                )}
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center mt-3 gap-2">
                  <Button
                    size="sm"
                    variant="flat"
                    onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    isDisabled={currentPage === 1}
                  >
                    ก่อนหน้า
                  </Button>
                  {[...Array(totalPages)].map((_, index) => (
                    <Button
                      key={index}
                      size="sm"
                      variant={currentPage === index + 1 ? "solid" : "flat"}
                      onPress={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                  <Button
                    size="sm"
                    variant="flat"
                    onPress={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    isDisabled={currentPage === totalPages}
                  >
                    ถัดไป
                  </Button>
                </div>
              )}

            </CardBody>
          </Card>
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
