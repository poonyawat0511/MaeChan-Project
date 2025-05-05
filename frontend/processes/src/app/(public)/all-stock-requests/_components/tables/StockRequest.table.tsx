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
  Tooltip,
} from "@heroui/react";
import { 
  DocumentTextIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";


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
    { key: "requestNo", label: "เลขที่เอกสาร" },
    { key: "requestDate", label: "วันที่ออกใบซื้อ" },
    { key: "requestReceiveDate", label: "วันที่ต้องการ" },
    { key: "stockApproveDate", label: "วันที่อนุมัติ" },
    { key: "stockUserApprove", label: "ผู้ตรวจสอบ" },
    { key: "requestWarehouseId", label: "คลังที่ขอซื้อ" },
    { key: "requestItemCount", label: "จำนวนรายการ" },
    { key: "requestTotalPrice", label: "มูลค่า" },
    { key: "requestComplete", label: "สถานะ" },
    { key: "stockPoId", label: "ออกใบสั่งซื้อ" },
    { key: "actions", label: "รายละเอียด" },
  ];

  const getStatus = (
    requestComplete: "Y" | "N" | null,
    approve: "Y" | "N" | null
  ) => {
    if (requestComplete === null && approve === null)
      return {
        label: "รอดำเนินการ",
        style: { backgroundColor: "#EEF2FF", color: "#4F46E5" },
        icon: <span className="h-2 w-2 rounded-full bg-indigo-600 mr-1.5 animate-pulse"></span>,
      };
  
    if (requestComplete === "Y" && approve === null)
      return {
        label: "ผ่านการตรวจสอบ",
        style: { backgroundColor: "#FEF3C7", color: "#B45309" },
        icon: <span className="h-2 w-2 rounded-full bg-amber-600 mr-1.5"></span>,
      };
  
    if (requestComplete === "N" && approve === "N")
      return {
        label: "ไม่ผ่านการตรวจสอบ",
        style: { backgroundColor: "#FEE2E2", color: "#B91C1C" },
        icon: <span className="h-2 w-2 rounded-full bg-red-600 mr-1.5"></span>,
      };
  
    if (requestComplete === "Y" && approve === "Y")
      return {
        label: "อนุมัติ",
        style: { backgroundColor: "#D1FAE5", color: "#047857" },
        icon: <CheckCircleIcon className="h-3 w-3 mr-1" />,
      };
  
    return {
      label: "ไม่อนุมัติ",
      style: { backgroundColor: "#FEE2E2", color: "#B91C1C" },
      icon: <span className="h-2 w-2 rounded-full bg-red-600 mr-1.5"></span>,
    };
  };
  
  const formatCurrency = (value: number | string | null | undefined) => {
    if (value === null || value === undefined) return "-";
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    return numValue.toLocaleString("th-TH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white w-full h-full flex flex-col min-w-full overflow-x-auto">
      <Table 
        aria-label="Stock Requests Table" 
        className="w-full min-w-max"
        removeWrapper
        classNames={{
          base: "shadow-none",
          thead: "shadow-sm z-10",
          tr: "hover:bg-gray-50/80 transition-colors",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              className="sticky top-0 bg-white z-10 py-4 text-sm font-semibold text-gray-700 text-center"
              align="center"
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody items={stockRequests} emptyContent="ไม่พบข้อมูลใบขอซื้อสินค้า">
          {(item) => (
            <TableRow
              key={item.requestId}
              className={
                stockRequests.indexOf(item) % 2 === 0
                  ? "bg-white"
                  : "bg-gray-50/50"
              }
            >
              {(columnKey) => (
                <TableCell className="py-3 text-sm">
                  {columnKey === "actions" ? (
                    <Button
                      className="bg-violet-50 text-violet-700 hover:bg-violet-100 transition-all rounded-full min-w-0 w-9 h-9 p-0"
                      isIconOnly
                      onPress={() => onRequestClick(item)}
                    >
                      <DocumentTextIcon className="h-4 w-4" />
                    </Button>
                  ) : columnKey === "requestComplete" ? (
                    <Chip
                      style={getStatus(item.requestComplete, item.approve).style}
                      size="sm"
                      startContent={getStatus(item.requestComplete, item.approve).icon}
                      variant="flat"
                      className="font-medium"
                    >
                      {getStatus(item.requestComplete, item.approve).label}
                    </Chip>
                  ) : columnKey === "stockUserApprove" ? (
                    <div className="flex items-center">
                      {item.stockUserApprove ? (
                        <Tooltip content={`ID: ${item.stockUserApprove.officerId}`}>
                          <span className="font-medium">{item.stockUserApprove.officerName}</span>
                        </Tooltip>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </div>
                  ) : columnKey === "requestWarehouseId" ? (
                    <div className="font-medium">
                      {item.requestWarehouseId?.warehouseName || 
                        <span className="text-gray-400">-</span>
                      }
                    </div>
                  ) : columnKey === "stockPoId" ? (
                    item.stockPoId ? (
                      <Chip
                        style={{ backgroundColor: "#D1FAE5", color: "#047857" }}
                        variant="flat"
                        size="sm"
                        startContent={<CheckCircleIcon className="h-3 w-3" />}
                      >
                        ออกแล้ว
                      </Chip>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )
                  ) : columnKey === "requestDate" ||
                    columnKey === "requestReceiveDate" ||
                    columnKey === "stockApproveDate" ? (
                    <div className="flex items-center gap-1.5">
                      <CalendarDaysIcon className="h-3.5 w-3.5 text-gray-400" />
                      <span>{formatDate(item[columnKey])}</span>
                    </div>
                  ) : columnKey === "requestTotalPrice" ? (
                    <div className="flex items-center gap-1.5 font-medium">
                      <CurrencyDollarIcon className="h-3.5 w-3.5 text-gray-400" />
                      {formatCurrency(item[columnKey])}
                    </div>
                  ) : columnKey === "requestNo" ? (
                    <span className="font-medium text-violet-800">{item[columnKey] || "-"}</span>
                  ) : columnKey === "requestItemCount" ? (
                    <span className="font-medium">{item[columnKey] || "0"}</span>
                  ) : (
                    getKeyValue(item, columnKey) ?? <span className="text-gray-400">-</span>
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
