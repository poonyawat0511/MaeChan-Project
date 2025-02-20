import React from "react";
import { StockRequest } from "@/utils/types/stock-request";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Button,
  Chip,
} from "@heroui/react";
import ArrowLeftIcon from "../../icons/arrowLeft.icon";

interface StockRequestTableProps {
  stockRequests: StockRequest[];
  onRequestClick: (stockRequest: StockRequest) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

export default function StockRequestTable({
  stockRequests,
  onRequestClick,
}: StockRequestTableProps) {
  const columns = [
    { key: "requestId", label: "Request ID" },
    { key: "requestNo", label: "Document Number" },
    { key: "requestDate", label: "Request Date" },
    { key: "requestReceiveDate", label: "Due Date" },
    { key: "stockApproveDate", label: "Approval Date" },
    { key: "stockUserApprove", label: "Approver" },
    { key: "requestWarehouseId", label: "Main Inventory" },
    { key: "requestItemCount", label: "Item Count" },
    { key: "requestTotalPrice", label: "Total Price" },
    { key: "requestComplete", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  const getStatus = (requestComplete: boolean, approve: boolean) => {
    if (!requestComplete && !approve)
      return {
        label: "Request Failed",
        style: { backgroundColor: "#FDB3CA", color: "#000" },
      };
    if (!requestComplete)
      return {
        label: "Pending",
        style: { backgroundColor: "#FEF2E5", color: "#000" },
      };
    if (requestComplete && !approve)
      return {
        label: "Pending Approval",
        style: { backgroundColor: "#D1D5FA", color: "#000" },
      };
    if (requestComplete && approve)
      return {
        label: "Approved",
        style: { backgroundColor: "#A9DFE2", color: "#000" },
      };
    return {
      label: "Rejected",
      style: { backgroundColor: "#FBE7E8", color: "#000" },
    };
  };

  return (
    <div className="bg-white p-4 max-w-7xl w-full h-full flex flex-col">
      <div className="flex-1 overflow-auto max-h-[calc(100vh-250px)] scrollbar-hide">
        <Table aria-label="Stock Requests Table" className="w-full min-w-max">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.key}
                className="sticky top-0 bg-white z-10"
              >
                {column.label}
              </TableColumn>
            )}
          </TableHeader>

          <TableBody items={stockRequests}>
            {(item) => (
              <TableRow
                key={item.id}
                className={
                  stockRequests.indexOf(item) % 2 === 0
                    ? "bg-white"
                    : "bg-[#F7F6FE]"
                }
              >
                {(columnKey) => (
                  <TableCell>
                    {columnKey === "actions" ? (
                      <Button
                        className="px-3 py-1 rounded hover:text-red-400 border-none rounded-full hover:bg-transparent !hover:bg-transparent bg-transparent"
                        onPress={() => onRequestClick(item)}
                      >
                        <ArrowLeftIcon />
                      </Button>
                    ) : columnKey === "requestComplete" ? (
                      <Chip
                        style={
                          getStatus(item.requestComplete, item.approve).style
                        }
                      >
                        {getStatus(item.requestComplete, item.approve).label}
                      </Chip>
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
    </div>
  );
}
