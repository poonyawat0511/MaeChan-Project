import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Chip,
} from "@heroui/react";
import { Task } from "@/utils/types/task";
import FolderIcon from "../icons/folder.icon";

interface TaskCardProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export default function TaskCard({ tasks, onTaskClick }: TaskCardProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      {tasks.map((task) => (
        <Card
          key={task.id}
          className="max-w-[360px] w-full rounded-xl shadow-lg"
        >
          <CardHeader>
            <div className="flex flex-col gap-1">
              <h2>
                <Chip color="warning">New</Chip>
              </h2>
              <h4 className="text-lg font-semibold text-default-800">
                {task.name}
              </h4>
            </div>
          </CardHeader>
          <CardBody className="text-default-600">
            <p className="text-sm text-default-400">Create: {task.created}</p>
            <p className="text-xs text-default-400">
              ProcessInstanceId: {task.processInstanceId}
            </p>
          </CardBody>
          <CardFooter className="flex justify-end px-4 py-1">
            <Button
              size="sm"
              radius="md"
              variant="light"
              color="default"
              onPress={() => onTaskClick(task)}
            >
              <FolderIcon className="w-4 h-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
