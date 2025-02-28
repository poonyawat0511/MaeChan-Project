"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  Selection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Pagination,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { StockUser } from "@/utils/types/stock-user";

interface StockUserTableProps {
  stockUsers: StockUser[];
  onDelete: (stockUser: StockUser) => void;
}

export default function StockUserTable({ stockUsers, onDelete }: StockUserTableProps) {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [userToDelete, setUserToDelete] = useState<StockUser | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return stockUsers.slice(start, end);
  }, [stockUsers, page, rowsPerPage]);

  const columns = [
    { key: "stockUserId", label: "ID" },
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "userHospitalId", label: "Hospital ID" },
    { key: "lineId", label: "Line UID" },
    { key: "signaturePath", label: "Signature" },
  ];

  const handleSelectionChange = useCallback((keys: Selection) => {
    setSelectedKeys(keys);
  }, []);

  const handleDeleteClick = useCallback(() => {
    const selectedUser = stockUsers.find(user => selectedKeys instanceof Set && selectedKeys.has(user.stockUserId));
    if (selectedUser) {
      setUserToDelete(selectedUser);
      onOpen();
    }
  }, [selectedKeys, stockUsers, onOpen]);

  const confirmDelete = useCallback(() => {
    if (userToDelete) {
      onDelete(userToDelete);
      setUserToDelete(null);
      onClose();
    }
  }, [userToDelete, onDelete, onClose]);

  return (
    <div className="bg-white p-4 rounded-lg w-full flex flex-col gap-4">
      <Table
        aria-label="Stock Users Table"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
        className="min-w-full"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn 
              key={column.key} 
              className="bg-gray-50"
              align={column.key === "actions" ? "center" : "start"}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={paginatedUsers}>
          {(user) => (
            <TableRow key={user.stockUserId}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "signaturePath" ? (
                    user.signaturePath ? (
                      <img 
                        src={user.signaturePath} 
                        alt="Signature"
                        className="w-16 h-16 object-contain border rounded-md shadow-sm"
                      />
                    ) : (
                      <span className="text-gray-400 italic">No Signature</span>
                    )
                  ) : (
                    user[columnKey as keyof StockUser]
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {selectedKeys instanceof Set && selectedKeys.size > 0 && (
        <Button color="danger" onPress={handleDeleteClick}>
          Delete Selected
        </Button>
      )}

      <Pagination
        showControls
        showShadow
        color="primary"
        page={page}
        total={Math.ceil(stockUsers.length / rowsPerPage)}
        onChange={setPage}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Confirm User Deletion</ModalHeader>
          <ModalBody>
            {userToDelete && (
              <p>
                Are you sure you want to delete user <span className="font-semibold">{userToDelete.firstName} {userToDelete.lastName}</span>? This action cannot be undone.
              </p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>Cancel</Button>
            <Button color="danger" onPress={confirmDelete}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
