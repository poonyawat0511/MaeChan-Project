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
    { key: "stockPoNo", label: "Order ID" },
    { key: "stockPoDate", label: "Order Date" },
    { key: "warehouseName", label: "Warehouse" },
    { key: "poItemAmount", label: "Item Count" },
    { key: "poDeliverAmount", label: "Total Price" },
    { key: "deliverComplete", label: "Status" },
  ];

  const getStatus = (deliverComplete: boolean) => {
    return deliverComplete
      ? { label: "Completed", style: { backgroundColor: "#A9DFE2", color: "#000" } }
      : { label: "Pending", style: { backgroundColor: "#FEF2E5", color: "#000" } };
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
                    po.stockPoDate instanceof Date
                      ? po.stockPoDate.toLocaleDateString("th-TH")
                      : "N/A"
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
