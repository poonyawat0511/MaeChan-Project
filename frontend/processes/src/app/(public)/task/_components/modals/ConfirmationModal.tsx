"use client";
import React from "react";
import BlurModal from "@/components/modals/BlurModal";

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
      <p className="text-red-600 font-medium text-xl">
        <span className="text-red-600 mr-1">*</span>
        {message}
      </p>

    </BlurModal>
  );
}
