"use client";

import DayTable from "@/components/tables/dayTable";
import { axiosInstance, dayApi } from "@/utils/api/api";
import { getNotifyDay } from "@/utils/services/getApi";

import { Days } from "@/utils/types/day";
import { useEffect, useState } from "react";

export default function DayPage() {
  const [days, setDays] = useState<Days[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNotifyDay();
        setDays(data);
        setIsAuthorized(true);
      } catch (error) {
        console.error("Error fetching stock days:", error);
        setIsAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreate = async (newDay: Days) => {
    try {
      const response = await axiosInstance.post(`${dayApi}`, newDay);
      setDays((prevDays) => [...prevDays, response.data]);
      console.log("Day created successfully");
    } catch (error) {
      console.error("Error creating day:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`${dayApi}/${id}`);
      setDays((prevDays) => prevDays.filter((day) => day.id !== id));
      console.log("Day deleted successfully");
    } catch (error) {
      console.error("Error deleting day:", error);
    }
  };

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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isAuthorized) {
    return <p className="text-red-500">Unauthorized. Please log in.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Day Page</h1>
      <DayTable
        days={days}
        onCreate={handleCreate}
        onDelete={(days) => handleDelete(days.id)}
        onEdit={handleEdit}
      />
    </div>
  );
}
