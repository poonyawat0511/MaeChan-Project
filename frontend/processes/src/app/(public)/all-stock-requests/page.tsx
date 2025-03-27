'use client'
import React, { useState, useEffect } from "react";
import generatePDF from "@/utils/services/generatePDF";
import { StockRequest } from "@/utils/types/stock-request";
import { getStockRequestList, getStockRequests } from "@/utils/services/getApi";
import LoadingScreen from "@/components/loading/loading";
import EmptyStateMessage from "@/components/emptys/EmptyStateMessage";
import { StockRequestList } from "@/utils/types/stock-request-list";
import StockRequestCard from "./_components/cards/StockRequestCard";
import StockRequestTable from "./_components/tables/StockRequest.table";
import SearchInput from "./_components/buttons/SearchInput";
import RefreshButton from "./_components/buttons/RefreshButton";
import DownloadCSVButton from "./_components/buttons/DownloadCSVButton";
import { Button } from "@heroui/button";
import { Pagination } from "@heroui/react";
import PdfPreviewModal from "./_components/modals/PdfPreviewModal";

export default function AllStockRequest() {
  const [requests, setRequests] = useState<StockRequest[]>([]);
  const [requestList, setRequestList] = useState<StockRequestList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openPdfModal, setOpenPdfModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const itemsPerPage = 12;

  const fetchRequests = async () => {
    try {
      setRefreshing(true);
      const data = await getStockRequests();
      const stockRequestList = await getStockRequestList();

      const sortedData = data.sort(
        (a: StockRequest, b: StockRequest) =>
          new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime()
      );

      setRequests(sortedData);
      setRequestList(stockRequestList);
      setError(null);
    } catch {
      console.log("Session expired. Redirecting to sign-in...", error);
      setError("Failed to load requests");
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleTaskClick = async (request: StockRequest) => {
    try {
      const stockRequestList = requestList.filter(
        (item) => item.requestId?.requestId === request.requestId
      );

      const pdfUrl = generatePDF(request, stockRequestList);
      setSelectedPdfUrl(pdfUrl);
      setError(null);
      setOpenPdfModal(true);
    } catch (err) {
      console.error("Error generating PDF:", err);
      setSelectedPdfUrl(null);
      setError("Failed to generate PDF. Please try again.");
    }
  };

  const handleClosePreview = () => {
    setOpenPdfModal(false);
    setSelectedPdfUrl(null);
  };

  const handleRefresh = () => {
    fetchRequests();
  };

  const filteredRequests = requests.filter((request) => {
    return (
      (request.requestId?.toString() || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <LoadingScreen message="Loading requests..." />;
  }

  return (
    <div className="w-full p-4 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex">
      <StockRequestCard
        total={requests.length}
        filtered={filteredRequests.length}
        headerRight={
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 items-center">
            <SearchInput value={searchQuery} onChange={setSearchQuery} />
            <div className="flex gap-2 w-full sm:w-auto justify-end">
              <RefreshButton onClick={handleRefresh} loading={refreshing} />
              <DownloadCSVButton data={requests} />
            </div>
          </div>
        }
        table={
          filteredRequests.length === 0 ? (
            <EmptyStateMessage
              onClearFilters={() => {
                setSearchQuery("");
                handleRefresh();
              }}
            />
          ) : (
            <StockRequestTable
              stockRequests={paginatedRequests}
              onRequestClick={handleTaskClick}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          )
        }
        pagination={
          <>
            <div className="text-sm text-gray-500 text-center sm:text-left">
              Showing {paginatedRequests.length > 0
                ? (currentPage - 1) * itemsPerPage + 1
                : 0} to {Math.min(currentPage * itemsPerPage, filteredRequests.length)} of {filteredRequests.length} entries
            </div>
            {filteredRequests.length > 0 && (
              <div className="flex items-center justify-center sm:justify-end gap-2 w-full sm:w-auto">
                <Button
                  size="sm"
                  variant="flat"
                  isDisabled={currentPage === 1}
                  onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="bg-white"
                >
                  Previous
                </Button>

                <Pagination
                  color="secondary"
                  page={currentPage}
                  total={totalPages}
                  onChange={setCurrentPage}
                  showControls={false}
                  className="mx-2"
                />

                <Button
                  size="sm"
                  variant="flat"
                  isDisabled={currentPage === totalPages || totalPages === 0}
                  onPress={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  className="bg-white"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        }
      />

      <PdfPreviewModal
        isOpen={openPdfModal}
        onClose={handleClosePreview}
        pdfUrl={selectedPdfUrl}
      />

    </div>
  );
}
