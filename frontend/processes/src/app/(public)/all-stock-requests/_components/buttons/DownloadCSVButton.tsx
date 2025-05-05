"use client";
import { Button } from "@heroui/react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { StockRequest } from "@/utils/types/stock-request";
import { downloadCSV } from "@/utils/services/csv";

export default function DownloadCSVButton({ data }: { data: StockRequest[] }) {
  return (
    <Button
      color="secondary"
      startContent={<ArrowDownTrayIcon className="h-4 w-4" />}
      variant="flat"
      size="sm"
      className="bg-violet-50 hover:bg-violet-100 text-violet-700 transition-all whitespace-nowrap shadow-sm hover:shadow-md h-10 rounded-lg"
      onPress={() => downloadCSV(data)}
      isDisabled={data.length === 0}
      aria-label="ดาวน์โหลดข้อมูลเป็น CSV"
    >
      ดาวน์โหลด CSV
    </Button>
  );
}
