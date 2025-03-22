"use client";
import React from "react";
import CustomCard from "@/components/cards/CustomCard";

interface Props {
    poPrRatio: number;
    budgetSaved: number;
    avgProcessingTime: number | string;
    pendingPr: number;
}

export default function EfficiencySummaryCard({
    poPrRatio,
    budgetSaved,
    avgProcessingTime,
    pendingPr,
}: Props) {
    return (
        <CustomCard title="ประสิทธิภาพการจัดซื้อ">
            <div className="space-y-3">
                <div className="flex justify-between">
                    <span className="text-gray-600">อัตราเฉลี่ย PO/PR:</span>
                    <span className="font-medium">{poPrRatio.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">ประหยัดงบประมาณ:</span>
                    <span className="font-medium text-green-600">
                        ฿ {budgetSaved.toLocaleString()}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">เวลาดำเนินการเฉลี่ย:</span>
                    <span className="font-medium">{avgProcessingTime} วัน</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">จำนวน PR ที่ไม่ได้ดำเนินการ:</span>
                    <span className="font-medium text-orange-600">
                        {pendingPr} รายการ
                    </span>
                </div>
            </div>
        </CustomCard>
    );
}
