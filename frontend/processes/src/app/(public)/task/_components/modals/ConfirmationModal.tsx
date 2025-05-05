"use client";
import React from "react";
import BlurModal from "@/components/modals/BlurModal";
import { ShieldExclamationIcon } from "@heroicons/react/24/outline";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "ยืนยันการดำเนินการ",
  message = "คุณแน่ใจหรือไม่ว่าต้องการดำเนินการนี้? การกระทำนี้ไม่สามารถย้อนกลับได้",
}: ConfirmationModalProps) {
  return (
    <BlurModal
      isOpen={isOpen}
      onClose={onClose}
      onAction={onConfirm}
      title={title}
      actionLabel="ยืนยัน"
    >
      <div className="py-4">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-4">
            <ShieldExclamationIcon className="h-9 w-9 text-amber-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            โปรดยืนยันการดำเนินการ
          </h3>
          <p className="text-gray-600 max-w-md mb-2">
            {message}
          </p>
          <p className="text-xs text-amber-600 font-medium mt-3">
            การดำเนินการนี้ไม่สามารถย้อนกลับได้
          </p>
        </div>
      </div>
    </BlurModal>
  );
}
