"use client";
import React from "react";
import { Chip } from "@heroui/react";
import { DocumentIcon } from "@heroicons/react/24/solid";
import CustomCard from "@/components/cards/CustomCard";
import PdfPreview from "@/components/pdf/PdfPreview";
import ClosePreviewButton from "../buttons/ClosePreviewButton";
import RejectButton from "../buttons/RejectButton";
import ApproveButton from "../buttons/ApproveButton";
import { Task } from "@/types/task";

interface PdfPreviewPanelCardProps {
  selectedTask: Task | null;
  pdfUrl: string | null;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
}

export default function PdfPreviewPanelCard({
  selectedTask,
  pdfUrl,
  onClose,
  onApprove,
  onReject,
}: PdfPreviewPanelCardProps) {
  return (
    <CustomCard
      title={null}
      className="flex-1 ml-5 flex flex-col overflow-hidden justify-center items-center h-[calc(100vh-220px)]"
    >
      {pdfUrl ? (
        <div className="w-full h-full flex flex-col flex-grow min-h-0">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
            <h3 className="font-medium text-gray-700">
              {selectedTask?.name || "Document Preview"}
            </h3>
            <Chip color="warning" size="sm" variant="flat">
              จำเป็นต้องตรวจสอบ
            </Chip>
          </div>

          <div className="flex-grow overflow-hidden rounded-md border border-gray-200">
            <PdfPreview pdfUrl={pdfUrl} />
          </div>

          <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-100">
            <ClosePreviewButton onClick={onClose} />
            <div className="flex gap-3">
              <RejectButton onClick={onReject} />
              <ApproveButton onClick={onApprove} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-400 h-full">
          <DocumentIcon className="h-16 w-16 mb-3 opacity-20" />
          <p className="text-lg font-medium text-gray-500 mb-1">
            ไม่มีเอกสารที่เลือก
          </p>
          <p className="text-sm text-gray-400">
            เลือกงานจากรายการเพื่อดูรายละเอียด
          </p>
        </div>
      )}
    </CustomCard>
  );
}
