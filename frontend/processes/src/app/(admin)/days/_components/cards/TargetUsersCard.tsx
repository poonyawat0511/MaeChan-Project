"use client";
import { UserHospital } from "@/utils/types/user-hospital";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Input,
  Tooltip,
} from "@heroui/react";
import {
  MagnifyingGlassIcon,
  UserMinusIcon,
  UserPlusIcon,
  UserIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Pagination from "../paginations/Pagination";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  users: UserHospital[];
  paginatedUsers: UserHospital[]
  paginatedSelectedUsers: UserHospital[];
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
}

export default function TargetUsersCard({
  paginatedUsers,
  paginatedSelectedUsers,
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
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="h-full flex flex-col border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden">
        <CardHeader className="px-4 py-3 bg-gradient-to-r from-purple-50 to-purple-100 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-200 rounded-full">
                <UsersIcon className="h-5 w-5 text-purple-700" />
              </div>
              <h4 className="text-lg font-semibold text-purple-800">ผู้ใช้สำหรับการแจ้งเตือน</h4>
            </div>
            {paginatedSelectedUsers.length} คน
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="p-4 flex-1 overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <UserIcon className="h-5 w-5 text-purple-600" />
            <h5 className="text-base font-medium text-gray-800">ผู้ใช้ที่เลือกไว้</h5>
          </div>

          <div className="overflow-auto mb-4 p-3 bg-gradient-to-b from-gray-50 to-white rounded-xl border border-gray-200 shadow-inner" style={{ maxHeight: "30%" }}>
            <AnimatePresence>
              {paginatedSelectedUsers.length > 0 ? (
                <motion.div className="flex flex-wrap gap-2" layout>
                  {paginatedSelectedUsers.map((user) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Tooltip content="นำผู้ใช้ออก" placement="top">
                        <Chip
                          key={user.id}
                          onClose={() => onRemoveUser(user.id)}
                          avatar={
                            <Avatar
                              name={user.firstName}
                              size="md"
                              className="border-2 border-purple-100"
                            />
                          }
                          variant="flat"
                          color="secondary"
                          size="lg"
                          className="py-2 px-3 text-base bg-gradient-to-r from-purple-100 to-indigo-100"
                        >
                          <div className="flex items-center gap-2">
                            <span>{user.firstName}</span>
                          </div>
                        </Chip>
                      </Tooltip>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-500 text-base text-center py-4 italic"
                >
                  ไม่มีผู้ใช้ที่เลือก - เพิ่มจากรายการด้านล่าง
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {totalSelectedPages > 1 && (
            <div className="flex justify-center mt-2 mb-3">
              <Pagination
                total={totalSelectedPages}
                currentPage={selectedCurrentPage}
                onPageChange={setSelectedCurrentPage}
                variant="compact"
                size="lg"
              />
            </div>
          )}

          <Divider className="my-3" />

          <div className="flex items-center gap-2 mb-3">
            <UserPlusIcon className="h-5 w-5 text-green-600" />
            <h5 className="text-base font-medium text-gray-800">เพิ่มผู้ใช้รับการแจ้งเตือน</h5>
          </div>

          <div className="relative mb-4">
            <Input
              placeholder="ค้นหาผู้ใช้ ..."
              startContent={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
              size="lg"
              className="transition-all duration-300 focus-within:shadow-md"
              value={userSearchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="ค้นหาผู้ใช้"
              variant="bordered"
              classNames={{
                inputWrapper: "border-gray-300 hover:border-purple-300",
                input: "text-base"
              }}
            />
            {userSearchQuery && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-12 top-0 h-full flex items-center"
              >
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onPress={() => onSearchChange("")}
                  className="text-gray-500 flex items-center justify-center"
                >
                  <XMarkIcon className="h-5 w-5" />
                </Button>
              </motion.div>
            )}
          </div>

          <motion.div
            className="overflow-auto flex-1 border border-gray-200 rounded-xl shadow-inner bg-gradient-to-b from-white to-gray-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <AnimatePresence>
              {paginatedUsers.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {paginatedUsers.map((user, index) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: index * 0.05 }
                      }}
                      className="flex items-center justify-between p-3 hover:bg-purple-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar
                          name={user.firstName}
                          size="md"
                          className="border-2 border-gray-200 shadow-sm"
                        />
                        <div>
                          <p className="text-base font-medium text-gray-800">{user.firstName}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <Tooltip
                          content={paginatedSelectedUsers.some((u) => u.id === user.id)
                            ? "ผู้ใช้นี้ถูกเลือกแล้ว"
                            : "เพิ่มผู้ใช้นี้"
                          }
                          placement="left"
                        >
                          <Button
                            isIconOnly
                            size="md"
                            color={paginatedSelectedUsers.some((u) => u.id === user.id) ? "secondary" : "primary"}
                            variant={paginatedSelectedUsers.some((u) => u.id === user.id) ? "flat" : "solid"}
                            onPress={() => onAddUser(user)}
                            disabled={paginatedSelectedUsers.some((u) => u.id === user.id)}
                            className={`rounded-full ${paginatedSelectedUsers.some((u) => u.id === user.id) ? "" : "shadow-md"}`}
                          >
                            {paginatedSelectedUsers.some((u) => u.id === user.id) ? (
                              <UserMinusIcon className="h-5 w-5" />
                            ) : (
                              <UserPlusIcon className="h-5 w-5" />
                            )}
                          </Button>
                        </Tooltip>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-500 text-base text-center py-6 italic"
                >
                  ไม่พบผู้ใช้ที่ตรงกับคำค้นหา
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {totalPages > 1 && (
            <div className="mt-4">
              <Pagination
                total={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                size="lg"
                className="justify-center"
              />
            </div>
          )}
        </CardBody>
      </Card>
    </motion.div>
  );
}
