import React, { useState } from "react";
import { StockRequest } from "@/utils/types/stock-request";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Pagination,
  Button,
} from "@heroui/react";

interface StockRequestTableProps {
  stockRequests: StockRequest[];
  onRequestClick: (stockRequest: StockRequest) => void;
}

export default function StockRequestTable({
  stockRequests,
  onRequestClick,
}: StockRequestTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(stockRequests.length / itemsPerPage);
  const paginatedData = stockRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { key: "requestId", label: "Request ID" },
    { key: "requestNo", label: "Document Number" },
    { key: "requestDate", label: "Request Date" },
    { key: "requestReceiveDate", label: "Due Date" },
    { key: "stockApproveDate", label: "Approval Date" },
    { key: "stockUserApprove", label: "Approver" },
    { key: "stockPoId", label: "Buying Document" },
    { key: "requestWarehouseId", label: "Main Inventory" },
    { key: "requestItemCount", label: "Item Count" },
    { key: "requestTotalPrice", label: "Total Price" },
    { key: "requestAllComplete", label: "Request All Complete" },
    { key: "officerList", label: "Inspector" },
    { key: "actions", label: "Actions" },
  ];

  return (
    <div className="w-full h-full flex flex-col overflow-hidden  shadow-md">
      <div className="flex-1 overflow-auto max-h-[60vh] scrollbar-hide">
        <Table aria-label="Stock Requests Table" className="w-full min-w-max">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.key}
                className="sticky top-0 bg-white z-10 shadow-md !rounded-none"
              >
                {column.label}
              </TableColumn>
            )}
          </TableHeader>

          <TableBody
            items={paginatedData.map((item, index) => ({
              ...item,
              _index: index,
            }))}
          >
            {(item) => (
              <TableRow
                key={item.id}
                className={item._index % 2 === 0 ? "bg-white" : "bg-[#F7F6FE]"}
              >
                {(columnKey) => (
                  <TableCell>
                    {columnKey === "actions" ? (
                      <button
                        className="px-3 py-1 rounded hover:bg-gray-300"
                        onClick={() => onRequestClick(item)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </button>
                    ) : (
                      getKeyValue(item, columnKey)
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center items-center p-2">
        <Button
          size="sm"
          style={{
            background: "transparent",
            border: "none",
            boxShadow: "none",
            color: currentPage === 1 ? "gray" : "black",
          }}
          onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Pagination
          color="secondary"
          page={currentPage}
          total={totalPages}
          onChange={setCurrentPage}
        />
        <Button
          size="sm"
          style={{
            background: "transparent",
            border: "none",
            boxShadow: "none",
            color: currentPage === 1 ? "gray" : "black",
          }}
          onPress={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
