"use client";
import React from "react";
import BlurModal from "@/components/modals/BlurModal";
import PdfPreview from "@/components/pdf/PdfPreview";
import { Spinner } from "@heroui/react";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

interface PdfPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string | null;
  title?: string;
}

export default function PdfPreviewModal({
  isOpen,
  onClose,
  pdfUrl,
  title = "รายละเอียดการขอสั่งซื้อ",
}: PdfPreviewModalProps) {
  return (
    <BlurModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={title}
    >
      {pdfUrl ? (
        <div className="h-[65vh] w-full rounded-lg overflow-hidden border border-gray-200 shadow-inner">
          <PdfPreview pdfUrl={pdfUrl} />
        </div>
      ) : (
        <div className="flex items-center justify-center h-72">
          <div className="flex flex-col items-center text-gray-500 gap-3">
            <div className="p-3 rounded-full bg-violet-50">
              <Spinner size="md" color="secondary" />
            </div>
            <div className="text-center">
              <p className="font-medium text-gray-700">กำลังโหลดเอกสาร</p>
              <p className="text-sm text-gray-500 mt-1">โปรดรอสักครู่...</p>
            </div>
          </div>
        </div>
      )}
    </BlurModal>
  );
}
