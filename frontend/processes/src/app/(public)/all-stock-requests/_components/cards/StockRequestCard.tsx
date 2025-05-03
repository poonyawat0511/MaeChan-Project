"use client";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Chip,
  Divider,
} from "@heroui/react";
import React from "react";
import { DocumentChartBarIcon } from "@heroicons/react/24/outline";

interface StockRequestCardProps {
  total: number;
  filtered: number;
  headerRight: React.ReactNode;
  table: React.ReactNode;
  pagination: React.ReactNode;
}

export default function StockRequestCard({
  total,
  filtered,
  headerRight,
  table,
  pagination,
}: StockRequestCardProps) {
  return (
    <Card className="rounded-xl bg-white shadow-md w-full max-w-full mx-auto flex flex-col h-[calc(100vh-32px)] border border-gray-100">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between px-4 sm:px-6 py-4 bg-white border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-3">
          <DocumentChartBarIcon className="h-8 w-8 text-violet-500" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              ใบขอซื้อสินค้า
            </h1>
            <div className="flex items-center mt-1">
              <p className="text-gray-500 text-sm">จำนวนใบทั้งสิ้น: {total}</p>
              <Divider orientation="vertical" className="h-4 mx-2" />
              <Chip size="sm" color="secondary" variant="flat">
                {filtered} รายการที่แสงบนตาราง
              </Chip>
            </div>
          </div>
        </div>
        {headerRight}
      </CardHeader>

      <CardBody className="p-0 overflow-hidden flex-grow relative">
        {table}
      </CardBody>

      <CardFooter className="flex flex-col sm:flex-row sm:justify-between py-3 px-4 sm:px-6 border-t border-gray-100 bg-gray-50/50 gap-3 flex-shrink-0">
        {pagination}
      </CardFooter>
    </Card>
  );
}
