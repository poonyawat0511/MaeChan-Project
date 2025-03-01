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
} from "@heroui/react";

import DayCard from "@/components/cards/DayCard";
import { getNotifyDay, getNotifyTime } from "@/utils/services/getApi";
import { Days } from "@/utils/types/day";
import {
  ArrowPathIcon,
  CalendarDaysIcon,
  ClockIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import LoadingScreen from "@/components/loading/loading";
import UnauthorizedCard from "@/components/cards/UnauthorizedCard";
import { Times } from "@/utils/types/time";
import { axiosInstance, dayApi, timeApi } from "@/utils/api/api";
import DayFormModal from "@/components/modals/DayModalForm";
import TimeFormModal from "@/components/modals/TimeModalForm";

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

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const data = await getNotifyDay();
      const time = await getNotifyTime();
      setDays(data);
      setTimes(time);
      setIsAuthorized(true);
    } catch (error) {
      console.error("Error fetching stock days:", error);
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

  // Toggle active status of a day
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

  if (loading) {
    return <LoadingScreen message="Loading users..." />;
  }

  if (!isAuthorized) {
    return (
      <UnauthorizedCard message="No users available" onSignin={handleSignIn} />
    );
  }

  return (
    <div className="max-w-6xl py-8 p-10">
      {/* Parent Container with Flex Row */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Section: Main Info Card */}
        <Card className="flex-1 bg-gradient-to-r from-purple-500 to-blue-200">
          <CardBody className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6">
            <div className="flex items-center gap-4">
              <Avatar
                icon={<CalendarDaysIcon />}
                className="bg-white text-secondary"
                size="lg"
              />
              <div>
                <h2 className="text-white font-bold m-0 text-2xl">
                  Schedule Management
                </h2>
                <p className="text-primary-100">
                  Configure and manage your weekly schedule
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button
                color="default"
                variant="flat"
                startContent={<ArrowPathIcon />}
                isLoading={refreshing}
                onPress={fetchData}
              >
                Refresh Data
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Right Section: Time Selection Card */}
        <Card className="w-[300px] flex-shrink-0">
          <CardHeader className="px-6 py-4">
            <h4 className="text-lg font-semibold">Time Selector</h4>
          </CardHeader>
          <Divider />
          <CardBody className="p-6">
            <p className="text-gray-600 mb-4">
              Select a time slot for your schedule:
            </p>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  startContent={<ClockIcon className="h-5 w-5" />}
                  className="w-full justify-between"
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
                        <XMarkIcon />
                      </Button>
                    </div>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              color="primary"
              className="w-full mt-4"
              onPress={handleCreateTime}
            >
              Add New Time
            </Button>
          </CardBody>
        </Card>
      </div>

      {/* Weekly Schedule Section */}
      <Card className="mt-6">
        <CardHeader className="flex justify-between items-center px-6">
          <h3 className="text-xl font-semibold">Weekly Schedule</h3>
          <Badge color="primary" variant="flat">
            {days.length} Days Configured
          </Badge>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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

      {/* Modal for Creating & Editing */}
      <DayFormModal
        isOpen={isModalOpen} // Edit form uses this state
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
