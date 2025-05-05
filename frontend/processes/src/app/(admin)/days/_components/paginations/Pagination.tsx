"use client";
import {
  usePagination,
  PaginationItemType,
} from "@heroui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { clsx } from "clsx";
import { motion } from "framer-motion";

interface Props {
  total: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  variant?: "compact" | "default";
  size?: "md" | "lg";
  className?: string;
}

export default function Pagination({
  total,
  currentPage,
  onPageChange,
  variant = "default",
  size = "md",
  className = "",
}: Props) {
  const { range, onNext, onPrevious } = usePagination({
    total,
    initialPage: currentPage,
    onChange: onPageChange,
    showControls: true,
    siblings: 1,
    boundaries: 1,
  });

  // Size classes
  const btnSizeClasses = size === "lg" 
    ? "w-10 h-10 text-base" 
    : "w-8 h-8 text-sm";
  
  const iconSizeClasses = size === "lg"
    ? "w-5 h-5"
    : "w-4 h-4";

  return (
    <motion.ul
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={clsx(
        "flex items-center",
        size === "lg" ? "gap-2" : "gap-1",
        variant === "compact" ? "mt-2 justify-center" : "mt-3 justify-center",
        className
      )}
    >
      {range.map((page, index) => {
        if (page === PaginationItemType.PREV) {
          return (
            <motion.li 
              key={`prev-${index}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <button
                onClick={onPrevious}
                className={clsx(
                  btnSizeClasses,
                  "flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 border border-gray-300 shadow-sm transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-blue-400"
                )}
                aria-label="Previous page"
              >
                <ChevronLeftIcon className={iconSizeClasses} />
              </button>
            </motion.li>
          );
        }

        if (page === PaginationItemType.NEXT) {
          return (
            <motion.li 
              key={`next-${index}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <button
                onClick={onNext}
                className={clsx(
                  btnSizeClasses,
                  "flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 border border-gray-300 shadow-sm transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-blue-400"
                )}
                aria-label="Next page"
              >
                <ChevronRightIcon className={iconSizeClasses} />
              </button>
            </motion.li>
          );
        }

        if (page === PaginationItemType.DOTS) {
          return (
            <li
              key={`dots-${index}`}
              className={clsx(
                btnSizeClasses,
                "text-gray-600 flex items-center justify-center font-bold"
              )}
              aria-hidden="true"
            >
              ...
            </li>
          );
        }

        return (
          <motion.li 
            key={`page-${page}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <button
              onClick={() => onPageChange(Number(page))}
              className={clsx(
                btnSizeClasses,
                "flex items-center justify-center rounded-full border transition-colors shadow-sm",
                "focus:outline-none focus:ring-2 focus:ring-blue-400",
                currentPage === page
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium border-blue-700"
                  : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
              )}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
