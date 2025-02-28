"use client";

import { useEffect, useState, useCallback } from "react";
import { StockUser } from "@/utils/types/stock-user";
import StockUserTable from "@/components/tables/stockUserTable";
import { getStockUser } from "@/utils/services/getApi";
import { axiosInstance, stockUserApi } from "@/utils/api/api";
import {
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Chip,
} from "@heroui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import UnauthorizedCard from "@/components/cards/UnauthorizedCard";
import LoadingScreen from "@/components/loading/loading";
interface PageState {
  stockUsers: StockUser[];
  loading: boolean;
  isAuthorized: boolean;
  searchQuery: string;
  userToDelete: StockUser | null;
}

export default function UserPage() {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStockUser();
        setState((prev) => ({
          ...prev,
          stockUsers: data,
          isAuthorized: true,
          loading: false,
        }));
      } catch (error) {
        console.error("Error fetching stock users:", error);
        setState((prev) => ({
          ...prev,
          isAuthorized: false,
          loading: false,
        }));
      }
    };

    fetchData();
  }, []);

  const [state, setState] = useState<PageState>({
    stockUsers: [],
    loading: true,
    isAuthorized: false,
    searchQuery: "",
    userToDelete: null,
  });

  const { stockUsers, loading, isAuthorized, searchQuery, userToDelete } =
    state;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearchChange = useCallback((value: string) => {
    setState((prev) => ({
      ...prev,
      searchQuery: value,
    }));
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!userToDelete) return;

    try {
      await axiosInstance.delete(`${stockUserApi}/${userToDelete.stockUserId}`);
      setState((prev) => ({
        ...prev,
        stockUsers: prev.stockUsers.filter(
          (user) => user.stockUserId !== userToDelete.stockUserId
        ),
        userToDelete: null,
      }));
      onClose();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }, [userToDelete, onClose]);

  const handleDeleteClick = useCallback(
    (user: StockUser) => {
      setState((prev) => ({
        ...prev,
        userToDelete: user,
      }));
      onOpen();
    },
    [onOpen]
  );

  const filteredUsers = useCallback(() => {
    return stockUsers.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [stockUsers, searchQuery]);

  const handleSignIn = () => {
    window.location.href = "/signin";
  };
  

  if (loading) {
    return <LoadingScreen message="Loading users..." />;
  }

  if (!isAuthorized) {
    return (
      <UnauthorizedCard
        message="No users available"
        onSignin={() => {
          handleSignIn();
        }}
      />
    );
  }

  return (
    <div className="flex justify-center w-full min-h-screen bg-gray-50 p-4">
      <Card className="max-w-7xl w-full shadow-md">
        <CardHeader className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center px-6 py-5 border-b">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-800">
              User Management
            </h1>
            <p className="text-gray-500 text-sm">
              Manage stock users and their permissions
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Input
              classNames={{
                base: "max-w-full sm:max-w-xs",
                inputWrapper: "bg-default-100",
              }}
              placeholder="Search users..."
              size="sm"
              startContent={
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
              }
              type="search"
              value={searchQuery}
              onValueChange={handleSearchChange}
              isClearable
            />
          </div>
        </CardHeader>

        <CardBody className="p-0">
          <div className="h-[calc(100vh-220px)] flex flex-col">
            {filteredUsers().length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-12">
                <div className="text-gray-400 mb-2">
                  <svg
                    className="w-12 h-12 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-700">
                  No Users Found
                </h3>
                <p className="text-gray-500 text-center mt-1 max-w-md px-6">
                  {searchQuery
                    ? `No users matching "${searchQuery}" were found. Try adjusting your search.`
                    : "There are no users available in the system yet."}
                </p>
                {searchQuery && (
                  <Button
                    color="primary"
                    variant="flat"
                    size="sm"
                    className="mt-4"
                    onPress={() => handleSearchChange("")}
                  >
                    Clear Search
                  </Button>
                )}
              </div>
            ) : (
              <StockUserTable
                stockUsers={filteredUsers()}
                onDelete={handleDeleteClick}
              />
            )}
          </div>
        </CardBody>

        {/* Stats footer could be added here */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
          <div className="flex flex-wrap gap-2">
            <Chip color="primary" variant="flat" size="sm">
              Total: {stockUsers.length}
            </Chip>
            <Chip color="success" variant="flat" size="sm">
              Active: {stockUsers.filter((u) => u.userHospitalId).length}
            </Chip>
            <Chip color="warning" variant="flat" size="sm">
              Pending: {stockUsers.filter((u) => !u.email).length}
            </Chip>
          </div>
        </div>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Confirm User Deletion
          </ModalHeader>
          <ModalBody>
            {userToDelete && (
              <p>
                Are you sure you want to delete user{" "}
                <span className="font-semibold">
                  {userToDelete.firstName} {userToDelete.lastName}
                </span>
                ? This action cannot be undone.
              </p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>
              Cancel
            </Button>
            <Button color="danger" onPress={confirmDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
