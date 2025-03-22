"use client";
import React from "react";
import StatCard from "@/components/cards/StatCard";
import { TrendingUp } from "lucide-react";

interface Props {
  value: number;
}

export default function MonthlyPurchaseCard({ value }: Props) {
  return (
    <StatCard
      title="มูลค่าการซื้อเดือนนี้"
      value={`฿ ${value.toLocaleString()}`}
      icon={TrendingUp}
      trend={8.7}
      color="bg-purple-500"
    />
  );
}
