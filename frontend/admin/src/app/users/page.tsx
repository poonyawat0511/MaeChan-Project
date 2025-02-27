"use client";

import { useEffect, useState } from "react";
import { StockUser } from "@/utils/types/stock-user";
import StockUserTable from "@/components/tables/stockUserTable";
import { getStockUser } from "@/utils/services/getApi";
import { axiosInstance, stockUserApi } from "@/utils/api/api";

export default function UserPage() {
  const [stockUsers, setStockUsers] = useState<StockUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStockUser();
        setStockUsers(data);
        setIsAuthorized(true);
      } catch (error) {
        console.error("Error fetching stock users:", error);
        setIsAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (stockUserId: string) => {
    try {
      await axiosInstance.delete(`${stockUserApi}/${stockUserId}`);
      setStockUsers((prevUsers) => prevUsers.filter((user) => user.stockUserId !== stockUserId));
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
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
      <h1 className="text-xl font-semibold mb-4">Stock Users</h1>
      <StockUserTable stockUsers={stockUsers} onClick={(stockUser) => handleDelete(stockUser.stockUserId)} />
    </div>
  );
}
