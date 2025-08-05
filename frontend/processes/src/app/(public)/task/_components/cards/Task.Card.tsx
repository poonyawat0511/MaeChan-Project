import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Chip,
} from "@heroui/react";
import { FolderMinusIcon } from "@heroicons/react/24/outline";
import { SpringRequest } from "@/types/spring-request";
import { Task } from "@/types/task";

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
  return (
    <div className="flex flex-col items-center gap-4">
      {tasks.map((task) => {
        const springRequest = springRequestMap[task.processInstanceId];
        const stockRequest = springRequest?.stockRequest;

        return (
          <div
            key={task.id}
            onClick={() => onTaskClick(task)}
            className="max-w-[360px] w-full cursor-pointer rounded-xl transition hover:shadow-xl"
          >
            <Card className="rounded-xl shadow-lg w-full">
              <CardHeader>
                <div className="flex flex-col gap-1">
                  <h2>
                    <Chip color="default" className="text-warning bg-orange-100">New</Chip>
                  </h2>
                  <h4 className="text-lg font-semibold text-default-800">
                    เลขที่ขอสั่งซื้อ : {stockRequest?.requestNo ?? "ไม่มีเลขคำขอ"}
                  </h4>
                </div>
              </CardHeader>

              <CardBody className="text-default-600">
                <p className="text-sm text-default-400">วันที่ขอ: {task.created}</p>
                <p className="text-sm text-default-400">
                  ราคาขอซื้อ: {stockRequest?.requestTotalPrice?.toLocaleString() ?? "—"} ฿
                </p>
              </CardBody>

              <CardFooter className="flex justify-end px-4 py-1">
                <Button
                  size="sm"
                  radius="md"
                  variant="light"
                  color="default"
                  onPress={() => onTaskClick(task)}
                  className="pointer-events-auto"
                >
                  <FolderMinusIcon className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
