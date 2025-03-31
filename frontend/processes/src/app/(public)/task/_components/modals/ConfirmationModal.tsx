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
  message = "คุณแน่ใจว่าต้องการดำเนินการนี้หรือไม่?",
}: ConfirmationModalProps) {
  return (
    <BlurModal
      isOpen={isOpen}
      onClose={onClose}
      onAction={onConfirm}
      title={title}
      actionLabel="ยืนยัน"
    >
      <p>{message}</p>
    </BlurModal>
  );
}
