"use client";
import { UserHospital } from "@/utils/types/user-hospital";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Input,
} from "@heroui/react";
import {
  MagnifyingGlassIcon,
  UserMinusIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { usePagination } from "@heroui/react";
import Pagination from "../paginations/Pagination";

interface Props {
  users: UserHospital[];
  selectedUsers: UserHospital[];
  userSearchQuery: string;
  onSearchChange: (q: string) => void;
  onAddUser: (user: UserHospital) => void;
  onRemoveUser: (id: number) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;
  totalPages: number;
  selectedCurrentPage: number;
  setSelectedCurrentPage: (p: number) => void;
  totalSelectedPages: number;
  paginatedUsers: UserHospital[];
  paginatedSelectedUsers: UserHospital[];
}

export default function TargetUsersCard({
  selectedUsers,
  userSearchQuery,
  onSearchChange,
  onAddUser,
  onRemoveUser,
  currentPage,
  setCurrentPage,
  totalPages,
  selectedCurrentPage,
  setSelectedCurrentPage,
  totalSelectedPages,
  paginatedUsers,
  paginatedSelectedUsers,
}: Props) {
  const {
  } = usePagination({
    total: totalPages,
    showControls: true,
    siblings: 1,
    boundaries: 1,
    page: currentPage,
    onChange: (page) => setCurrentPage(page),
  });

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="px-3 py-2 flex-shrink-0">
        <div className="flex justify-between items-center">
          <h4 className="text-base font-semibold">ผู้ใช้สำหรับการแจ้งเตือน</h4>
          <Badge color="secondary" variant="flat">{selectedUsers.length} คน</Badge>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="p-3 flex-1 overflow-hidden flex flex-col">
        <h5 className="text-xs font-medium text-gray-700 mb-2">เลือกผู้ใช้</h5>
        <div className="overflow-auto mb-3" style={{ maxHeight: "25%" }}>
          {paginatedSelectedUsers.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {paginatedSelectedUsers.map((user) => (
                <Chip
                  key={user.id}
                  onClose={() => onRemoveUser(user.id)}
                  avatar={<Avatar name={user.firstName} size="sm" />}
                  variant="flat"
                  color="primary"
                  size="sm"
                >
                  {user.firstName}
                </Chip>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-xs">ไม่มีผู้ใช้ที่เลือก</p>
          )}
        </div>

        {/* Pagination */}
        {totalSelectedPages > 1 && (
          <div className="flex justify-center mt-2">
            <Pagination
              total={totalSelectedPages}
              currentPage={selectedCurrentPage}
              onPageChange={setSelectedCurrentPage}
              variant="compact"
            />

          </div>
        )}

        <Divider className="my-2" />
        <h5 className="text-xs font-medium text-gray-700 mb-2">เพิ่มผู้ใช้รับการแจ้งเตือน</h5>

        <Input
          placeholder="ค้นหาผู้ใช้ ..."
          startContent={<MagnifyingGlassIcon className="h-3 w-3 text-gray-400" />}
          size="sm"
          className="mb-2"
          value={userSearchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <div className="overflow-auto flex-1">
          {paginatedUsers.length > 0 ? (
            paginatedUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
              >
                <div className="flex items-center gap-2">
                  <Avatar name={user.firstName} size="sm" />
                  <div>
                    <p className="text-xs font-medium">{user.firstName}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <Button
                  isIconOnly
                  size="sm"
                  color="primary"
                  variant="light"
                  onPress={() => onAddUser(user)}
                  disabled={selectedUsers.some((u) => u.id === user.id)}
                >
                  {selectedUsers.some((u) => u.id === user.id) ? (
                    <UserMinusIcon className="h-3 w-3" />
                  ) : (
                    <UserPlusIcon className="h-3 w-3" />
                  )}
                </Button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-xs text-center py-2">
              ไม่พบผู้ใช้ที่ตรงกับคำค้นหา
            </p>
          )}
        </div>

        {totalPages > 1 && (
          <Pagination
            total={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </CardBody>
    </Card>
  );
}
