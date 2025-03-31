"use client";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Times } from "@/utils/types/time";

interface Props {
  times: Times[];
  selectedTime: string;
  onSelect: (time: string) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
}

export default function TimeSelectorCard({
  times,
  selectedTime,
  onSelect,
  onDelete,
  onCreate,
}: Props) {
  return (
    <Card className="w-full sm:w-auto sm:min-w-[220px] lg:max-w-[250px]">
      <CardHeader className="px-3 py-2">
        <h4 className="text-base font-semibold">เวลาที่แจ้งเตือน</h4>
      </CardHeader>
      <Divider />
      <CardBody className="p-3">
        <p className="text-gray-600 mb-2 text-xs sm:text-sm">เพิ่มเวลาสำหรับตารางงานของคุณ:</p>
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="bordered"
              startContent={<ClockIcon className="h-4 w-4" />}
              className="w-full justify-between text-xs sm:text-sm"
              size="sm"
            >
              {selectedTime}
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Time selection">
            {times.map((time) => (
              <DropdownItem key={time.id} onPress={() => onSelect(time.time)}>
                <div className="flex justify-between items-center w-full">
                  {time.time}
                  <Button size="sm" variant="light" color="danger" onPress={() => onDelete(time.id)}>
                    <XMarkIcon className="h-3 w-3" />
                  </Button>
                </div>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Button color="primary" className="w-full mt-3 text-xs sm:text-sm" size="sm" onPress={onCreate}>
          เพิ่มเวลาการแจ้งเตือน
        </Button>
      </CardBody>
    </Card>
  );
}
