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
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

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
    <Card className="rounded-xl bg-white shadow-xl w-full max-w-full mx-auto flex flex-col h-[calc(100vh-40px)] border border-gray-100 overflow-hidden">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between px-4 sm:px-6 py-5 bg-white border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-violet-100 text-violet-600">
            <ClipboardDocumentListIcon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              ใบขอซื้อสินค้า
            </h1>
            <div className="flex items-center mt-1.5">
              <p className="text-gray-500 text-sm font-medium">จำนวนใบทั้งสิ้น: <span className="text-violet-700">{total}</span></p>
              <Divider orientation="vertical" className="h-4 mx-2" />
              <Chip size="sm" color="secondary" variant="flat" className="font-medium text-xs">
                {filtered} รายการที่แสดงอยู่
              </Chip>
            </div>
          </div>
        </div>
        {headerRight}
      </CardHeader>

      <CardBody className="p-0 overflow-hidden flex-grow relative">
        <div className="h-full overflow-auto">
          {table}
        </div>
      </CardBody>

      <CardFooter className="flex flex-col sm:flex-row sm:justify-between py-3 px-4 sm:px-6 border-t border-gray-100 bg-gray-50/50 gap-3 flex-shrink-0">
        {pagination}
      </CardFooter>
    </Card>
  );
}
