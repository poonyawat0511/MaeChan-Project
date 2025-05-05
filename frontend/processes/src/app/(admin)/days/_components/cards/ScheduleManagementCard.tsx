"use client";
import { Button, Avatar, Card, CardBody } from "@heroui/react";
import { ArrowPathIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

interface Props {
  refreshing: boolean;
  onRefresh: () => void;
}

export default function ScheduleManagementCard({ refreshing, onRefresh }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card className="flex-1 overflow-hidden rounded-xl border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-500 opacity-90" />
        <div className="absolute inset-0 bg-[url('/assets/pattern-dot.svg')] opacity-10" />
        
        <CardBody className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-5 sm:p-6">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Avatar 
                icon={<CalendarDaysIcon className="h-6 w-6" />} 
                className="bg-white text-blue-700 shadow-lg border-4 border-white backdrop-blur-sm" 
                size="lg" 
                isBordered
              />
            </motion.div>
            <div>
              <h2 className="text-white font-bold m-0 text-xl sm:text-2xl tracking-wide drop-shadow-md">
                จัดการตารางเวลา
              </h2>
              <p className="text-blue-50 text-sm sm:text-base font-medium mt-1 opacity-90">
                กำหนดค่าและจัดการตารางงานรายสัปดาห์ของคุณ
              </p>
            </div>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              color="default"
              variant="solid"
              className="bg-white/90 text-blue-700 font-medium hover:bg-white shadow-md backdrop-blur-sm"
              startContent={
                refreshing ? null : <ArrowPathIcon className={`h-5 w-5 ${refreshing ? 'animate-spin' : ''}`} />
              }
              isLoading={refreshing}
              spinner={<ArrowPathIcon className="h-5 w-5 animate-spin" />}
              onPress={onRefresh}
              size="md"
            >
              <span className="text-base">รีเฟรชข้อมูล</span>
            </Button>
          </motion.div>
        </CardBody>
      </Card>
    </motion.div>
  );
}
