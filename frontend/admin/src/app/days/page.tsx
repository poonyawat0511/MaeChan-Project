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

import DayCard from "@/components/cards/DayCard";
import {
  getNotifyDay,
  getNotifyTime,
  getStockUser,
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
import LoadingScreen from "@/components/loading/loading";
import UnauthorizedCard from "@/components/cards/UnauthorizedCard";
import { Times } from "@/utils/types/time";
import { axiosInstance, dayApi, targetApi, timeApi } from "@/utils/api/api";
import DayFormModal from "@/components/modals/DayModalForm";
import TimeFormModal from "@/components/modals/TimeModalForm";
import { StockUser } from "@/utils/types/stock-user";

export default function DayPage() {
  const [days, setDays] = useState<Days[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [editData] = useState<{
    id?: string;
    name: string;
    active: boolean;
  } | null>(null);
  const [editDataTime, setEditDataTime] = useState<{
    id?: string;
    time: string;
  } | null>(null);
  const [selectedTime, setSelectedTime] = useState("Select Time");
  const [times, setTimes] = useState<Times[]>([]);
  const [users, setUsers] = useState<StockUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<StockUser[]>([]);
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const LOCAL_STORAGE_KEY = "selectedUsers";

  useEffect(() => {
    const storedUsers = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedUsers) {
      setSelectedUsers(JSON.parse(storedUsers));
    }
  }, []);

  useEffect(() => {
    if (selectedUsers.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(selectedUsers));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, [selectedUsers]);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const data = await getNotifyDay();
      const time = await getNotifyTime();
      const user = await getStockUser();
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

  const handleCreateTime = () => {
    setEditDataTime(null);
    setIsTimeModalOpen(true);
  };

  const handleSubmit = async (data: { name: string; active?: boolean }) => {
    try {
      let response;
      console.log("Submitting data:", data);

      if (editData && editData.id) {
        response = await axiosInstance.patch(`${dayApi}/${editData.id}`, data);
      } else {
        response = await axiosInstance.post(dayApi, data);
      }

      console.log("Response:", response.data);
      fetchData();
      setIsModalOpen(false);
    } catch {
      console.error("Error submitting form:");
    }
  };

  const handleToggleActive = async (updatedDay: Days) => {
    try {
      const response = await axiosInstance.patch(`${dayApi}/${updatedDay.id}`, {
        name: updatedDay.name,
        active: updatedDay.active,
      });

      console.log("Updated Response:", response.data);

      setDays((prevDays) =>
        prevDays.map((day) => (day.id === updatedDay.id ? response.data : day))
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
    } catch (error) {
      console.error("Error submitting time:", error);
    }
  };

  const handleDeleteTime = async (id: string) => {
    try {
      await axiosInstance.delete(`${timeApi}/${id}`);
      setTimes((prevTimes) => prevTimes.filter((time) => time.id !== id));
      console.log("Time deleted successfully");
    } catch (error) {
      console.error("Error deleting time:", error);
    }
  };

  const handleSignIn = () => {
    window.location.href = "/signin";
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    console.log("Selected time:", time);
  };

  const handleAddUser = async (user: StockUser) => {
    if (
      !selectedUsers.some(
        (selectedUser) => selectedUser.stockUserId === user.stockUserId
      )
    ) {
      try {
        const response = await axiosInstance.post(targetApi, {
          targetUser: user.stockUserId,
        });

        console.log("User added successfully:", response.data);

        setSelectedUsers([...selectedUsers, user]);
      } catch (error) {
        console.error("Error adding user:", error);
      }
    }
  };

  const handleRemoveUser = async (stockUserId: string) => {
    try {
      const response = await axiosInstance.get(targetApi);
      const targetUsers = response.data;
      const targetRecord = targetUsers.find(
        (record: { id: string; targetUser: string }) =>
          record.targetUser === stockUserId
      );

      if (!targetRecord) {
        console.warn(
          `No matching target record found for stockUserId: ${stockUserId}`
        );
        return;
      }

      await axiosInstance.delete(`${targetApi}/${targetRecord.id}`);

      setSelectedUsers(
        selectedUsers.filter((user) => user.stockUserId !== stockUserId)
      );

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

  if (loading) {
    return <LoadingScreen message="Loading users..." />;
  }

  if (!isAuthorized) {
    return (
      <UnauthorizedCard message="No users available" onSignin={handleSignIn} />
    );
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
                      Schedule Management
                    </h2>
                    <p className="text-primary-100 text-xs sm:text-sm">
                      Configure and manage your weekly schedule
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
                    Refresh Data
                  </Button>
                </div>
              </CardBody>
            </Card>

            {/* Time Selection Card */}
            <Card className="w-full sm:w-auto sm:min-w-[220px] lg:max-w-[250px]">
              <CardHeader className="px-3 py-2">
                <h4 className="text-base font-semibold">Time Selector</h4>
              </CardHeader>
              <Divider />
              <CardBody className="p-3">
                <p className="text-gray-600 mb-2 text-xs sm:text-sm">
                  Add a time slot for your schedule:
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
                  Add New Time
                </Button>
              </CardBody>
            </Card>
          </div>

          {/* Weekly Schedule Section */}
          <Card className="flex-1 min-h-0 overflow-auto">
            <CardHeader className="flex justify-between items-center px-3 py-2">
              <h3 className="text-base sm:text-lg font-semibold">
                Weekly Schedule
              </h3>
              <Badge color="primary" variant="flat">
                {days.length} Days Configured
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
                <h4 className="text-base font-semibold">Target Users</h4>
                <Badge color="secondary" variant="flat">
                  {selectedUsers.length} Selected
                </Badge>
              </div>
            </CardHeader>
            <Divider />

            {/* Selected Users Section */}
            <CardBody className="p-3 flex-1 overflow-hidden flex flex-col">
              <h5 className="text-xs font-medium text-gray-700 mb-2">
                Selected Users
              </h5>
              <div className="overflow-auto mb-3" style={{ maxHeight: "25%" }}>
                {selectedUsers.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedUsers.map((user) => (
                      <Chip
                        key={user.stockUserId}
                        onClose={() => handleRemoveUser(user.stockUserId)}
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
                  <p className="text-gray-500 text-xs">No users selected</p>
                )}
              </div>

              <Divider className="my-2" />

              {/* User Search */}
              <h5 className="text-xs font-medium text-gray-700 mb-2">
                Add Users
              </h5>
              <Input
                placeholder="Search users..."
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
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <div
                      key={user.stockUserId}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar name={user.firstName} size="sm" />
                        <div>
                          <p className="text-xs font-medium">{user.lastName}</p>
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
                          (selectedUser) =>
                            selectedUser.stockUserId === user.stockUserId
                        )}
                      >
                        {selectedUsers.some(
                          (selectedUser) =>
                            selectedUser.stockUserId === user.stockUserId
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
                    No users found
                  </p>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Modal for Creating & Editing */}
      <DayFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editData ? "Edit Schedule" : "Create Schedule"}
        onSubmit={handleSubmit}
      />

      <TimeFormModal
        isOpen={isTimeModalOpen}
        onClose={() => setIsTimeModalOpen(false)}
        title="Create new time"
        onSubmit={handleSubmitTime}
      />
    </div>
  );
}
