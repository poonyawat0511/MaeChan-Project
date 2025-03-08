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
import ArrowLeftIcon from "../icons/arrowLeft.icon";

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
    { key: "requestId", label: "ลำดับ" },
    { key: "requestNo", label: "เลขที่เอกสาร" },
    { key: "requestDate", label: "วันที่ออกใบซื้อ" },
    { key: "requestReceiveDate", label: "วันที่ต้องการ" },
    { key: "stockApproveDate", label: "วันที่อนุมัติ" },
    { key: "stockUserApprove", label: "ผู้อนุมัติ" },
    { key: "requestWarehouseId", label: "คลังที่ขอซื้อ" },
    { key: "requestItemCount", label: "จำนวนรายการ" },
    { key: "requestTotalPrice", label: "มูลค่า" },
    { key: "requestComplete", label: "สถานะ" },
    { key: "stockPoId", label: "ออกใบสั่งซื้อ" },
    { key: "actions", label: "รายละเอียด" },
  ];

  const getStatus = (requestComplete: boolean, approve: boolean) => {
    if (requestComplete == null && approve == null)
      return {
        label: "รอดำเนินการ",
        style: { backgroundColor: "#D1D5FA", color: "#000" },
      };

    if (requestComplete && approve == null)
      return {
        label: "ผ่านการตรวจสอบ",
        style: { backgroundColor: "#FEF2E5", color: "#000" },
      };

    if (!requestComplete && !approve)
      return {
        label: "ไม่ผ่านการตรวจสอบ",
        style: { backgroundColor: " #FDB3CA", color: "#000" },
      };

    if (requestComplete && approve)
      return {
        label: "อนุมัติ",
        style: { backgroundColor: "#A9DFE2", color: "#000" },
      };

    return {
      label: "ไม่อนุมัติ",
      style: { backgroundColor: "#FBE7E8", color: "#000" },
    };
  };

  return (
    <div className="bg-white p-4 w-full h-full flex flex-col">
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
              key={item.requestId}
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
                  ) : columnKey === "stockUserApprove" ? (
                    item.stockUserApprove ? (
                      `${item.stockUserApprove.firstName}`
                    ) : (
                      "-"
                    )
                  ) : columnKey === "requestWarehouseId" ? (
                    item.requestWarehouseId?.warehouseName || "-"
                  ) : columnKey === "stockPoId" ? ( // ✅ เพิ่มเงื่อนไขสำหรับ StockPo
                    item.stockPoId ? (
                      <Chip
                        style={{ backgroundColor: "#A9DFE2", color: "#000" }}
                      >
                        ออกแล้ว
                      </Chip>
                    ) : (
                      "-"
                    )
                  ) : columnKey === "requestDate" ||
                    columnKey === "requestReceiveDate" ||
                    columnKey === "stockApproveDate" ? ( // ✅ แก้ไขการแสดงวันที่
                    item[columnKey] ? (
                      new Date(item[columnKey]).toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    ) : (
                      "N/A"
                    )
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
  );
}
