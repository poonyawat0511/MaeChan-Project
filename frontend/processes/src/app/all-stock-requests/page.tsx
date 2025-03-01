"use client";
import React, { useState, useEffect } from "react";
import generatePDF from "@/utils/pdf/generatePDF";
import { StockRequest } from "@/utils/types/stock-request";

import { Input } from "@heroui/input";
import DownloadIcon from "@/components/global/icons/download.icon";
import { Button, Chip, Tooltip, Divider } from "@heroui/react";
import BlurModal from "@/components/global/modals/BlurModal";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Pagination,
} from "@heroui/react";
import { downloadCSV } from "@/utils/services/csv";
import { getStockRequests } from "@/utils/services/getApi";
import StockRequestTable from "@/components/global/tables/StockRequest.table";
import PdfPreview from "@/components/global/pdf/PdfPreview";
import LoadingScreen from "@/components/global/loading/loading";
import UnauthorizedCard from "@/components/global/cards/UnauthorizedCard";
import {
  MagnifyingGlassIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/outline";
import EmptyStateMessage from "@/components/global/emptys/EmptyStateMessage";

export default function AllStockRequest() {
  const [requests, setRequests] = useState<StockRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openPdfModal, setOpenPdfModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const itemsPerPage = 10;

  const fetchRequests = async () => {
    try {
      setRefreshing(true);
      const data = await getStockRequests();
      setRequests(data);
      setError(null);
    } catch {
      console.log("Session expired. Redirecting to sign-in...");
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
      const pdfUrl = generatePDF(request);
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

  const filteredRequests = requests.filter((request) => {
    return request.requestId.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSignIn = () => {
    window.location.href = "/signin";
  };

  const handleRefresh = () => {
    fetchRequests();
  };

  if (loading) {
    return <LoadingScreen message="Loading requests..." />;
  }

  if (error) {
    return (
      <UnauthorizedCard
        message="No users available"
        onSignin={() => {
          handleSignIn();
        }}
      />
    );
  }

  return (
    <div className="w-full p-4 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex">
      <Card className="rounded-xl bg-white shadow-md w-full max-w-full mx-auto flex flex-col h-[calc(100vh-32px)] border border-gray-100">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between px-4 sm:px-6 py-4 bg-white border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <DocumentChartBarIcon className="h-8 w-8 text-violet-500" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Purchase Requests
              </h1>
              <div className="flex items-center mt-1">
                <p className="text-gray-500 text-sm">
                  Total requests: {requests.length}
                </p>
                <Divider orientation="vertical" className="h-4 mx-2" />
                <Chip size="sm" color="secondary" variant="flat">
                  {filteredRequests.length} matching
                </Chip>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 items-center">
            <Input
              classNames={{
                base: "w-full sm:w-64",
                inputWrapper:
                  "bg-default-100 border-1 hover:bg-default-200/70 transition-all",
              }}
              placeholder="Search by request ID..."
              size="sm"
              startContent={
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
              }
              type="search"
              value={searchQuery}
              onValueChange={setSearchQuery}
              isClearable
            />

            <div className="flex gap-2 w-full sm:w-auto justify-end">
              <Tooltip content="Refresh data">
                <Button
                  isIconOnly
                  color="default"
                  variant="light"
                  size="sm"
                  className="min-w-unit-10 w-10 h-10 rounded-full"
                  onPress={handleRefresh}
                  isLoading={refreshing}
                >
                  {!refreshing && <ArrowPathIcon className="h-5 w-5" />}
                </Button>
              </Tooltip>

              <Button
                color="secondary"
                startContent={<DownloadIcon />}
                variant="flat"
                size="sm"
                className="bg-violet-50 hover:bg-violet-100 text-violet-700 transition-all whitespace-nowrap"
                onPress={() => downloadCSV(requests)}
              >
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardBody className="p-0 overflow-hidden flex-grow relative">
          <div className="h-full w-full overflow-auto">
            {filteredRequests.length === 0 ? (
              <EmptyStateMessage
                onClearFilters={() => {
                  setSearchQuery("");
                  handleRefresh();
                }}
              />
            ) : (
              <div className="w-full h-full">
                <StockRequestTable
                  stockRequests={paginatedRequests}
                  onRequestClick={handleTaskClick}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                />
              </div>
            )}
          </div>
        </CardBody>

        <CardFooter className="flex flex-col sm:flex-row sm:justify-between py-3 px-4 sm:px-6 border-t border-gray-100 bg-gray-50/50 gap-3 flex-shrink-0">
          <div className="text-sm text-gray-500 text-center sm:text-left">
            Showing{" "}
            {paginatedRequests.length > 0
              ? (currentPage - 1) * itemsPerPage + 1
              : 0}{" "}
            to {Math.min(currentPage * itemsPerPage, filteredRequests.length)}{" "}
            of {filteredRequests.length} entries
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
        </CardFooter>
      </Card>

      <BlurModal
        isOpen={openPdfModal}
        onClose={handleClosePreview}
        title="Purchase Request Details"
      >
        {selectedPdfUrl ? (
          <div className="h-[65vh] w-full">
            <PdfPreview pdfUrl={selectedPdfUrl} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center text-gray-500">
              <DocumentTextIcon className="h-12 w-12 text-gray-300 mb-2" />
              <p>Loading document preview...</p>
            </div>
          </div>
        )}
      </BlurModal>
    </div>
  );
}