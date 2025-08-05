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
import { StockBudget } from "@/types/stock-budget";


interface StockBudgetTableProps {
  stockBudget: StockBudget[];
}

export default function StockBudgetTable({ stockBudget }: StockBudgetTableProps) {
  const columns = [
    { key: "budgetId", label: "ลำดับ" },
    { key: "budgetName", label: "ชื่องบประมาณ" },
    { key: "budgetStatus", label: "สถานะ" },
    { key: "stockBudgetTypeId", label: "ประเภทของงบประมาณ" },
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
      <Table aria-label="Stock Purchase Orders Table" className="w-full min-w-max">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} className="sticky top-0 z-10 bg-gray-200">
              {column.label}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody items={stockBudget}>
          {(item) => (
            <TableRow key={item.budgetId}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "budgetStatus" ? (
                    <Chip style={getStatus(item.budgetStatus).style}>
                      {getStatus(item.budgetStatus).label}
                    </Chip>
                  ) : columnKey === "stockBudgetTypeId" ? (
                    item.stockBudgetTypeId?.stockBudgetTypeName || "ไม่ระบุ"
                  ) : (
                    String(item[columnKey as keyof StockBudget] ?? "ไม่ระบุ")
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
