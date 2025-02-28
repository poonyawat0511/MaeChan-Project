import { StockUser } from "@/utils/types/stock-user";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Button,
} from "@heroui/react";

interface StockUserTableProps {
  stockUsers: StockUser[];
  onClick: (stockUser: StockUser) => void;
}

export default function StockUserTable({
  stockUsers,
  onClick,
}: StockUserTableProps) {
  const columns = [
    { key: "stockUserId", label: "ID" },
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "signature", label: "Signature" },
    { key: "hospitalId", label: "Hospital ID" },
    { key: "lineId", label: "Line UID" },
    { key: "role", label: "Role" },
    { key: "actions", label: "Actions" },
  ];

  return (
    <div className="bg-white p-4 max-w-7xl w-full h-full flex flex-col">
      <div className="flex-1 overflow-auto max-h-[calc(100vh-250px)] scrollbar-hide">
        <Table aria-label="Stock Users Table" className="w-full min-w-max">
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

          <TableBody items={stockUsers}>
            {(item) => (
              <TableRow
                key={item.stockUserId}
                className={
                  stockUsers.indexOf(item) % 2 === 0 ? "bg-white" : "bg-[#F7F6FE]"
                }
              >
                {(columnKey) => (
                  <TableCell>
                    {columnKey === "actions" ? (
                      <Button size="sm" onPress={() => onClick(item)}>
                        Delete
                      </Button>
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
