"use client";
import { Button, Tooltip } from "@heroui/react";
import { ClockIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function HistoryButton() {
  return (
    <Link href="/history" passHref>
      <Button
        as="div"
        variant="flat"
        size="sm"
        className="rounded-full bg-white border border-gray-200 hover:bg-indigo-50 hover:border-indigo-200 text-gray-700 px-4 py-2 flex items-center gap-2 transition-all shadow-sm"
        startContent={<ClockIcon className="h-4 w-4 text-indigo-600" />}
      >
        <span className="font-medium">ประวัติงาน</span>
      </Button>
    </Link>
  );
}
