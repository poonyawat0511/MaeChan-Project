"use client";
import React, { useState, useEffect } from "react";
import generatePDF from "@/utils/pdf/generatePDF";
import "./style.module.css";
import { StockRequest } from "@/utils/types/stock-request";
import StockRequestTable from "@/components/StockRequests/StockRequest.table";
import PdfPreview from "@/components/StockRequests/PdfPreview";
import { Input } from "@heroui/input";
import DownloadIcon from "@/components/global/icons/download.icon";
import SearchIcon from "@/components/global/icons/search.icon";
import { Button } from "@heroui/button";
import BlurModal from "@/components/global/modals/BlurModal";

const requestApi = `http://localhost:8081/stock-requests`;

export default function AllStockRequest() {
  const [requests, setRequests] = useState<StockRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openPdfModal, setOpenPdfModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchStockRequests = async () => {
      try {
        const response = await fetch(requestApi, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const tasksData: StockRequest[] = await response.json();
        setRequests(tasksData);
      } catch (err) {
        setError("Error fetching stock requests. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStockRequests();
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

  if (loading) {
    return <p>request loading</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="drop-shadow-2xl mt-10 flex justify-center flex-1 w-full">
      <div className="rounded-md bg-white shadow-lg p-4 max-w-6xl w-full max-h-[80vh] flex flex-col">
        <div className="flex items-center gap-4 justify-between">
          <h1 className="text-3xl font-bold text-gray-800 border-r-2 border-gray-500 pr-4">
            Purchase Request List
          </h1>
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[30rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Search..."
            size="md"
            endContent={<SearchIcon size={20} />}
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <Button
            color="default"
            startContent={<DownloadIcon />}
            variant="bordered"
          >
            Download
          </Button>
        </div>

        {/* Table Container */}
        <div className="flex-1 overflow-auto max-h-[screen] mt-4 scroll-bar-hide">
          {filteredRequests.length === 0 ? (
            <p>No tasks available.</p>
          ) : (
            <div className="w-full h-full">
              <StockRequestTable
                stockRequests={filteredRequests}
                onRequestClick={handleTaskClick}
              />
            </div>
          )}
        </div>
        <BlurModal isOpen={openPdfModal} onClose={handleClosePreview}>
          {selectedPdfUrl && (
            <div className="h-[70vh]">
              <PdfPreview pdfUrl={selectedPdfUrl} />
            </div>
          )}
        </BlurModal>
      </div>
    </div>
  );
}
