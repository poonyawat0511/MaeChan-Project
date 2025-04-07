"use client";
import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import CustomCard from "@/components/cards/CustomCard";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

interface DepartmentData {
  department: string;
  pr: number;
  po: number;
  poPercent: number; // ✅ ต้องมีใน data
}


interface PrVsPoByDepartmentChartProps {
  data: DepartmentData[];
  colors: string[];
}

const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          padding: "10px",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        }}
      >
        <p style={{ fontWeight: 600 }}>{label}</p>
        <p>PR: {data.pr.toLocaleString()} บาท</p>
        <p>PO: {data.po.toLocaleString()} บาท</p>
        <p style={{ color: "#3b82f6", fontWeight: 500 }}>
          ใช้งบประมาณ: {data.poPercent}% ของงบรวม
        </p>
      </div>
    );
  }

  return null;
};


export default function PrVsPoByDepartmentChart({
  data,
  colors,
}: PrVsPoByDepartmentChartProps) {
  return (
    <CustomCard title="เปรียบเทียบมูลค่า PR และ PO ตามหน่วยงาน">
      <div className="h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis type="number" stroke="#64748b" />
            <YAxis
              dataKey="department"
              type="category"
              stroke="#64748b"
              width={120}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="pr" name="ใบขอซื้อ (PR)" fill={colors[5]} />
            <Bar dataKey="po" name="ใบสั่งซื้อ (PO)" fill={colors[6]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CustomCard>
  );
}
