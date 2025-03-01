import { Days } from "@/utils/types/day";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Chip,
  CardBody,
  CardFooter,
  Button,
} from "@heroui/react";

interface DayCardProps {
  days: Days[];
  onEdit: (day: Days) => void;
  onDelete: (id: string) => void;
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

export default function DayCard({ days, onEdit, onDelete }: DayCardProps) {
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
                    dayColorMap[day.name.toLowerCase()] ||
                    "bg-gray-100 text-gray-700"
                  }`}
                >
                  {day.name}
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
              <span className={day.active ? "text-green-600 gap-5" : "text-red-600 gap-5"}>
                {day.active ? "Active" : "Inactive"}
              </span>
            </p>
          </CardBody>

          <CardFooter className="flex justify-between px-4 py-1">
            <Button
              size="sm"
              radius="md"
              variant="light"
              color="danger"
              onPress={() => onDelete(day.id)}
            >
              <TrashIcon className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              radius="md"
              variant="light"
              color="default"
              onPress={() => onEdit(day)}
            >
              <PencilSquareIcon className="w-4 h-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
