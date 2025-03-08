import React from "react";
import { LucideIcon } from "lucide-react";
import { Card, CardHeader, CardBody } from "@heroui/react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, color }) => {
  const Icon = icon;

  return (
    <Card className="shadow-sm border border-gray-100">
      <CardHeader className="flex justify-between items-center">
        <p className="text-sm text-gray-500">{title}</p>
        <div className={`p-2 rounded-full ${color}`}>
          <Icon size={20} className="text-white" />
        </div>
      </CardHeader>
      <CardBody>
        <h4 className="text-xl font-semibold">{value}</h4>
        {trend !== undefined && (
          <p className={`text-xs mt-1 ${trend > 0 ? "text-green-500" : "text-red-500"}`}>
            {trend > 0 ? `+${trend}%` : `${trend}%`} จากเดือนที่แล้ว
          </p>
        )}
      </CardBody>
    </Card>
  );
};

export default StatCard;
