import { useEffect, useState } from "react";
import { axiosInstance, dayApi, targetApi, timeApi } from "@/utils/api/api";
import { getNotifyDay, getNotifyTime, getUserHospital } from "@/utils/services/getApi";
import { Days } from "@/utils/types/day";
import { Times } from "@/utils/types/time";
import { UserHospital } from "@/utils/types/user-hospital";
import { Target } from "@/utils/types/target";
import { useAlert } from "@/components/alerts/GlobalAlertProvider";

export function useDayPage() {
  const [days, setDays] = useState<Days[]>([]);
  const [times, setTimes] = useState<Times[]>([]);
  const [users, setUsers] = useState<UserHospital[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<UserHospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCurrentPage, setSelectedCurrentPage] = useState(1);
  const usersPerPage = 5;
  const selectedUsersPerPage = 5;
  const { showAlert } = useAlert();

  useEffect(() => {
    const fetchSelectedUsers = async () => {
      try {
        const response = await axiosInstance.get<Target[]>(targetApi);
        const users = response.data
          .map((record) => record.targetUser)
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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [userSearchQuery]);

  useEffect(() => {
    setSelectedCurrentPage(1);
  }, [selectedUsers]);

  const handleToggleActive = async (updatedDay: Days) => {
    try {
      const response = await axiosInstance.patch(`${dayApi}/${updatedDay.id}`, {
        name: updatedDay.name,
        active: updatedDay.active,
      });
      showAlert(`Update Active Status Sucessfully!`, `success`);
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
    if (!selectedUsers.some((selectedUser) => selectedUser.id === user.id)) {
      try {
        await axiosInstance.post(targetApi, {
          targetUser: user.id,
        });
        showAlert("User Added Successfully", "success");
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
      const targetRecord = targetUsers.find(
        (record) => record.targetUser && record.targetUser.id === id
      );
  
      if (!targetRecord) {
        console.warn(`No matching target record found for UserId: ${id}`);
        return;
      }
  
      await axiosInstance.delete(`${targetApi}/${targetRecord.id}`);
  
      setSelectedUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== id)
      );
  
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

  const paginatedSelectedUsers = selectedUsers.slice(
    (selectedCurrentPage - 1) * selectedUsersPerPage,
    selectedCurrentPage * selectedUsersPerPage
  );

  return {
    days,
    times,
    users,
    selectedUsers,
    loading,
    refreshing,
    isAuthorized,
    userSearchQuery,
    currentPage,
    selectedCurrentPage,
    usersPerPage,
    selectedUsersPerPage,
    filteredUsers,
    paginatedUsers,
    paginatedSelectedUsers,
    setUserSearchQuery,
    setCurrentPage,
    setSelectedCurrentPage,
    fetchData,
    handleToggleActive,
    handleDeleteTime,
    handleAddUser,
    handleRemoveUser,
  };
}
