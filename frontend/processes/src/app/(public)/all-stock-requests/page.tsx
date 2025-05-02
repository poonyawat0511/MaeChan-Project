'use client'

import React, { useState } from "react";
import EmptyStateMessage from "@/components/emptys/EmptyStateMessage";
import StockRequestCard from "./_components/cards/StockRequestCard";
import StockRequestTable from "./_components/tables/StockRequest.table";
import SearchInput from "./_components/buttons/SearchInput";
import RefreshButton from "./_components/buttons/RefreshButton";
import DownloadCSVButton from "./_components/buttons/DownloadCSVButton";
import { Button } from "@heroui/button";
import { Pagination } from "@heroui/react";
import PdfPreviewModal from "./_components/modals/PdfPreviewModal";
import { useAllStockRequests } from "./hooks/useAllStockRequests";
import generatePDF from "@/utils/services/generatePDF";
import LoadingScreen from "@/components/loading/loading";
import { StockRequest } from "@/utils/types/stock-request";
import { useDebounce } from "./hooks/useDebounce";

export default function AllStockRequest() {
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openPdfModal, setOpenPdfModal] = useState<boolean>(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const itemsPerPage = 12;

  const {
    requests,
    loading,
    refreshing,
    fetchRequests,
    currentPage,
    setCurrentPage,
    totalPages,
    requestList,
  } = useAllStockRequests(debouncedSearchQuery);

  const handleTaskClick = async (request: StockRequest) => {
    try {
      const stockRequestList = requestList.filter(
        (item) => item.requestId?.requestId === request.requestId
      );

      const pdfUrl = generatePDF(request, stockRequestList);
      setSelectedPdfUrl(pdfUrl);
      setOpenPdfModal(true);
    } catch (err) {
      console.error("Error generating PDF:", err);
      setSelectedPdfUrl(null);
    }
  };

  const handleClosePreview = () => {
    setOpenPdfModal(false);
    setSelectedPdfUrl(null);
  };

  const handleRefresh = () => {
    fetchRequests();
  };

  if (loading) {
    return <LoadingScreen message="Loading requests..." />;
  }

  return (
    <div className="w-full p-4 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex overflow-x-auto w-full">
      <StockRequestCard
        total={totalPages * itemsPerPage}
        filtered={requests.length}
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
          requests.length === 0 ? (
            <EmptyStateMessage
              onClearFilters={() => {
                setSearchQuery("");
                setCurrentPage(1);
                fetchRequests();
              }}
            />
          ) : (
            <StockRequestTable
              stockRequests={requests}
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
              กำลังแสดง {(currentPage - 1) * itemsPerPage + 1} ถึง{" "}
              {(currentPage - 1) * itemsPerPage + requests.length} จาก {totalPages * itemsPerPage} ทั้งหมด
            </div>
            {requests.length > 0 && (
              <div className="flex items-center justify-center sm:justify-end gap-2 w-full sm:w-auto">
                <Button
                  size="sm"
                  variant="flat"
                  isDisabled={currentPage === 1}
                  onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="bg-white"
                >
                  ก่อนหน้า
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
                  ถัดไป
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
