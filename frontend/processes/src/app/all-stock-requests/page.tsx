"use client";
import React, { useState, useEffect } from "react";
import generatePDF from "@/utils/pdf/generatePDF";
import { StockRequest } from "@/utils/types/stock-request";

import { Input } from "@heroui/input";
import DownloadIcon from "@/components/global/icons/download.icon";
import { Button } from "@heroui/button";
import BlurModal from "@/components/global/modals/BlurModal";
import { Card, CardBody, CardHeader, CardFooter, Pagination } from "@heroui/react";
import { downloadCSV } from "@/utils/services/csv";
import { getStockRequests } from "@/utils/services/getApi";
import StockRequestTable from "@/components/global/tables/StockRequest.table";
import PdfPreview from "@/components/global/pdf/PdfPreview";
import LoadingScreen from "@/components/global/loading/loading";
import UnauthorizedCard from "@/components/global/cards/UnauthorizedCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function AllStockRequest() {
  const [requests, setRequests] = useState<StockRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openPdfModal, setOpenPdfModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    getStockRequests()
      .then(setRequests)
      .catch(() => console.log("Session expired. Redirecting to sign-in..."))
      .finally(() => setLoading(false));
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
    <div className="flex justify-center w-full min-h-screen p-4">
      <Card className="rounded-xl bg-white shadow-lg w-full flex flex-col max-h-[calc(100vh-32px)]">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 sm:border-r-2 sm:border-gray-500 sm:pr-4">
              Purchase Request List
            </h1>
            <p className="text-gray-500 text-sm">Overall purchase requests</p>
          </div>
          
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 items-center">
          <Input
              classNames={{
                base: "max-w-full sm:max-w-xs",
                inputWrapper: "bg-default-100",
              }}
              placeholder="Search users..."
              size="sm"
              startContent={
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
              }
              type="search"
              value={searchQuery}
              onValueChange={setSearchQuery}
              isClearable
            />

            <Button
              color="default"
              startContent={<DownloadIcon />}
              variant="bordered"
              size="sm"
              className="hover:bg-gray-300 whitespace-nowrap"
              onPress={() => downloadCSV(requests)}
            >
              Download
            </Button>
          </div>
        </CardHeader>

        <CardBody className="p-0 overflow-hidden flex-1 items-center">
          <div className="h-full overflow-auto">
            {filteredRequests.length === 0 ? (
              <div className="flex items-center justify-center h-40">
                <p className="text-gray-500">No requests matching your search criteria.</p>
              </div>
            ) : (
              <StockRequestTable
                stockRequests={paginatedRequests}
                onRequestClick={handleTaskClick}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            )}
          </div>
        </CardBody>

        <CardFooter className="flex justify-center py-2">
          {filteredRequests.length > 0 && (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="light"
                isDisabled={currentPage === 1}
                onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                variant="light"
                isDisabled={currentPage === totalPages || totalPages === 0}
                onPress={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              >
                Next
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>

      <BlurModal isOpen={openPdfModal} onClose={handleClosePreview}>
        {selectedPdfUrl && (
          <div className="h-[70vh]">
            <PdfPreview pdfUrl={selectedPdfUrl} />
          </div>
        )}
      </BlurModal>
    </div>
  );
}