"use client";
import {
  usePagination,
  PaginationItemType,
} from "@heroui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";

interface Props {
  total: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  variant?: "compact" | "default";
}

export default function Pagination({
  total,
  currentPage,
  onPageChange,
  variant = "default",
}: Props) {
  const { range, onNext, onPrevious } = usePagination({
    total,
    initialPage: currentPage,
    onChange: onPageChange,
    showControls: true,
    siblings: 1,
    boundaries: 1,
  });

  return (
    <ul
      className={`flex items-center gap-1 ${
        variant === "compact" ? "mt-2 justify-center" : "mt-3 justify-center"
      }`}
    >
      {range.map((page, index) => {
        if (page === PaginationItemType.PREV) {
          return (
            <li key={`prev-${index}`}>
              <button
                onClick={onPrevious}
                className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full"
              >
                <ChevronLeftIcon className="w-3 h-3" />
              </button>
            </li>
          );
        }

        if (page === PaginationItemType.NEXT) {
          return (
            <li key={`next-${index}`}>
              <button
                onClick={onNext}
                className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full"
              >
                <ChevronRightIcon className="w-3 h-3" />
              </button>
            </li>
          );
        }

        if (page === PaginationItemType.DOTS) {
          return (
            <li
              key={`dots-${index}`}
              className="w-6 h-6 text-xs text-gray-500 flex items-center justify-center"
            >
              ...
            </li>
          );
        }

        return (
          <li key={`page-${page}`}>
            <button
              onClick={() => onPageChange(Number(page))}
              className={`w-6 h-6 flex items-center justify-center rounded-full text-xs ${
                currentPage === page
                  ? "bg-primary text-white font-bold"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {page}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
