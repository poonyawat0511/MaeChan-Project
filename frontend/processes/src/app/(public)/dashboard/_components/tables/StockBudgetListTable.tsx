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
import { StockBudgetList } from "@/types/stock-buget-list";

interface StockBudgetListTableProps {
  stockBudgetList: StockBudgetList[];
}

export default function StockBudgetListTable({ stockBudgetList }: StockBudgetListTableProps) {
  const columns = [
    { key: "stockBudgetListId", label: "ลำดับ" },
    { key: "budgetName", label: "ชื่องบประมาณ" },
    { key: "budgetStatus", label: "สถานะ" },
    { key: "stockBudgetYear", label: "ปีงบประมาณ" },
    { key: "stockBudgetPrice", label: "วงเงินงบประมาณ" },
    { key: "stockBudgetUse", label: "ใช้ไปแล้ว" },
    { key: "stockBudgetRemain", label: "คงเหลือ" },
    { key: "stockBudgetRcvPrice", label: "รับเข้าแล้ว" },
  ];

  const getStatus = (budgetStatus: 'Y' | 'N' | null) => {
    if (budgetStatus === 'Y') {
      return {
        label: "พร้อมใช้งาน",
        style: { backgroundColor: "#A9DFE2", color: "#000" },
      };
    } else if (budgetStatus === 'N') {
      return {
        label: "ไม่พร้อมใช้งาน",
        style: { backgroundColor: "#FEF2E5", color: "#000" },
      };
    } else {
      return {
        label: "ไม่ระบุ",
        style: { backgroundColor: "#F8D7DA", color: "#000" },
      };
    }
  };

  return (
    <div className="bg-white p-4 w-full h-full flex flex-col">
      <Table aria-label="Stock Budget List Table" className="w-full min-w-max">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} className="sticky top-0 z-10 bg-gray-200">
              {column.label}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody items={stockBudgetList}>
          {(item) => (
            <TableRow key={item.stockBudgetListId}>
              {(columnKey) => {
                switch (columnKey) {
                  case "budgetName":
                    return <TableCell>{item.budgetId?.budgetName ?? "ไม่ระบุ"}</TableCell>;
                  case "budgetStatus":
                    const status = getStatus(item.budgetId?.budgetStatus ?? null);
                    return (
                      <TableCell>
                        <Chip style={status.style}>{status.label}</Chip>
                      </TableCell>
                    );
                  default:
                    return (
                      <TableCell>
                        {(
                        String(item[columnKey as keyof StockBudgetList] ?? "ไม่ระบุ")
                        )}
                      </TableCell>
                    );
                }
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
