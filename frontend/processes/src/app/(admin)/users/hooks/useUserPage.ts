import { useEffect, useState } from "react";
import { getUserHospital } from "@/utils/services/getApi";
import { axiosInstance, userHospitalApi } from "@/utils/api/api";
import { UserHospital } from "@/utils/types/user-hospital";
import { useAlert } from "@/components/alerts/GlobalAlertProvider";

export function useUserPage() {
  const [users, setUsers] = useState<UserHospital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const itemsPerPage = 10;
  const { showAlert } = useAlert();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const userData = await getUserHospital();
      setUsers(userData);
      setError(null);
    } catch {
      console.log("Session expired. Redirecting to sign-in...", error);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = (userId: number) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedUserId) return;
    try {
      await axiosInstance.delete(`${userHospitalApi}/${selectedUserId}`);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== selectedUserId)
      );
      showAlert(`Deleted user successfully!`, `success`);
    } catch (error) {
      showAlert(`Delete user failed!`, `danger`);
      console.error("Error deleting user:", error);
    } finally {
      setIsModalOpen(false);
      setSelectedUserId(null);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return {
    users,
    loading,
    searchQuery,
    currentPage,
    isModalOpen,
    selectedUserId,
    filteredUsers,
    paginatedUsers,
    totalPages,
    itemsPerPage,
    setSearchQuery,
    setCurrentPage,
    setIsModalOpen,
    handleConfirmDelete,
    handleDelete,
  };
}
