"use client";
import { CardFooter, Button, Pagination } from "@heroui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

interface Props {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function UserFooterCard({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: Props) {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <CardFooter className="flex flex-col md:flex-row justify-between items-center py-4 px-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
      <motion.p 
        className="text-md text-gray-600 font-medium mb-3 md:mb-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        กำลังแสดง <span className="font-bold text-blue-700">{start} - {end}</span> จาก <span className="font-bold text-blue-700">{totalItems}</span> ผู้ใช้
      </motion.p>

      {totalItems > 0 && (
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            size="md"
            variant="flat"
            isDisabled={currentPage === 1}
            onPress={() => onPageChange(Math.max(currentPage - 1, 1))}
            className="text-gray-700 font-medium px-4 py-2 h-12 flex items-center gap-1 hover:bg-blue-100 transition-colors"
            startContent={<ChevronLeftIcon className="h-5 w-5 text-blue-600" />}
            aria-label="ไปหน้าก่อนหน้า"
          >
            ก่อนหน้า
          </Button>
          
          <Pagination
            total={totalPages}
            color="primary"
            page={currentPage}
            onChange={onPageChange}
            showControls={false}
            className="mx-4"
            classNames={{
              wrapper: "gap-2",
              item: "w-10 h-10 text-md font-medium",
              cursor: "bg-gradient-to-br from-blue-500 to-indigo-500 shadow-md"
            }}
          />
          
          <Button
            size="md"
            variant="flat"
            isDisabled={currentPage === totalPages || totalPages === 0}
            onPress={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            className="text-gray-700 font-medium px-4 py-2 h-12 flex items-center gap-1 hover:bg-blue-100 transition-colors"
            endContent={<ChevronRightIcon className="h-5 w-5 text-blue-600" />}
            aria-label="ไปหน้าถัดไป"
          >
            ถัดไป
          </Button>
        </motion.div>
      )}
    </CardFooter>
  );
}
