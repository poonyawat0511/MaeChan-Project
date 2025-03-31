"use client";
import React from "react";
import { Chip } from "@heroui/react";
import { DocumentIcon } from "@heroicons/react/24/solid";
import CustomCard from "@/components/cards/CustomCard";
import { Task } from "@/utils/types/task";
import TaskCard from "./Task.Card";

interface TaskPanelCardProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export default function TaskPanelCard({
  tasks,
  onTaskClick,
}: TaskPanelCardProps) {
  return (
    <CustomCard
      title={
        <div className="flex items-center gap-x-2">
          <Chip color="secondary" variant="dot" className="border-none" />
          <p>ภาระงานที่รอดำเนินการ</p>
          <Chip
            radius="full"
            color="default"
            size="sm"
            className="ml-2"
          >
            {tasks.length}
          </Chip>
        </div>
      }
      className="flex-1 max-w-[30%] overflow-auto scrollbar-hidden h-[calc(100vh-220px)]"
    >
      {tasks.length > 0 ? (
        <TaskCard tasks={tasks} onTaskClick={onTaskClick} />
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <DocumentIcon className="h-12 w-12 mb-2 opacity-30" />
          <p className="text-center">No pending tasks</p>
        </div>
      )}
    </CustomCard>
  );
}
