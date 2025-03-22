"use client";
import React from "react";
import CustomCard from "@/components/cards/CustomCard";

interface Props {
    total: number;
    totalValue: number;
    avgValue: number;
    highestValue: number;
}

export default function PRSummaryCard({
    total,
    totalValue,
    avgValue,
    highestValue,
}: Props) {
    return (
        <CustomCard title="สรุปข้อมูล PR ประจำปี">
            <div className="space-y-3">
                <div className="flex justify-between">
                    <span className="text-gray-600">จำนวน PR ทั้งหมด:</span>
                    <span className="font-medium">{total} รายการ</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">มูลค่า PR รวม:</span>
                    <span className="font-medium">฿ {totalValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">มูลค่า PR เฉลี่ยต่อเดือน:</span>
                    <span className="font-medium">฿ {avgValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">มูลค่า PR สูงสุด:</span>
                    <span className="font-medium">฿ {highestValue.toLocaleString()}</span>
                </div>
            </div>
        </CustomCard>
    );
}
