"use client";
import { Button, Avatar, Card, CardBody } from "@heroui/react";
import { ArrowPathIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

interface Props {
  refreshing: boolean;
  onRefresh: () => void;
}

export default function ScheduleManagementCard({ refreshing, onRefresh }: Props) {
  return (
    <Card className="flex-1 bg-gradient-to-r from-purple-500 to-blue-200">
      <CardBody className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 sm:p-4">
        <div className="flex items-center gap-3">
          <Avatar icon={<CalendarDaysIcon />} className="bg-white text-secondary" size="md" />
          <div>
            <h2 className="text-white font-bold m-0 text-lg sm:text-xl">จัดการตารางเวลา</h2>
            <p className="text-primary-100 text-xs sm:text-sm">กำหนดค่าและจัดการตารางงานรายสัปดาห์ของคุณ</p>
          </div>
        </div>
        <div className="flex gap-1 mt-2 sm:mt-0">
          <Button
            color="default"
            variant="flat"
            startContent={<ArrowPathIcon />}
            isLoading={refreshing}
            onPress={onRefresh}
            size="sm"
          >
            รีเฟรชข้อมูล
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
