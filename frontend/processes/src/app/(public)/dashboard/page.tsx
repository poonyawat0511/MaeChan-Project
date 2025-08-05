"use client";

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ArrowRight, ArrowLeft, RotateCcw } from "lucide-react";
import LoadingScreen from "@/components/loading/loading";
import CustomCard from "@/components/cards/CustomCard";
import { Button, Pagination } from "@heroui/react";
import PrVsPoComparisonChart from "./_components/cards/PrVsPoComparisonChart";
import PrVsPoByDepartmentChart from "./_components/cards/PrVsPoByDepartmentChart";
import YearFilter from "./_components/buttons/YearFilter";
import DepartmentFilter from "./_components/buttons/DepartmentFilter";
import ClearFilterButton from "./_components/buttons/ClearFilterButton";
import MonthFilter from "./_components/buttons/MonthFilter";
import PRSummaryCard from "./_components/cards/PrSummaryCard";
import POSummaryCard from "./_components/cards/PoSummaryCard";
import EfficiencySummaryCard from "./_components/cards/EfficiencySummaryCard";
import TotalBudgetCard from "./_components/cards/TotalBudgetCard";
import UsedBudgetCard from "./_components/cards/UsedBudgetCard";
import RemainBudgetCard from "./_components/cards/RemainBudgetCard";
import MonthlyPurchaseCard from "./_components/cards/MonthlyPurchaseCard";
import StockBudgetTable from "./_components/tables/StockBudgetTable";
import StockBudgetListTable from "./_components/tables/StockBudgetListTable";
import StockBudgetTypeTable from "./_components/tables/StockBudgetTypeTable";
import { motion, AnimatePresence } from "framer-motion";
import { getDashboardSummary } from "@/utils/services/getApi";
import { useDashboardPage } from "../../../hooks/useDashboard";
import { DashboardSummaryDTO } from "@/utils/types/dashboardSummaryDTO";
import { axiosInstance, yearApi } from "@/utils/api/api";

const colors = {
  chart: [
    "#3b82f6", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444",
    "#8b5cf6", "#ec4899", "#6366f1", "#a855f7", "#14b8a6"
  ],
};

const months = [
  { label: "มกราคม", value: "ม.ค." },
  { label: "กุมภาพันธ์", value: "ก.พ." },
  { label: "มีนาคม", value: "มี.ค." },
  { label: "เมษายน", value: "เม.ย." },
  { label: "พฤษภาคม", value: "พ.ค." },
  { label: "มิถุนายน", value: "มิ.ย." },
  { label: "กรกฎาคม", value: "ก.ค." },
  { label: "สิงหาคม", value: "ส.ค." },
  { label: "กันยายน", value: "ก.ย." },
  { label: "ตุลาคม", value: "ต.ค." },
  { label: "พฤศจิกายน", value: "พ.ย." },
  { label: "ธันวาคม", value: "ธ.ค." },
];

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(0);
  const [filterYear, setFilterYear] = useState<number>(new Date().getFullYear());
  const [filterMonth, setFilterMonth] = useState<string>(
    new Date().toLocaleString("th-TH", { month: "short" })
  );
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [summary, setSummary] = useState<DashboardSummaryDTO | null>(null);
  const [showBudgetList, setShowBudgetList] = useState(false);

  const {
    loading,
    departments,
    budgetType,
    budgetList,
    budgets,
    budgetPage,
    budgetListPage,
    budgetPageIndex,
    budgetListPageIndex,
    setBudgetPageIndex,
    setBudgetListPageIndex,
  } = useDashboardPage();

  useEffect(() => {
    getDashboardSummary(filterYear, filterMonth, selectedDepartments)
      .then(setSummary)
      .catch(console.error);
  }, [filterYear, filterMonth, selectedDepartments]);

  const clearDepartmentFilter = () => setSelectedDepartments([]);

  const [allYears, setAllYears] = useState<number[]>([]);

  useEffect(() => {
    axiosInstance.get<number[]>(yearApi)
      .then((res) => setAllYears(res.data))
      .catch(console.error);
  }, []);


  if (!summary || loading) return <LoadingScreen message="Loading dashboard..." />;

  const Page1 = () => (
    <div className="space-y-6 min-h-screen">
      <div className="flex flex-wrap gap-3">
        <YearFilter filterYear={filterYear} allYears={allYears} setFilterYear={setFilterYear} />
        <MonthFilter filterMonth={filterMonth} setFilterMonth={setFilterMonth} months={months} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <TotalBudgetCard value={summary.totalBudgetListValue} />
        <UsedBudgetCard value={summary.totalBudgetUsed} />
        <RemainBudgetCard value={summary.totalBudgetRemain} />
        <MonthlyPurchaseCard value={summary.monthlyPurchases} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CustomCard title="มูลค่าการจัดซื้อรายเดือน">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={summary.formattedInventoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={colors.chart[0]}
                  strokeWidth={2}
                  name="มูลค่า (บาท)"
                  dot={{ r: 0 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CustomCard>

        <CustomCard title="สัดส่วนประเภทสินค้าในคลัง">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={summary.formattedWarehouseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  dataKey="value"
                >
                  {summary.formattedWarehouseData.map(
                    (entry: { name: string; value: number }, index: number) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors.chart[index % colors.chart.length]}
                      />
                    )
                  )}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CustomCard>
      </div>

      <CustomCard title="ประเภทงบประมาณ">
        <StockBudgetTypeTable stockBudgetTypeList={budgetType} />
      </CustomCard>

      <CustomCard
        title={
          <div className="flex justify-between items-center w-full gap-5">
            <span className="font-semibold text-gray-800">
              {showBudgetList ? "รายการงบประมาณ" : "รายชื่องบประมาณ"}
            </span>
            <Button
              onPress={() => setShowBudgetList(prev => !prev)}
              className="flex items-center gap-2 text-sm px-3 py-1 border border-gray-300 rounded-md bg-white hover:bg-gray-100"
            >
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                <RotateCcw size={16} />
              </motion.div>
              {showBudgetList ? "แสดงตารางรวม" : "แสดงรายการย่อย"}
            </Button>
          </div>
        }
      >
        <div className="relative min-h-[50rem]">
          <AnimatePresence mode="wait">
            {showBudgetList ? (
              <motion.div
                key="list"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <StockBudgetListTable stockBudgetList={budgetList} />
                <div className="flex justify-center mt-4">
                  <Pagination
                    total={budgetListPage?.totalPages ?? 1}
                    page={budgetListPageIndex + 1}
                    onChange={(page) => {
                      if (page - 1 !== budgetListPageIndex) setBudgetListPageIndex(page - 1);
                    }}
                    showControls
                    color="secondary"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="table"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <StockBudgetTable stockBudget={budgets} />
                <div className="flex justify-center mt-4">
                  <Pagination
                    total={budgetPage?.totalPages ?? 1}
                    page={budgetPageIndex + 1}
                    onChange={(page) => {
                      if (page - 1 !== budgetPageIndex) setBudgetPageIndex(page - 1);
                    }}
                    showControls
                    color="secondary"
                  />
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CustomCard>
    </div>
  );

  const Page2 = () => (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <YearFilter filterYear={filterYear} allYears={allYears} setFilterYear={setFilterYear} />
        <DepartmentFilter
          selectedDepartments={selectedDepartments}
          setSelectedDepartments={setSelectedDepartments}
          stockDepartments={departments}
        />
        <ClearFilterButton onClear={clearDepartmentFilter} />
      </div>

      <PrVsPoComparisonChart prPoData={summary.prPoData} colors={colors.chart} />
      <PrVsPoByDepartmentChart
        data={[...summary.filteredDepartmentData]
          .sort((a, b) => b.po - a.po)
          .slice(0, 10)}
        colors={colors.chart}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PRSummaryCard
          total={summary.totalStockRequests}
          totalValue={summary.totalStockRequestValue}
          avgValue={summary.avgStockRequestValue}
          highestValue={summary.highestStockRequest}
        />
        <POSummaryCard
          total={summary.totalStockPo}
          totalValue={summary.totalStockPoValue}
          avgValue={summary.avgStockPoValue}
          highestValue={summary.highestStockPo}
        />
        <EfficiencySummaryCard
          poPrRatio={summary.poPrRatio}
          budgetSaved={summary.budgetSaved}
          avgProcessingTime={summary.avgProcessingTime}
          pendingPr={summary.pendingPr}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">ภาพรวมข้อมูล</h1>
          <div className="flex space-x-2">
            <Button onPress={() => setCurrentPage(0)} className={`px-4 py-2 rounded-md text-sm ${currentPage === 0 ? "bg-secondary-500 text-white" : "bg-white text-gray-600 border"}`}>
              ภาพรวม
            </Button>
            <Button onPress={() => setCurrentPage(1)} className={`px-4 py-2 rounded-md text-sm ${currentPage === 1 ? "bg-secondary-500 text-white" : "bg-white text-gray-600 border"}`}>
              เปรียบเทียบ PR/PO
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentPage * 100}%)` }}>
            <div className="min-w-full"><Page1 /></div>
            <div className="min-w-full"><Page2 /></div>
          </div>
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
            className={`p-2 rounded-full ${currentPage > 0 ? "text-secondary-600 hover:bg-secondary-50" : "text-gray-300"}`}
            disabled={currentPage === 0}
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={() => currentPage < 1 && setCurrentPage(currentPage + 1)}
            className={`p-2 rounded-full ${currentPage < 1 ? "text-secondary-600 hover:bg-secondary-50" : "text-gray-300"}`}
            disabled={currentPage === 1}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </main>
    </div>
  );
}
