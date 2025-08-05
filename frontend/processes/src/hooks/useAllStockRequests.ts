import { useCallback, useEffect, useRef, useState } from "react";
import { getStockRequestBatchList, getStockRequestsByPageTable } from "@/utils/services/getApi";
import { Page } from "@/types/page";
import { StockRequest } from "@/types/stock-request";
import { StockRequestList } from "@/types/stock-request-list";

export const useAllStockRequests = (searchQuery: string) => {
  const [requests, setRequests] = useState<StockRequest[]>([]);
  const [requestList, setRequestList] = useState<StockRequestList[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const itemsPerPage = 12;

  const hasInitialized = useRef(false);

  const fetchRequests = useCallback(async (page = currentPage - 1) => {
    try {
      setRefreshing(true);

      const data: Page<StockRequest> = await getStockRequestsByPageTable(
        page, itemsPerPage, searchQuery, "asc"
      );      

      const requestIds = data.content.map((req) => req.requestId);
      const list = await getStockRequestBatchList(requestIds);

      setRequests(data.content);
      setRequestList(list);
      setTotalPages(data.totalPages);
      setError(null);
    } catch (err) {
      console.error("Error fetching stock requests:", err);
      setError("Failed to load requests");
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  }, [currentPage, searchQuery]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  useEffect(() => {
    if (!hasInitialized.current && totalPages > 0) {
      hasInitialized.current = true;
      setCurrentPage(totalPages);
    }
  }, [totalPages]);

  return {
    requests,
    loading,
    refreshing,
    error,
    fetchRequests,
    currentPage,
    setCurrentPage,
    totalPages,
    requestList
  };
};
