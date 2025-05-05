import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Chip,
  Avatar,
} from "@heroui/react";
import { Task } from "@/utils/types/task";
import { SpringRequest } from "@/utils/types/spring-request";
import { ClockIcon, DocumentTextIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";

interface TaskCardProps {
  tasks: Task[];
  springRequestMap: Record<string, SpringRequest>;
  onTaskClick: (task: Task) => void;
}

export default function TaskCard({
  tasks,
  springRequestMap,
  onTaskClick,
}: TaskCardProps) {
  const formatDate = (dateString: string) => {
    // Simple date formatting without date-fns
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('th-TH', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      }).format(date);
    } catch (e) {
      return "ไม่ระบุ";
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {tasks.map((task) => {
        const springRequest = springRequestMap[task.processInstanceId];
        const stockRequest = springRequest?.stockRequest;

        return (
          <div
            key={task.id}
            onClick={() => onTaskClick(task)}
            className="max-w-[360px] w-full cursor-pointer group"
          >
            <Card className="rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group-hover:border-violet-200">
              <CardHeader className="pb-3 flex justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center mb-1">
                    <Chip 
                      color="warning" 
                      className="text-xs font-medium"
                      radius="full"
                      size="sm"
                    >
                      รอดำเนินการ
                    </Chip>
                    <span className="text-xs text-gray-400 ml-2">
                      #{task.id.substring(0, 6)}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 group-hover:text-violet-700 transition-colors">
                    {stockRequest?.requestNo ?? "ไม่มีเลขคำขอ"}
                  </h4>
                </div>
                <Avatar
                  size="sm"
                  icon={<DocumentTextIcon className="w-4 h-4" />}
                  className="bg-violet-50 text-violet-600 group-hover:bg-violet-100 transition-colors"
                />
              </CardHeader>

              <CardBody className="py-3 border-t border-b border-gray-50">
                <div className="flex items-center text-sm mb-2">
                  <ClockIcon className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">
                    วันที่ขอ: {formatDate(task.created)}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <CurrencyDollarIcon className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">
                    ราคาขอซื้อ: <span className="font-medium text-gray-700">{stockRequest?.requestTotalPrice?.toLocaleString() ?? "—"} บาท</span>
                  </span>
                </div>
              </CardBody>

              <CardFooter className="flex justify-end px-4 py-2">
                <Button
                  size="sm"
                  radius="full"
                  variant="flat"
                  color="secondary"
                  onPress={() => onTaskClick(task)}
                  className="pointer-events-auto font-medium text-xs"
                >
                  ตรวจสอบเอกสาร
                </Button>
              </CardFooter>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
