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
  Tooltip,
} from "@heroui/react";
import { ClockIcon, PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Times } from "@/utils/types/time";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="w-full sm:w-auto sm:min-w-[250px] lg:max-w-[280px] border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-full">
              <ClockIcon className="h-5 w-5 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-blue-800">เวลาที่แจ้งเตือน</h4>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="p-4">
          <p className="text-gray-700 mb-3 text-base">เพิ่มเวลาสำหรับตารางงานของคุณ:</p>
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="bordered"
                startContent={<ClockIcon className="h-5 w-5 text-blue-600" />}
                className="w-full justify-between text-base py-2 border-2 bg-gray-50 hover:bg-blue-50 transition-colors"
                size="md"
                aria-label="เลือกเวลาแจ้งเตือน"
              >
                {selectedTime}
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Time selection" 
              className="text-base"
              itemClasses={{
                base: "text-base py-2"
              }}
            >
              {times.length > 0 ? (
                times.map((time) => (
                  <DropdownItem 
                    key={time.id} 
                    onPress={() => onSelect(time.time)}
                    textValue={time.time}
                    className="data-[hover=true]:bg-blue-50"
                  >
                    <div className="flex justify-between items-center w-full gap-4">
                      <span className="text-base font-medium">{time.time}</span>
                      <Tooltip content="ลบเวลา" placement="right">
                        <Button 
                          size="sm" 
                          variant="light" 
                          color="danger" 
                          isIconOnly
                          onPress={() => onDelete(time.id)}
                          className="rounded-full hover:bg-red-100 transition-colors"
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </Button>
                      </Tooltip>
                    </div>
                  </DropdownItem>
                ))
              ) : (
                <DropdownItem key="no-times" isDisabled textValue="ยังไม่มีเวลาที่บันทึกไว้">
                  <span className="text-gray-500">ยังไม่มีเวลาที่บันทึกไว้</span>
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button 
              color="primary" 
              className="w-full mt-4 text-base font-medium bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md" 
              size="lg" 
              onPress={onCreate}
              startContent={<PlusCircleIcon className="h-5 w-5" />}
            >
              เพิ่มเวลาการแจ้งเตือน
            </Button>
          </motion.div>
        </CardBody>
      </Card>
    </motion.div>
  );
}
