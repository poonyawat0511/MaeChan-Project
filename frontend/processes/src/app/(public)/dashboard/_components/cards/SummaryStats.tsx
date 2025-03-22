"use client";
import React from "react";
import CustomCard from "@/components/cards/CustomCard";

interface SummaryStatsProps {
  totalStockRequests: number;
  totalStockRequestValue: number;
  avgStockRequestValue: number;
  highestStockRequest: number;
  totalStockPo: number;
  totalStockPoValue: number;
  avgStockPoValue: number;
  highestStockPo: number;
  poPrRatio: number;
  budgetSaved: number;
  avgProcessingTime: number | string;
  pendingPr: number;
}

export default function SummaryStats({
  totalStockRequests,
  totalStockRequestValue,
  avgStockRequestValue,
  highestStockRequest,
  totalStockPo,
  totalStockPoValue,
  avgStockPoValue,
  highestStockPo,
  poPrRatio,
  budgetSaved,
  avgProcessingTime,
  pendingPr,
}: SummaryStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <CustomCard title="สรุปข้อมูล PR ประจำปี">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">จำนวน PR ทั้งหมด:</span>
            <span className="font-medium">{totalStockRequests} รายการ</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">มูลค่า PR รวม:</span>
            <span className="font-medium">
              ฿ {totalStockRequestValue.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">มูลค่า PR เฉลี่ยต่อเดือน:</span>
            <span className="font-medium">
              ฿ {avgStockRequestValue.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">มูลค่า PR สูงสุด:</span>
            <span className="font-medium">
              ฿ {highestStockRequest.toLocaleString()}
            </span>
          </div>
        </div>
      </CustomCard>

      <CustomCard title="สรุปข้อมูล PO ประจำปี">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">จำนวน PO ทั้งหมด:</span>
            <span className="font-medium">{totalStockPo} รายการ</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">มูลค่า PO รวม:</span>
            <span className="font-medium">
              ฿ {totalStockPoValue.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">มูลค่า PO เฉลี่ยต่อเดือน:</span>
            <span className="font-medium">
              ฿ {avgStockPoValue.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">มูลค่า PO สูงสุด:</span>
            <span className="font-medium">
              ฿ {highestStockPo.toLocaleString()}
            </span>
          </div>
        </div>
      </CustomCard>

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
    </div>
  );
}
