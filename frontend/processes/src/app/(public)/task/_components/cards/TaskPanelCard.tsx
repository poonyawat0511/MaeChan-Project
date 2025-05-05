"use client";
import React from "react";
import { Chip, Badge } from "@heroui/react";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import CustomCard from "@/components/cards/CustomCard";
import { Task } from "@/utils/types/task";
import { SpringRequest } from "@/utils/types/spring-request";
import TaskCard from "./Task.Card";

interface TaskPanelCardProps {
  tasks: Task[];
  springRequests: SpringRequest[];
  onTaskClick: (task: Task) => void;
}

export default function TaskPanelCard({
  tasks,
  springRequests,
  onTaskClick,
}: TaskPanelCardProps) {
  const springRequestMap = Object.fromEntries(
    springRequests.map((req) => [req.camundaTaskId, req])
  );

  return (
    <CustomCard
      title={
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center mr-3">
            <ClipboardDocumentListIcon className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-800">ภาระงานที่รอดำเนินการ</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              คลิกที่รายการเพื่อตรวจสอบเอกสาร
            </p>
          </div>
          <div className="ml-2 relative">
            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full bg-violet-100 text-violet-800">
              {tasks.length}
            </span>
          </div>
        </div>
      }
      className="flex-1 max-w-[30%] overflow-auto h-[calc(100vh-220px)] bg-gradient-to-b from-white to-gray-50 border border-gray-100 shadow-sm"
    >
      <div className="px-1 py-2">
        {tasks.length > 0 ? (
          <TaskCard
            tasks={tasks}
            springRequestMap={springRequestMap}
            onTaskClick={onTaskClick}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400 bg-gray-50/50 rounded-lg border border-dashed border-gray-200 p-6">
            <ClipboardDocumentListIcon className="h-12 w-12 mb-3 text-gray-300" />
            <p className="text-center text-gray-500 font-medium">ไม่มีภาระงานที่รอดำเนินการ</p>
            <p className="text-center text-xs text-gray-400 mt-1">รายการจะปรากฏที่นี่เมื่อมีงานใหม่</p>
          </div>
        )}
      </div>
    </CustomCard>
  );
}
