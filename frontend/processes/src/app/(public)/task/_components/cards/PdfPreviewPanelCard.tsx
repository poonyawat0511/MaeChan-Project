"use client";
import React from "react";
import { Chip, Divider } from "@heroui/react";
import { DocumentTextIcon, DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import CustomCard from "@/components/cards/CustomCard";
import PdfPreview from "@/components/pdf/PdfPreview";
import ClosePreviewButton from "../buttons/ClosePreviewButton";
import RejectButton from "../buttons/RejectButton";
import ApproveButton from "../buttons/ApproveButton";
import { Task } from "@/utils/types/task";

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
      className="flex-1 ml-5 flex flex-col overflow-hidden justify-center items-center h-[calc(100vh-220px)] shadow-sm border border-gray-100"
    >
      {pdfUrl ? (
        <div className="w-full h-full flex flex-col flex-grow min-h-0">
          <div className="flex items-center justify-between mb-4 px-4 py-3 bg-gradient-to-r from-indigo-50/40 to-purple-50/40 rounded-md">
            <div className="flex items-center">
              <DocumentTextIcon className="h-5 w-5 text-indigo-600 mr-3" />
              <h3 className="font-medium text-indigo-900">
                {selectedTask?.name || "Document Preview"}
              </h3>
            </div>
            <Chip 
              color="warning" 
              size="sm" 
              variant="flat"
              radius="full"
              className="px-3 py-1 text-xs font-medium bg-amber-50 text-amber-600"
            >
              รอการตรวจสอบ
            </Chip>
          </div>

          <div className="flex-grow overflow-hidden rounded-lg border border-gray-200 bg-white">
            <PdfPreview pdfUrl={pdfUrl} />
          </div>

          <Divider className="my-3" />

          <div className="flex justify-between items-center py-2">
            <ClosePreviewButton onClick={onClose} />
            <div className="flex gap-3">
              <RejectButton onClick={onReject} />
              <ApproveButton onClick={onApprove} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-8">
          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
            <DocumentMagnifyingGlassIcon className="h-10 w-10 text-indigo-300" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-3">
            ไม่มีเอกสารที่เลือก
          </h3>
          <p className="text-gray-500 text-center max-w-md mb-2">
            เลือกรายการจากภาระงานด้านซ้ายเพื่อดูรายละเอียดเอกสาร
          </p>
          <div className="mt-6 flex flex-col gap-3 text-center text-sm text-gray-500">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                <span className="text-indigo-600 font-medium">1</span>
              </div>
              <span>เลือกงานจากรายการด้านซ้าย</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                <span className="text-indigo-600 font-medium">2</span>
              </div>
              <span>ตรวจสอบรายละเอียดเอกสาร</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                <span className="text-indigo-600 font-medium">3</span>
              </div>
              <span>เลือกอนุมัติหรือปฏิเสธเอกสาร</span>
            </div>
          </div>
        </div>
      )}
    </CustomCard>
  );
}
