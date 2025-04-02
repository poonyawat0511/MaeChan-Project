import { useEffect, useState } from "react";
import {
  axiosInstance,
  dayApi,
  targetApi,
  timeApi,
} from "@/utils/api/api";
import {
  getNotifyDay,
  getNotifyTime,
  getUserHospital,
  getNotifyTargetByPageTable,
} from "@/utils/services/getApi";
import { Days } from "@/utils/types/day";
import { Times } from "@/utils/types/time";
import { UserHospital } from "@/utils/types/user-hospital";
import { Target } from "@/utils/types/target";
import { useAlert } from "@/components/alerts/GlobalAlertProvider";

export function useDayPage() {
  const [days, setDays] = useState<Days[]>([]);
  const [times, setTimes] = useState<Times[]>([]);
  const [users, setUsers] = useState<UserHospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [paginatedTargetUsers, setPaginatedTargetUsers] = useState<UserHospital[]>([]);
  const [targetPage, setTargetPage] = useState(1);
  const [targetTotalPages, setTargetTotalPages] = useState(1);
  const [targetSearch, setTargetSearch] = useState("");

  const { showAlert } = useAlert();

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const [data, time, user] = await Promise.all([
        getNotifyDay(),
        getNotifyTime(),
        getUserHospital(),
      ]);
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

  const fetchPaginatedTargetUsers = async () => {
    try {
      const response = await getNotifyTargetByPageTable(targetPage - 1, usersPerPage);
      const users = response.content
        .map((record: Target) => record.targetUser)
        .filter((user): user is UserHospital => user !== null);

      setPaginatedTargetUsers(users);
      setTargetTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching paginated target users:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchPaginatedTargetUsers();
  }, [targetPage, targetSearch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [userSearchQuery]);

  const handleToggleActive = async (updatedDay: Days) => {
    try {
      const response = await axiosInstance.patch(`${dayApi}/${updatedDay.id}`, {
        name: updatedDay.name,
        active: updatedDay.active,
      });
      showAlert(`Update Active Status Successfully!`, `success`);
      setDays((prevDays) =>
        prevDays.map((day) =>
          day.id === updatedDay.id ? (response.data as Days) : day
        )
      );
    } catch (error) {
      console.error("Error updating day:", error);
    }
  };

  const handleDeleteTime = async (id: string) => {
    try {
      await axiosInstance.delete(`${timeApi}/${id}`);
      setTimes((prevTimes) => prevTimes.filter((time) => time.id !== id));
      showAlert("Time Deleted Successfully", "success");
    } catch (error) {
      console.error("Error deleting time:", error);
    }
  };

  const handleAddUser = async (user: UserHospital) => {
    try {
      await axiosInstance.post(targetApi, { targetUser: user.id });
      showAlert("User Added Successfully", "success");
      fetchPaginatedTargetUsers();
    } catch (error: unknown) {
      const status = (error as { response?: { status?: number } })?.response?.status;
  
      if (status === 409) {
        showAlert("ผู้ใช้นี้ถูกเพิ่มไปแล้ว", "warning");
      } else {
        showAlert("เกิดข้อผิดพลาดในการเพิ่มผู้ใช้", "danger");
        console.error("Error adding user:", error);
      }
    }
  };

  const handleRemoveUser = async (id: number) => {
    try {
      const response = await axiosInstance.get<Target[]>(targetApi);
      const targetRecord = response.data.find(
        (record) => record.targetUser?.id === id
      );

      if (!targetRecord) return;

      await axiosInstance.delete(`${targetApi}/${targetRecord.id}`);
      fetchPaginatedTargetUsers();
      showAlert("User Removed Successfully", "success");
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

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return {
    days,
    times,
    users,
    loading,
    refreshing,
    isAuthorized,
    userSearchQuery,
    currentPage,
    setUserSearchQuery,
    setCurrentPage,
    fetchData,
    handleToggleActive,
    handleDeleteTime,
    handleAddUser,
    handleRemoveUser,
    paginatedUsers,
    paginatedSelectedUsers: paginatedTargetUsers,
    selectedCurrentPage: targetPage,
    setSelectedCurrentPage: setTargetPage,
    totalSelectedPages: targetTotalPages,
    targetSearch,
    setTargetSearch,
  };
}
