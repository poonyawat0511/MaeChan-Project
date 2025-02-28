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
} from "@heroui/react";

import DayCard from "@/components/cards/DayCard";
import { axiosInstance, dayApi } from "@/utils/api/api";
import { getNotifyDay } from "@/utils/services/getApi";
import { Days } from "@/utils/types/day";
import { ArrowPathIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import LoadingScreen from "@/components/loading/loading";
import UnauthorizedCard from "@/components/cards/UnauthorizedCard";

export default function DayPage() {
  const [days, setDays] = useState<Days[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const data = await getNotifyDay();
      setDays(data);
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

  const handleEdit = async (updatedDay: Days) => {
    try {
      const response = await axiosInstance.put(
        `${dayApi}/${updatedDay.id}`,
        updatedDay
      );
      setDays((prevDays) =>
        prevDays.map((day) => (day.id === updatedDay.id ? response.data : day))
      );
      console.log("Day updated successfully");
    } catch (error) {
      console.error("Error updating day:", error);
    }
  };

  const handleSignIn = () => {
    window.location.href = "/signin";
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
        <Card className="flex-1 bg-gradient-to-r from-primary-500 to-primary-700">
          <CardBody className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6">
            <div className="flex items-center gap-4">
              <Avatar
                icon={<CalendarDaysIcon />}
                className="bg-white text-primary"
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
            <Button
              color="default"
              variant="flat"
              startContent={<ArrowPathIcon />}
              isLoading={refreshing}
              onPress={fetchData}
            >
              Refresh Data
            </Button>
          </CardBody>
        </Card>

        {/* Right Section: Additional Info Card (Optional) */}
        <Card className="w-[300px] flex-shrink-0">
          <CardBody className="p-6">
            <h4 className="text-lg font-semibold">Additional Info</h4>
            <p className="text-gray-600">
              Here you can provide more details about the schedule,
              notifications, or important updates.
            </p>
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
              <DayCard key={day.id} days={[day]} onEdit={handleEdit} />
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
