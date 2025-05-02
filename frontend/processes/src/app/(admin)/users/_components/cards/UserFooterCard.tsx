"use client";
import { CardFooter, Button, Pagination } from "@heroui/react";

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
    <CardFooter className="flex justify-between items-center py-3 px-6 border-t border-gray-100">
      <p className="text-sm text-gray-500">
        กำลังแสดง {start} - {end} จาก {totalItems} ผู้ใช้
      </p>

      {totalItems > 0 && (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="flat"
            isDisabled={currentPage === 1}
            onPress={() => onPageChange(Math.max(currentPage - 1, 1))}
            className="text-gray-700"
          >
            ก่อนหน้า
          </Button>
          <Pagination
            color="secondary"
            page={currentPage}
            total={totalPages}
            onChange={onPageChange}
            showControls={false}
            className="mx-2"
          />
          <Button
            size="sm"
            variant="flat"
            isDisabled={currentPage === totalPages || totalPages === 0}
            onPress={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            className="text-gray-700"
          >
            ถัดไป
          </Button>
        </div>
      )}
    </CardFooter>
  );
}
