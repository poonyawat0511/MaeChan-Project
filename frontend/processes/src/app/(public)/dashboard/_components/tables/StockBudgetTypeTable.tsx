import { StockBudgetType } from "@/utils/types/stock-budget-type";
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@heroui/react";

interface StockBudgetTypeTableProps {
    stockBudgetTypeList: StockBudgetType[];
}

export default function StockBudgetTypeTable({ stockBudgetTypeList }: StockBudgetTypeTableProps) {
    const columns = [
        { key: "stockBudgetTypeId", label: "ลำดับ" },
        { key: "stockBudgetTypeName", label: "ประเภทประมาณ" },
    ];
    return (
        <div className="bg-white p-4 w-full h-full flex flex-col">
            <Table aria-label="Stock Budget List Table" className="w-full min-w-max">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.key}
                            width="50%"
                            className="sticky top-0 bg-white z-10 bg-gray-200"
                        >
                            {column.label}
                        </TableColumn>
                    )}
                </TableHeader>

                <TableBody items={stockBudgetTypeList}>
                    {(item) => (
                        <TableRow key={item.stockBudgetTypeId}>
                            {(columnKey) => (
                                <TableCell>
                                    {columnKey === "stockBudgetTypeId" ? (
                                        item.stockBudgetTypeId
                                    ) : columnKey === "stockBudgetTypeName" ? (
                                        item.stockBudgetTypeName || "ไม่ระบุ"
                                    ) : null}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}