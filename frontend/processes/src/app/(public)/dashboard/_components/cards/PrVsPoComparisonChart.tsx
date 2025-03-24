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

interface PRPOData {
  month: string;
  pr: number;
  po: number;
}

interface PrVsPoComparisonChartProps {
  prPoData: PRPOData[];
  colors: string[];
}

export default function PrVsPoComparisonChart({
  prPoData,
  colors,
}: PrVsPoComparisonChartProps) {
  return (
    <CustomCard title="เปรียบเทียบมูลค่า PR และ PO รายเดือน">
      <div className="h-[550px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={prPoData} layout="vertical" barSize={40}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis type="number" stroke="#64748b" />
            <YAxis dataKey="month" type="category" stroke="#64748b" />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              }}
            />
            <Legend />
            <Bar
              dataKey="pr"
              name="ใบขอซื้อ (PR)"
              fill={colors[0]}
              barSize={40}
            />
            <Bar
              dataKey="po"
              name="ใบสั่งซื้อ (PO)"
              fill={colors[1]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CustomCard>
  );
}
