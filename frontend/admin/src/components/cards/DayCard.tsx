import { Days } from "@/utils/types/day";
import {
  Card,
  CardHeader,
  Chip,
  CardBody,
  CardFooter,
  Switch,
} from "@heroui/react";

interface DayCardProps {
  days: Days[];
  onActive: (day: Days) => void;
}

const dayColorMap: Record<string, string> = {
  monday: "bg-yellow-100 text-yellow-700",
  tuesday: "bg-pink-100 text-pink-700",
  wednesday: "bg-green-100 text-green-700",
  thursday: "bg-orange-100 text-orange-700",
  friday: "bg-blue-100 text-blue-700",
  saturday: "bg-purple-100 text-purple-700",
  sunday: "bg-red-100 text-red-700",
};

export default function DayCard({ days, onActive }: DayCardProps) {
  const handleToggle = (day: Days) => {
    onActive({ ...day, active: !day.active });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {days.map((day) => (
        <Card
          key={day.id}
          className="max-w-[360px] w-full rounded-xl shadow-lg"
        >
          <CardHeader>
            <div className="flex flex-col gap-1">
              <h2>
                <Chip
                  className={`${
                    dayColorMap[day.name?.toLowerCase() ?? "unknown"] ||
                    "bg-gray-100 text-gray-700"
                  }`}
                >
                  {day.name ?? "Unknown"}
                </Chip>
              </h2>
              <h4 className="text-lg font-semibold text-default-800">
                {day.name}
              </h4>
            </div>
          </CardHeader>
          <CardBody className="text-default-600">
            <p className="text-sm text-default-400">
              Status:{" "}
              <span
                className={
                  day.active ? "text-green-600 gap-5" : "text-red-600 gap-5"
                }
              >
                {day.active ? "Active" : "Inactive"}
              </span>
            </p>
          </CardBody>

          <CardFooter className="flex justify-between px-4 py-1">
            <Switch checked={day.active} onChange={() => handleToggle(day)} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
