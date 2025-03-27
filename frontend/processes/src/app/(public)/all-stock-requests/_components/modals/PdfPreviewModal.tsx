"use client";
import React from "react";
import BlurModal from "@/components/modals/BlurModal";
import PdfPreview from "@/components/pdf/PdfPreview";

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
    <BlurModal isOpen={isOpen} onClose={onClose} title={title}>
      {pdfUrl ? (
        <div className="h-[65vh] w-full">
          <PdfPreview pdfUrl={pdfUrl} />
        </div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center text-gray-500">
            <p>Loading document preview...</p>
          </div>
        </div>
      )}
    </BlurModal>
  );
}
