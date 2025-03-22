"use client";
import React, { useEffect, useState } from "react";
import { LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, } from "recharts";
import { ArrowRight, ArrowLeft, Box, ShoppingCart, TrendingUp, Layers, } from "lucide-react";
import { StockRequest } from "@/utils/types/stock-request";
import { StockPo } from "@/utils/types/stock-po";
import { getStockBugetList, getStockDepartments, getStockPo, getStockRequests, } from "@/utils/services/getApi";
import StockPoTable from "@/app/(public)/dashboard/_components/StockPOTable";
import LoadingScreen from "@/components/loading/loading";
import UnauthorizedCard from "@/components/cards/UnauthorizedCard";
import CustomCard from "@/components/cards/CustomCard";
import StatCard from "@/components/cards/StatCard";
import { Button, Pagination } from "@heroui/react";
import { StockDepartment } from "@/utils/types/stock-department";
import PrVsPoComparisonChart from "./_components/cards/PrVsPoComparisonChart";
import PrVsPoByDepartmentChart from "./_components/cards/PrVsPoByDepartmentChart";
import YearFilter from "./_components/buttons/YearFilter";
import DepartmentFilter from "./_components/buttons/DepartmentFilter";
import ClearFilterButton from "./_components/buttons/ClearFilterButton";
import MonthFilter from "./_components/buttons/MonthFilter";
import { StockBudgetList } from "@/utils/types/stock-buget-list";
import PRSummaryCard from "./_components/cards/PrSummaryCard";
import POSummaryCard from "./_components/cards/PoSummaryCard";
import EfficiencySummaryCard from "./_components/cards/EfficiencySummaryCard";

interface PRPOData {
  month: string;
  pr: number;
  po: number;
}

const colors = {
  primary: "#3b82f6",
  secondary: "#64748b",
  accent: "#0ea5e9",
  background: "#f8fafc",
  card: "#ffffff",
  border: "#e2e8f0",
  text: {
    primary: "#0f172a",
    secondary: "#64748b",
    light: "#94a3b8",
  },
  chart: [
    "#3b82f6",
    "#0ea5e9",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
    "#6366f1",
    "#a855f7",
    "#14b8a6",
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
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [StockRequest, setRequests] = useState<StockRequest[]>([]);
  const [stockDepartments, setStockDepartments] = useState<StockDepartment[]>([]);
  const [po, setPo] = useState<StockPo[]>([]);
  const [stockPoPage, setStockPoPage] = useState(1);
  const itemsPerPage = 5;
  const [filterYear, setFilterYear] = useState<number>(new Date().getFullYear());
  const [filterMonth, setFilterMonth] = useState<string>(new Date().toLocaleString("th-TH", { month: "short" }));
  const [stockBudgetList, setStockBudgetList] = useState<StockBudgetList[]>([])

  const fetchData = async () => {
    try {
      const data = await getStockRequests();
      const stockPo = await getStockPo();
      const stockDepartments = await getStockDepartments();
      const stockBudgetLists = await getStockBugetList();
      setRequests(data);
      setPo(stockPo);
      setStockDepartments(stockDepartments);
      setStockBudgetList(stockBudgetLists);
      setError(null);
    } catch {
      console.log("Session expired. Redirecting to sign-in...");
      setError("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const clearDepartmentFilter = () => {
    setSelectedDepartments([]);
  };

  // Step 1: เตรียมข้อมูลใหม่ (filtered + รวม PR/PO ตาม department)
  const filteredDepartmentData = (selectedDepartments.length > 0 ? selectedDepartments : stockDepartments.map((dept) => dept.departmentName)).map((deptName) => {
    const prTotal = StockRequest.filter((req) => req.departmentId?.departmentName === deptName && new Date(req.requestDate).getFullYear() === filterYear).reduce((sum, req) => sum + (req.requestTotalPrice || 0), 0);
    const poTotal = po.filter(
      (poItem) => poItem.refRequestId?.departmentId?.departmentName === deptName && new Date(poItem.stockPoDate).getFullYear() === filterYear).reduce((sum, poItem) => sum + (poItem.poDeliverAmount || 0), 0);
    return {
      department: deptName,
      pr: prTotal,
      po: poTotal,
    };
  })
    .sort((a, b) => b.pr + b.po - (a.pr + a.po))
    .slice(0, 8);

  const allYears = Array.from(
    new Set([
      ...po.map((poItem) => new Date(poItem.stockPoDate).getFullYear()),
      ...StockRequest.map((req) => new Date(req.requestDate).getFullYear()),
    ])
  ).sort((a, b) => b - a);

  useEffect(() => {
    if (!allYears.includes(filterYear) && allYears.length > 0) {
      setFilterYear(allYears[allYears.length - 1]);
    }
  }, [allYears, filterYear]);
  const monthlyPurchases = po
    .filter(
      (po) =>
        new Date(po.stockPoDate).getFullYear() === filterYear &&
        new Date(po.stockPoDate).toLocaleString("th-TH", { month: "short" }) ===
        filterMonth
    )
    .reduce((sum, po) => sum + (po.stockBudgetUse || 0), 0);

  const formattedInventoryData = po
    .filter((po) => new Date(po.stockPoDate).getFullYear() === filterYear)
    .reduce((acc, po) => {
      if (!po.stockPoDate || !po.poAmount) return acc;

      const month = new Date(po.stockPoDate).toLocaleString("th-TH", {
        month: "short",
      });

      const existingEntry = acc.find((entry) => entry.month === month);
      if (existingEntry) {
        existingEntry.value += po.poAmount;
      } else {
        acc.push({ month, value: po.poAmount });
      }

      return acc;
    }, [] as { month: string; value: number }[]);

  const formattedWarehouseData = po
    .filter(
      (po) =>
        new Date(po.stockPoDate).toLocaleString("th-TH", { month: "short" }) ===
        filterMonth
    )
    .reduce((acc, po) => {
      const warehouseName = po.warehouseId?.warehouseName || "Unknown";
      const existingWarehouse = acc.find((w) => w.name === warehouseName);

      if (existingWarehouse) {
        existingWarehouse.value += 1;
      } else {
        acc.push({ name: warehouseName, value: 1 });
      }

      return acc;
    }, [] as { name: string; value: number }[]);

  const budgetYearThai = (filterYear + 543).toString();

  const totalBudgetListValue = stockBudgetList
    .filter((b) => b.stockBudgetYear === budgetYearThai)
    .reduce((sum, b) => sum + (b.stockBudgetPrice || 0), 0);

  const totalBudgetUsed = stockBudgetList
    .filter((b) => b.stockBudgetYear === budgetYearThai)
    .reduce((sum, b) => sum + (b.stockBudgetUse || 0), 0);

  const totalBudgetRemain = stockBudgetList
    .filter((b) => b.stockBudgetYear === budgetYearThai)
    .reduce((sum, b) => sum + (b.stockBudgetRemain || 0), 0);

  const prPoData: PRPOData[] = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(2025, i).toLocaleString("th-TH", { month: "short" });

    const prTotal = StockRequest.filter(
      (req) =>
        new Date(req.requestDate).getMonth() === i &&
        new Date(req.requestDate).getFullYear() === filterYear
    ).reduce((sum, req) => sum + (req.requestTotalPrice || 0), 0);

    const poTotal = po
      .filter(
        (po) =>
          new Date(po.stockPoDate).getMonth() === i &&
          new Date(po.stockPoDate).getFullYear() === filterYear
      )
      .reduce((sum, po) => sum + (po.poDeliverAmount || 0), 0);

    return { month, pr: prTotal, po: poTotal };
  });

  const totalStockPo = po.length;

  const totalStockPoValue = po.reduce(
    (sum, poItem) => sum + (poItem.stockBudgetUse || 0),
    0
  );

  const avgStockPoValue = totalStockPoValue / 12;

  const highestStockPo = po.reduce(
    (max, poItem) =>
      poItem.stockBudgetUse && poItem.stockBudgetUse > max
        ? poItem.stockBudgetUse
        : max,
    0
  );

  const totalStockRequests = StockRequest.length;
  const totalStockRequestValue = StockRequest.reduce(
    (sum, req) => sum + (req.requestTotalPrice || 0),
    0
  );
  const avgStockRequestValue = totalStockRequestValue / 12;

  const highestStockRequest = StockRequest.reduce(
    (max, req) =>
      req.requestTotalPrice && req.requestTotalPrice > max
        ? req.requestTotalPrice
        : max,
    0
  );

  const poPrRatio =
    totalStockRequests > 0 ? (totalStockRequests / totalStockPo) * 100 : 0;

  const totalPrValue = StockRequest.reduce(
    (sum, req) => sum + (req.requestTotalPrice || 0),
    0
  );
  const totalPoValue = po.reduce(
    (sum, poItem) => sum + (poItem.poDeliverAmount || 0),
    0
  );
  const budgetSaved = totalPrValue - totalPoValue;

  const totalProcessingTime = po.reduce((sum, poItem) => {
    const request = StockRequest.find(
      (req) => req.requestId === poItem.refRequestId?.requestId
    );
    if (!request) return sum;
    const prDate = new Date(request.requestDate);
    const poDate = new Date(poItem.stockPoDate);
    return sum + (poDate.getTime() - prDate.getTime()) / (1000 * 60 * 60 * 24);
  }, 0);

  const avgProcessingTime =
    totalStockPo > 0 ? (totalProcessingTime / totalStockPo).toFixed(1) : 0;

  const pendingPr = StockRequest.filter(
    (req) =>
      !po.some((poItem) => poItem.refRequestId?.requestId === req?.requestId)
  ).length;

  const handleSignIn = () => {
    window.location.href = "/signin";
  };

  if (loading) {
    return <LoadingScreen message="Loading requests..." />;
  }

  if (error) {
    return (
      <UnauthorizedCard
        message="No users available"
        onSignin={() => {
          handleSignIn();
        }}
      />
    );
  }

  const paginatedStockPo = po.slice(
    (stockPoPage - 1) * itemsPerPage,
    stockPoPage * itemsPerPage
  );

  // Pages
  const Page1: React.FC = () => (
    <div className="space-y-6">
      {/* Filter Section */}
      <div className="flex flex-wrap gap-3">
        {/* Year Filter Dropdown */}
        <YearFilter
          filterYear={filterYear}
          allYears={allYears}
          setFilterYear={setFilterYear}
        />
        {/* Month Filter Dropdown */}
        <MonthFilter
          filterMonth={filterMonth}
          setFilterMonth={setFilterMonth}
          months={months}
        />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="งบประมาณรวมของปี"
          value={`฿ ${totalBudgetListValue.toLocaleString()}`}
          icon={Box}
          trend={5.2}
          color="bg-blue-500"
        />
        <StatCard
          title="งบที่ใช้"
          value={`฿ ${totalBudgetUsed.toLocaleString()}`}
          icon={Layers}
          trend={2.1}
          color="bg-green-500"
        />
        <StatCard
          title="งบที่คงเหลือ"
          value={`฿ ${totalBudgetRemain.toLocaleString()}`}
          icon={ShoppingCart}
          trend={-3.4}
          color="bg-orange-500"
        />
        <StatCard
          title="มูลค่าการซื้อเดือนนี้"
          value={`฿ ${monthlyPurchases.toLocaleString()}`}
          icon={TrendingUp}
          trend={8.7}
          color="bg-purple-500"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CustomCard title="มูลค่าการจัดซื้อรายเดือน">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={formattedInventoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                  }}
                />
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
                  data={formattedWarehouseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {formattedWarehouseData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors.chart[index % colors.chart.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CustomCard>
      </div>

      {/* Recent POs section */}
      <CustomCard title="ใบสั่งซื้อล่าสุด">
        <StockPoTable stockPo={paginatedStockPo} />

        <div className="flex justify-center mt-4">
          <Pagination
            total={Math.ceil(po.length / itemsPerPage)}
            page={stockPoPage}
            onChange={setStockPoPage}
            showControls
          />
        </div>
      </CustomCard>
    </div>
  );

  const Page2: React.FC = () => (
    <div className="space-y-6">
      {/* Filter Section */}
      <div className="flex flex-wrap gap-3">
        <YearFilter
          filterYear={filterYear}
          allYears={allYears}
          setFilterYear={setFilterYear}
        />
        <DepartmentFilter
          selectedDepartments={selectedDepartments}
          setSelectedDepartments={setSelectedDepartments}
          stockDepartments={stockDepartments}
        />
        <ClearFilterButton onClear={clearDepartmentFilter} />
      </div>

      {/* PR vs PO Comparison chart */}
      <PrVsPoComparisonChart prPoData={prPoData} colors={colors.chart} />

      {/* PR vs PO by Department chart */}
      <PrVsPoByDepartmentChart
        data={filteredDepartmentData}
        colors={colors.chart}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PRSummaryCard
          total={totalStockRequests}
          totalValue={totalStockRequestValue}
          avgValue={avgStockRequestValue}
          highestValue={highestStockRequest}
        />
        <POSummaryCard
          total={totalStockPo}
          totalValue={totalStockPoValue}
          avgValue={avgStockPoValue}
          highestValue={highestStockPo}
        />
        <EfficiencySummaryCard
          poPrRatio={poPrRatio}
          budgetSaved={budgetSaved}
          avgProcessingTime={avgProcessingTime}
          pendingPr={pendingPr}
        />
      </div>
    </div >
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main */}
      <main className="container mx-auto px-4 py-6">
        {/* Page navigation */}
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            แดชบอร์ดสินค้าคงคลัง
          </h1>
          <div className="flex space-x-2">
            <Button
              onPress={() => setCurrentPage(0)}
              className={`px-4 py-2 rounded-md text-sm flex items-center gap-2 transition-colors ${currentPage === 0
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-600 border border-gray-200"
                }`}
            >
              ภาพรวม
            </Button>
            <Button
              onPress={() => setCurrentPage(1)}
              className={`px-4 py-2 rounded-md text-sm flex items-center gap-2 transition-colors ${currentPage === 1
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-600 border border-gray-200"
                }`}
            >
              เปรียบเทียบ PR/PO
            </Button>
          </div>
        </div>

        {/* Page content */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            <div className="min-w-full">
              <Page1 />
            </div>
            <div className="min-w-full">
              <Page2 />
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
            className={`p-2 rounded-full ${currentPage > 0
              ? "text-blue-600 hover:bg-blue-50"
              : "text-gray-300"
              }`}
            disabled={currentPage === 0}
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={() => currentPage < 1 && setCurrentPage(currentPage + 1)}
            className={`p-2 rounded-full ${currentPage < 1
              ? "text-blue-600 hover:bg-blue-50"
              : "text-gray-300"
              }`}
            disabled={currentPage === 1}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </main>
    </div>
  );
}
