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
} from "recharts";
import CustomCard from "@/components/cards/CustomCard";

interface DepartmentData {
  department: string;
  pr: number;
  po: number;
}

interface PrVsPoByDepartmentChartProps {
  data: DepartmentData[];
  colors: string[];
}

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
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              }}
            />
            <Legend />
            <Bar dataKey="pr" name="ใบขอซื้อ (PR)" fill={colors[0]} />
            <Bar dataKey="po" name="ใบสั่งซื้อ (PO)" fill={colors[1]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CustomCard>
  );
}
