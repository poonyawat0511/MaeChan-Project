import { Days } from "@/utils/types/day";
import {
  Card,
  CardHeader,
  Chip,
  CardBody,
  CardFooter,
  Switch,
} from "@heroui/react";
import { motion } from "framer-motion";
import { CalendarIcon } from "@heroicons/react/24/outline";

interface DayCardProps {
  days: Days[];
  onActive: (day: Days) => void;
}

const dayColorMap: Record<string, { bg: string, text: string, border: string, gradient: string, icon: string }> = {
  monday: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    border: "border-yellow-300",
    gradient: "from-yellow-300 to-yellow-200", 
    icon: "text-yellow-600"
  },
  tuesday: {
    bg: "bg-pink-100",
    text: "text-pink-800",
    border: "border-pink-300",
    gradient: "from-pink-300 to-pink-200",
    icon: "text-pink-600"
  },
  wednesday: {
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-300",
    gradient: "from-green-300 to-green-200",
    icon: "text-green-600"
  },
  thursday: {
    bg: "bg-orange-100",
    text: "text-orange-800",
    border: "border-orange-300",
    gradient: "from-orange-300 to-orange-200",
    icon: "text-orange-600"
  },
  friday: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    border: "border-blue-300",
    gradient: "from-blue-300 to-blue-200",
    icon: "text-blue-600"
  },
  saturday: {
    bg: "bg-purple-100",
    text: "text-purple-800",
    border: "border-purple-300",
    gradient: "from-purple-300 to-purple-200",
    icon: "text-purple-600"
  },
  sunday: {
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-red-300",
    gradient: "from-red-300 to-red-200",
    icon: "text-red-600"
  },
};

export default function DayCard({ days, onActive }: DayCardProps) {
  const handleToggle = (day: Days) => {
    onActive({ ...day, active: !day.active });
  };

  const translateDayToThai = (dayName: string): string => {
    const map: Record<string, string> = {
      monday: "จันทร์",
      tuesday: "อังคาร",
      wednesday: "พุธ",
      thursday: "พฤหัสบดี",
      friday: "ศุกร์",
      saturday: "เสาร์",
      sunday: "อาทิตย์",
    };
    return map[dayName.toLowerCase()] || dayName;
  };

  const translateStatusToThai = (active: boolean): string =>
    active ? "เปิดใช้งาน" : "ปิดใช้งาน";

  return (
    <div className="flex flex-col items-center gap-6">
      {days.map((day) => {
        const dayKey = day.name?.toLowerCase() ?? "unknown";
        const colorSet = dayColorMap[dayKey] || {
          bg: "bg-gray-100",
          text: "text-gray-800",
          border: "border-gray-300",
          gradient: "from-gray-300 to-gray-200",
          icon: "text-gray-600"
        };
        
        return (
          <motion.div 
            key={day.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: days.findIndex(d => d.id === day.id) * 0.1 
            }}
            whileHover={{ y: -5 }}
            className="w-full"
          >
            <Card
              className={`max-w-[380px] w-full rounded-xl overflow-hidden 
                      ${day.active 
                        ? "shadow-lg border-l-4 border-l-green-500" 
                        : "shadow-md border-l-4 border-l-gray-300"
                      }
                      hover:shadow-xl transition-all duration-300`}
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${colorSet.gradient}`} />
              
              <CardHeader className="pb-3 pt-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${colorSet.bg} ${colorSet.border} border flex-shrink-0`}>
                    <CalendarIcon className={`h-5 w-5 ${colorSet.icon}`} />
                  </div>
                  
                  <div className="flex flex-col">
                    <Chip
                      size="lg"
                      className={`text-base font-medium ${colorSet.bg} ${colorSet.text} ${colorSet.border} border-2`}
                    >
                      {translateDayToThai(day.name ?? "Unknown")}
                    </Chip>
                    <h4 className="text-xl font-semibold text-default-800 mt-1">
                      วัน{translateDayToThai(day.name)}
                    </h4>
                  </div>
                </div>
              </CardHeader>
              
              <CardBody className="text-default-700 py-3 border-t border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <p className="text-base">สถานะ:</p>
                  <motion.span
                    animate={{ 
                      backgroundColor: day.active ? "rgba(220, 252, 231, 1)" : "rgba(254, 226, 226, 1)",
                      color: day.active ? "rgba(21, 128, 61, 1)" : "rgba(185, 28, 28, 1)",
                      borderColor: day.active ? "rgba(134, 239, 172, 1)" : "rgba(254, 202, 202, 1)"
                    }}
                    transition={{ duration: 0.3 }}
                    className={`px-3 py-1 rounded-full text-base font-medium border`}
                  >
                    {translateStatusToThai(day.active)}
                  </motion.span>
                </div>
              </CardBody>

              <CardFooter className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-gray-50 to-white rounded-b-xl">
                <span className="text-base text-gray-700 font-medium">
                  {day.active ? "เปิดการแจ้งเตือน" : "ปิดการแจ้งเตือน"}
                </span>
                <div className="relative">
                  {day.active && (
                    <motion.div 
                      className="absolute inset-0 bg-green-400 rounded-full opacity-20" 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2,
                        repeatType: "loop"
                      }}
                    />
                  )}
                  <Switch
                    size="lg"
                    color="success"
                    isSelected={day.active}
                    onChange={() => handleToggle(day)}
                    aria-label={`Toggle ${day.name} active status`}
                    className="scale-110 z-10"
                  />
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
