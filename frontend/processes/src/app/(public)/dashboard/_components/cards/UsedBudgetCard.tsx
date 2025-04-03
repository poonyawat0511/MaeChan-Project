"use client";
import React from "react";
import StatCard from "@/components/cards/StatCard";
import { Layers } from "lucide-react";

interface Props {
  value: number;
}

export default function UsedBudgetCard({ value }: Props) {
  return (
    <StatCard
      title="งบที่ใช้"
      value={`฿ ${value.toLocaleString()}`}
      icon={Layers}
      color="bg-green-500"
    />
  );
}
