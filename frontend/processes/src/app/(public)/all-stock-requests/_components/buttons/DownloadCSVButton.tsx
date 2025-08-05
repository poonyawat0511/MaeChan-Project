"use client";
import { Button } from "@heroui/react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { downloadCSV } from "@/utils/services/csv";
import { StockRequest } from "@/types/stock-request";

export default function DownloadCSVButton({ data }: { data: StockRequest[] }) {
  return (
    <Button
      color="secondary"
      startContent={<ArrowDownTrayIcon />}
      variant="flat"
      size="sm"
      className="bg-violet-50 hover:bg-violet-100 text-violet-700 transition-all whitespace-nowrap"
      onPress={() => downloadCSV(data)}
    >
      ดาวน์โหลด CSV
    </Button>
  );
}
