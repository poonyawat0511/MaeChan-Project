"use client";
import React from "react";
import StatCard from "@/components/cards/StatCard";
import { ShoppingCart } from "lucide-react";

interface Props {
  value: number;
}

export default function RemainBudgetCard({ value }: Props) {
  return (
    <StatCard
      title="งบที่คงเหลือ"
      value={`฿ ${value.toLocaleString()}`}
      icon={ShoppingCart}
      color="bg-orange-500"
    />
  );
}
