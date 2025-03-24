import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Chip,
} from "@heroui/react";

import { StockPo } from "@/utils/types/stock-po";

interface StockPoTableProps {
  stockPo: StockPo[];
}

export default function StockPoTable({ stockPo }: StockPoTableProps) {
  const columns = [
    { key: "stockPoNo", label: "ใบสั่งซื้อที่" },
    { key: "stockPoDate", label: "วันที่ออกใบสั่งซื้อ" },
    { key: "warehouseName", label: "คลัง" },
    { key: "poItemAmount", label: "จำนวนรายการ" },
    { key: "poDeliverAmount", label: "มูลค่า" },
    { key: "deliverComplete", label: "สถานะ" },
  ];

  const getStatus = (deliverComplete: 'Y' | 'N' | null) => {
    if (deliverComplete === 'Y') {
      return {
        label: "ออกแล้ว",
        style: { backgroundColor: "#A9DFE2", color: "#000" },
      };
    } else if (deliverComplete === 'N') {
      return {
        label: "รอดำเนินการ",
        style: { backgroundColor: "#FEF2E5", color: "#000" },
      };
    } else {
      return {
        label: "-",
        style: { backgroundColor: "#F8D7DA", color: "#000" },
      };
    }
  };
  

  return (
    <div className="bg-white p-4 w-full h-full flex flex-col">
      <Table aria-label="Stock Purchase Orders Table" className="w-full min-w-max">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} className="sticky top-0 bg-white z-10 bg-gray-200">
              {column.label}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody items={stockPo}>
          {(po) => (
            <TableRow
              key={po.stockPoNo}
              className={stockPo.indexOf(po) % 2 === 0 ? "bg-white" : "bg-[#F7F6FE]"}
            >
              {(columnKey) => (
                <TableCell>
                  {columnKey === "deliverComplete" ? (
                    <Chip style={getStatus(po.deliverComplete).style}>
                      {getStatus(po.deliverComplete).label}
                    </Chip>
                  ) : columnKey === "warehouseName" ? (
                    po.warehouseId?.warehouseName || "N/A"
                  ) : columnKey === "stockPoDate" ? (
                    po.stockPoDate
                      ? new Date(po.stockPoDate).toLocaleDateString("th-TH", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "-"
                  ) : columnKey === "poAmount" ? (
                    `฿ ${po.poAmount.toLocaleString()}`
                  ) : (
                    String(po[columnKey as keyof StockPo] || "N/A")
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
