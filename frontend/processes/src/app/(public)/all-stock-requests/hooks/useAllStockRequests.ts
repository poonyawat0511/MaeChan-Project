import { useEffect, useState } from "react";
import { getStockRequestList, getStockRequests } from "@/utils/services/getApi";
import { StockRequest } from "@/utils/types/stock-request";
import { StockRequestList } from "@/utils/types/stock-request-list";

export const useAllStockRequests = () => {
  const [requests, setRequests] = useState<StockRequest[]>([]);
  const [requestList, setRequestList] = useState<StockRequestList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRequests = async () => {
    try {
      setRefreshing(true);
      const data = await getStockRequests();
      const list = await getStockRequestList();
      const sortedData = data.sort(
        (a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime()
      );
      setRequests(sortedData);
      setRequestList(list);
      setError(null);
    } catch (err) {
      console.error("Error fetching stock requests:", err);
      setError("Failed to load requests");
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return {
    requests,
    requestList,
    loading,
    error,
    refreshing,
    fetchRequests,
  };
};
