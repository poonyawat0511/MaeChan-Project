"use client";

import React, { useState, useEffect } from "react";
import { StockUser } from "@/utils/types/stock-user";
import { getStockUser } from "@/utils/services/getApi";
import {
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Pagination,
  Tooltip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import LoadingScreen from "@/components/loading/loading";
import UnauthorizedCard from "@/components/cards/UnauthorizedCard";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
  EllipsisVerticalIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import StockUserTable from "@/components/tables/stockUserTable";
import { axiosInstance, stockUserApi } from "@/utils/api/api";

export default function UserPage() {
  const [users, setUsers] = useState<StockUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const userData = await getStockUser();
      setUsers(userData);
      setError(null);
    } catch {
      console.log("Session expired. Redirecting to sign-in...");
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (stockUserId: string) => {
    try {
      await axiosInstance.delete(`${stockUserApi}/${stockUserId}`);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.stockUserId !== stockUserId)
      );

      // Show toast notification here if you have a toast component
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      // Show error toast here
    } finally {
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSignIn = () => {
    window.location.href = "/signin";
  };

  if (loading) {
    return <LoadingScreen message="Loading users..." />;
  }

  if (error) {
    return (
      <UnauthorizedCard message="No users available" onSignin={handleSignIn} />
    );
  }

  return (
    <div className="flex justify-center w-full min-h-screen bg-gray-50 p-4 md:p-6">
      <Card className="rounded-xl bg-white shadow-md w-full flex flex-col max-h-[calc(100vh-32px)] border border-gray-100">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center">
            <div className="mr-4">
            <div className="h-12 w-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl shadow-md flex items-center justify-center mr-4">
              <UserGroupIcon className="h-6 w-6 text-white" />
            </div>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                User Management
              </h1>
              <p className="text-gray-500 text-sm">
                {filteredUsers.length} users found
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 items-center">
            <Input
              classNames={{
                base: "max-w-full sm:max-w-xs",
                inputWrapper:
                  "bg-gray-50 hover:bg-gray-100 focus-within:bg-white border-2 border-gray-200",
              }}
              placeholder="Search users..."
              size="sm"
              startContent={
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
              }
              type="search"
              value={searchQuery}
              onValueChange={setSearchQuery}
              isClearable
              aria-label="Search users"
            />

            <div className="flex gap-2">
              <Tooltip content="Add new user">
                <Button
                  color="primary"
                  className="bg-purple-600 text-white"
                  startContent={<PlusIcon className="h-4 w-4" />}
                >
                  Add User
                </Button>
              </Tooltip>

              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="bordered"
                    className="min-w-0 px-2 border-gray-200"
                    isIconOnly
                  >
                    <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="User actions">
                  <DropdownItem
                    key="export-users"
                    startContent={<ArrowDownTrayIcon className="h-4 w-4" />}
                  >
                    Export Users
                  </DropdownItem>
                  <DropdownItem
                    key="filter-options"
                    startContent={<FunnelIcon className="h-4 w-4" />}
                  >
                    Filter Options
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </CardHeader>

        <CardBody className="p-0 overflow-hidden flex-1 items-center">
          <div className="h-full overflow-auto">
            {filteredUsers.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 p-6">
                <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <MagnifyingGlassIcon className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-700 font-medium mb-1">No users found</p>
                <p className="text-gray-500 text-sm text-center max-w-md">
                  {searchQuery
                    ? `No results matching "${searchQuery}". Try a different search term.`
                    : "There are no users available. Add a new user to get started."}
                </p>
                {searchQuery && (
                  <Button
                    color="primary"
                    variant="flat"
                    className="mt-4"
                    onPress={() => setSearchQuery("")}
                  >
                    Clear Search
                  </Button>
                )}
              </div>
            ) : (
              <StockUserTable
                stockUsers={paginatedUsers}
                currentPage={currentPage}
                onDelete={handleDelete}
              />
            )}
          </div>
        </CardBody>

        <CardFooter className="flex justify-between items-center py-3 px-6 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Showing{" "}
            {Math.min(
              filteredUsers.length,
              (currentPage - 1) * itemsPerPage + 1
            )}{" "}
            - {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{" "}
            {filteredUsers.length} users
          </p>

          {filteredUsers.length > 0 && (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="flat"
                isDisabled={currentPage === 1}
                onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="text-gray-700"
              >
                Previous
              </Button>
              <Pagination
                color="secondary"
                page={currentPage}
                total={totalPages}
                onChange={setCurrentPage}
                showControls={false}
                className="mx-2"
              />
              <Button
                size="sm"
                variant="flat"
                isDisabled={currentPage === totalPages || totalPages === 0}
                onPress={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="text-gray-700"
              >
                Next
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
