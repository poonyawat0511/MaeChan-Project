import React from "react";
import {
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Pagination,
  Chip,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { StockRequest } from "@/utils/types/stock-request";

interface StockRequestTableProps {
  stockRequests: StockRequest[];
  onRequestClick: (stockRequest: StockRequest) => void;
}

export default function StockRequestTable({
  stockRequests,
  onRequestClick,
}: StockRequestTableProps) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const paginatedRows = stockRequests.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="overflow-x-auto w-full scrollbar-hidden">
      <TableContainer
        sx={{
          height: "500px",
          borderRadius: "8px",
          overflowY: "auto",
        }}
        className="rounded-xl overflow-y-auto scrollbar-hidden"
      >
        <Table className="min-w-full bg-white rounded-lg shadow-md">
          <TableHead sx={{ backgroundColor: "white" }}>
            <TableRow>
              <TableCell align="center" sx={{ color: "black" }}>
                Request ID
              </TableCell>
              <TableCell align="center" sx={{ color: "black" }}>
                Approval Status
              </TableCell>
              <TableCell align="center" sx={{ color: "black" }}>
                Document Number
              </TableCell>
              <TableCell align="center" sx={{ color: "black" }}>
                Requester Name
              </TableCell>
              <TableCell align="center" sx={{ color: "black" }}>
                Request Date
              </TableCell>
              <TableCell align="center" sx={{ color: "black" }}>
                Due Date
              </TableCell>
              <TableCell align="center" sx={{ color: "black" }}>
                Approval Date
              </TableCell>
              <TableCell align="center" sx={{ color: "black" }}>
                Approver
              </TableCell>
              <TableCell align="center" sx={{ color: "black" }}>
                Buying Document
              </TableCell>
              <TableCell align="center" sx={{ color: "black" }}>
                Main Inventory
              </TableCell>
              <TableCell align="center" sx={{ color: "black" }}>
                Item Count
              </TableCell>
              <TableCell align="center" sx={{ color: "black" }}>
                Total Price
              </TableCell>
              <TableCell align="center" sx={{ color: "black" }}>
                Request All Complete
              </TableCell>
              <TableCell align="center" sx={{ color: "black" }}>
                Inspector
              </TableCell>
              <TableCell align="center" sx={{ color: "black" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedRows.map((stockRequest, index) => (
              <TableRow
                key={stockRequest.id}
                className={`border-b hover:bg-gray-20 ${
                  index % 2 === 0 ? "bg-purple-50" : "bg-white"
                }`}
              >
                <TableCell align="center">
                  {stockRequest.requestId || "-"}
                </TableCell>
                <TableCell align="center">
                  {stockRequest.approve !== undefined
                    ? stockRequest.approve
                      ? "Approved"
                      : "Not Approved"
                    : "-"}
                </TableCell>
                <TableCell align="center">
                  {stockRequest.stockRequestDocId || "-"}
                </TableCell>
                <TableCell align="center">
                  {stockRequest.stockUser.hospitalId || "-"}
                </TableCell>
                <TableCell align="center">
                  {stockRequest.requestDate || "-"}
                </TableCell>
                <TableCell align="center">
                  {stockRequest.useDate || "-"}
                </TableCell>
                <TableCell align="center">
                  {stockRequest.stockApproveDate || "-"}
                </TableCell>
                <TableCell align="center">
                  {stockRequest.stockSubjectPerson || "-"}
                </TableCell>
                <TableCell align="center">
                  {stockRequest.requestNo || "-"}
                </TableCell>
                <TableCell align="center">
                  {stockRequest.departmentId || "-"}
                </TableCell>
                <TableCell align="center">
                  {stockRequest.requestItemCount || "-"}
                </TableCell>
                <TableCell align="center">
                  {stockRequest.requestTotalPrice || "-"}
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={
                      stockRequest.requestAllComplete ? "Completed" : "Pending"
                    }
                    color={
                      stockRequest.requestAllComplete ? "success" : "warning"
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  {stockRequest.stockUserApprove || "-"}
                </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => onRequestClick(stockRequest)}
                    sx={{
                      justifyContent: "center",
                      textAlign: "center",
                      width: "100%",
                      textTransform: "none",
                      color: "black",
                      backgroundColor: "transparent",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                      },
                      border: "none",
                    }}
                  >
                    <ArrowForwardIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(stockRequests.length / rowsPerPage)}
        variant="outlined"
        shape="rounded"
        color="secondary"
        page={page}
        onChange={handlePageChange}
        className="flex justify-center mt-20"
      />
    </div>
  );
}
