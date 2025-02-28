import { Days } from "@/utils/types/day";
import {
  Button,
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Selection,
} from "@heroui/react";
import { useState } from "react";

interface DayTableProps {
  days: Days[];
  onCreate: (day: Days) => void;
  onDelete: (day: Days) => void;
  onEdit: (day: Days) => void;
}

export default function DayTable({
  days,
  onCreate,
  onDelete,
  onEdit,
}: DayTableProps) {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

  const columns = [
    { key: "name", label: "Name" },
    { key: "active", label: "Active" },
    { key: "actions", label: "Actions" },
  ];

  return (
    <div className="bg-white p-4 max-w-7xl w-full h-full flex flex-col">
      <div className="flex-1 overflow-auto max-h-[calc(100vh-250px)] scrollbar-hide">
        <Table
          aria-label="Days Table"
          className="w-full min-w-max rounded-none border-2"
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={(keys) => setSelectedKeys(keys)}
        >
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

          <TableBody items={days}>
            {(item) => (
              <TableRow
                key={item.id}
                className={
                  days.indexOf(item) % 2 === 0 ? "bg-white" : "bg-[#F7F6FE]"
                }
              >
                {(columnKey) => (
                  <TableCell>
                    {columnKey === "actions" ? (
                      <div className="flex space-x-2">
                        <Button size="sm" onPress={() => onCreate(item)}>
                          Create
                        </Button>
                        <Button size="sm" onPress={() => onEdit(item)}>
                          Edit
                        </Button>
                        <Button size="sm" onPress={() => onDelete(item)}>
                          Delete
                        </Button>
                      </div>
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
