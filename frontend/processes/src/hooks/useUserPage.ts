import { useCallback, useEffect, useState } from "react";
import { axiosInstance, userHospitalApi } from "@/utils/api/api";
import { useAlert } from "@/components/alerts/GlobalAlertProvider";
import { patchUserRole } from "@/utils/api/userHospital";
import { useDebounce } from "@/config/useDebounce";
import { Page } from "@/types/page";
import { Role } from "@/types/role";
import { UserHospital } from "@/types/user-hospital";

export function useUserPage() {
  const [users, setUsers] = useState<UserHospital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const itemsPerPage = 7;
  const debouncedSearch = useDebounce(searchQuery, 500);

  const { showAlert } = useAlert();

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<Page<UserHospital>>(
        `${userHospitalApi}/paginated?page=${currentPage - 1}&size=${itemsPerPage}&search=${debouncedSearch}`
      );
      setUsers(response.data.content);
      setTotalPages(response.data.totalPages);
      setTotalItems(response.data.totalElements);
    } catch (error) {
      showAlert("โหลดข้อมูลผู้ใช้ล้มเหลว", "danger");
      console.error("Error fetching paginated users:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, debouncedSearch, showAlert]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);


  const handleConfirmDelete = (userId: number) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedUserId) return;
    try {
      await axiosInstance.delete(`${userHospitalApi}/${selectedUserId}`);
      showAlert("ลบผู้ใช้สำเร็จ!", "success");
      fetchUsers();
    } catch {
      showAlert("ลบผู้ใช้ไม่สำเร็จ!", "danger");
    } finally {
      setIsModalOpen(false);
      setSelectedUserId(null);
    }
  };

  const updateUserRole = async (userId: number, newRole: Role) => {
    try {
      await patchUserRole(userId, newRole);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
      showAlert("เปลี่ยนตำแหน่งสำเร็จ!", "success");
    } catch {
      showAlert("เปลี่ยนตำแหน่งล้มเหลว!", "danger");
    }
  };

  return {
    users,
    loading,
    searchQuery,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    isModalOpen,
    selectedUserId,
    setSearchQuery,
    setCurrentPage,
    setIsModalOpen,
    handleConfirmDelete,
    handleDelete,
    updateUserRole,
  };
}
