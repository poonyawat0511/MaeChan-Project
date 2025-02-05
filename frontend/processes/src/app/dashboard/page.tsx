"use client";
import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Dialog, DialogContent } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import generatePDF from "@/utils/pdf/generatePDF";
import "./style.css";
import { StockRequest } from "@/utils/types/stock-request";
import StockRequestTable from "@/components/StockRequests/StockRequest.table";
import PdfPreview from "@/components/StockRequests/PdfPreview";

const requestApi = `http://localhost:8081/stock-requests`;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function DashBorad() {
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
    <div className="drop-shadow-2xl mt-10">
      <div className="rounded-md bg-white shadow-md p-4 flex flex-col flex-1 min-h-full">
        <div className="flex items-center gap-4 justify-between">
          <h1 className="text-3xl font-bold text-gray-800 border-r-2 border-gray-500 pr-4">
            Purchase Request List
          </h1>
          <Search className="flex items-center">
            <SearchIconWrapper className="flex items-center"></SearchIconWrapper>
            <SearchIcon />
            <StyledInputBase
              className="ml-2 bg-gray-100 rounded-md"
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Search>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "inherit",
              color: "black",
              borderColor: "gray",
            }}
          >
            <DownloadIcon />
            Download
          </Button>
        </div>

        <div className="grid">
          {filteredRequests.length === 0 ? (
            <p>No tasks available.</p>
          ) : (
            <StockRequestTable
              stockRequests={filteredRequests}
              onRequestClick={handleTaskClick}
            />
          )}
        </div>

        <Dialog
          open={openPdfModal}
          onClose={handleClosePreview}
          maxWidth="md"
          fullWidth
          sx={{
            "& .MuiDialog-paper": {
              minHeight: "20vh",
            },
          }}
        >
          <DialogContent>
            {selectedPdfUrl && <PdfPreview pdfUrl={selectedPdfUrl} />}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
