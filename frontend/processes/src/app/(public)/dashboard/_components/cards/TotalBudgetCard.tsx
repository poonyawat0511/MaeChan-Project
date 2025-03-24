"use client";
import React from "react";
import StatCard from "@/components/cards/StatCard";
import { Box } from "lucide-react";

interface Props {
  value: number;
}

export default function TotalBudgetCard({ value }: Props) {
  return (
    <StatCard
      title="งบประมาณรวมของปี"
      value={`฿ ${value.toLocaleString()}`}
      icon={Box}
      trend={5.2}
      color="bg-blue-500"
    />
  );
}
