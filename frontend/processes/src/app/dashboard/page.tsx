"use client";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
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
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  Building,
  Box,
  ShoppingCart,
  TrendingUp,
  Layers,
  Search,
  LucideIcon,
} from "lucide-react";

// Define types
interface InventoryData {
  month: string;
  quantity: number;
  value: number;
}

interface CategoryData {
  name: string;
  value: number;
}

interface PurchaseOrder {
  id: string;
  date: string;
  department: string;
  items: number;
  total: number;
  status: string;
}

interface PRPOData {
  month: string;
  pr: number;
  po: number;
}

interface DepartmentData {
  department: string;
  pr: number;
  po: number;
}

interface FilterButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  isActive: boolean;
}

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: number;
  color: string;
}

// สีที่ใช้ในระบบ - โทนสีสะอาดและเรียบง่าย
const colors = {
  primary: "#3b82f6", // สีหลัก
  secondary: "#64748b", // สีรอง
  accent: "#0ea5e9", // สีเน้น
  background: "#f8fafc", // สีพื้นหลัง
  card: "#ffffff", // สีการ์ด
  border: "#e2e8f0", // สีขอบ
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

// Mock data - ในการใช้งานจริงควรดึงจาก API
const mockInventoryData: InventoryData[] = [
  { month: "Jan", quantity: 120, value: 75000 },
  { month: "Feb", quantity: 150, value: 92000 },
  { month: "Mar", quantity: 90, value: 54000 },
  { month: "Apr", quantity: 110, value: 68000 },
  { month: "May", quantity: 130, value: 82000 },
  { month: "Jun", quantity: 170, value: 105000 },
  { month: "Jul", quantity: 160, value: 98000 },
  { month: "Aug", quantity: 190, value: 125000 },
  { month: "Sep", quantity: 210, value: 145000 },
  { month: "Oct", quantity: 185, value: 120000 },
  { month: "Nov", quantity: 195, value: 130000 },
  { month: "Dec", quantity: 220, value: 150000 },
];

const mockCategoryData: CategoryData[] = [
  { name: "เวชภัณฑ์", value: 35 },
  { name: "ยา", value: 25 },
  { name: "เครื่องมือแพทย์", value: 20 },
  { name: "อุปกรณ์สำนักงาน", value: 10 },
  { name: "อื่นๆ", value: 10 },
];

const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: "PO-2025-001",
    date: "28/02/2025",
    department: "แผนกยา",
    items: 12,
    total: 45000,
    status: "เสร็จสิ้น",
  },
  {
    id: "PO-2025-002",
    date: "27/02/2025",
    department: "แผนกเวชภัณฑ์",
    items: 8,
    total: 32000,
    status: "รออนุมัติ",
  },
  {
    id: "PO-2025-003",
    date: "26/02/2025",
    department: "แผนกเครื่องมือแพทย์",
    items: 3,
    total: 120000,
    status: "กำลังดำเนินการ",
  },
  {
    id: "PO-2025-004",
    date: "24/02/2025",
    department: "แผนกสำนักงาน",
    items: 15,
    total: 18000,
    status: "เสร็จสิ้น",
  },
  {
    id: "PO-2025-005",
    date: "20/02/2025",
    department: "แผนกยา",
    items: 7,
    total: 28000,
    status: "เสร็จสิ้น",
  },
];

const mockPRPOData: PRPOData[] = [
  { month: "Jan", pr: 85000, po: 75000 },
  { month: "Feb", pr: 100000, po: 92000 },
  { month: "Mar", pr: 60000, po: 54000 },
  { month: "Apr", pr: 75000, po: 68000 },
  { month: "May", pr: 90000, po: 82000 },
  { month: "Jun", pr: 115000, po: 105000 },
  { month: "Jul", pr: 110000, po: 98000 },
  { month: "Aug", pr: 140000, po: 125000 },
  { month: "Sep", pr: 160000, po: 145000 },
  { month: "Oct", pr: 135000, po: 120000 },
  { month: "Nov", pr: 145000, po: 130000 },
  { month: "Dec", pr: 165000, po: 150000 },
];

const mockDepartmentData: DepartmentData[] = [
  { department: "แผนกยา", pr: 420000, po: 380000 },
  { department: "แผนกเวชภัณฑ์", pr: 380000, po: 350000 },
  { department: "แผนกเครื่องมือแพทย์", pr: 550000, po: 520000 },
  { department: "แผนกสำนักงาน", pr: 180000, po: 170000 },
  { department: "แผนกอื่นๆ", pr: 150000, po: 130000 },
];

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [filterYear, setFilterYear] = useState<number>(2025);
  const [filterDepartment] = useState<string>("ทั้งหมด");
  const [filterMonth] = useState<string>("ทั้งหมด");

  // Component สำหรับ Card ที่มีส่วนหัวและเนื้อหา
  const Card: React.FC<CardProps> = ({ title, children, className = "" }) => (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden ${className}`}
    >
      <div className="border-b border-gray-100 px-4 py-3 flex justify-between items-center">
        <h3 className="font-medium text-gray-700">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );

  // Component สำหรับปุ่มกรอง
  const FilterButton: React.FC<FilterButtonProps> = ({
    icon,
    label,
    onClick,
    isActive,
  }) => {
    const Icon = icon;
    return (
      <button
        onClick={onClick}
        className={`px-3 py-2 rounded-md text-sm flex items-center gap-2 transition-colors
                   ${
                     isActive
                       ? "bg-blue-50 text-blue-600 border border-blue-200"
                       : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                   }`}
      >
        <Icon size={16} />
        <span>{label}</span>
      </button>
    );
  };

  // Component สำหรับสรุปข้อมูล
  const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    icon,
    trend,
    color,
  }) => {
    const Icon = icon;
    return (
      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <h4 className="text-xl font-semibold mt-1">{value}</h4>
            {trend !== undefined && (
              <p
                className={`text-xs mt-1 ${
                  trend > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {trend > 0 ? `+${trend}%` : `${trend}%`} จากเดือนที่แล้ว
              </p>
            )}
          </div>
          <div className={`p-2 rounded-full ${color}`}>
            <Icon size={20} className="text-white" />
          </div>
        </div>
      </div>
    );
  };

  // Pages
  const Page1: React.FC = () => (
    <div className="space-y-6">
      {/* Filter Section */}
      <div className="flex flex-wrap gap-3">
        <FilterButton
          icon={Calendar}
          label={`ปี: ${filterYear}`}
          onClick={() => setFilterYear(filterYear === 2025 ? 2024 : 2025)}
          isActive={true}
        />
        <FilterButton
          icon={Building}
          label={`หน่วยงาน: ${filterDepartment}`}
          onClick={() => {}}
          isActive={false}
        />
        <FilterButton
          icon={Calendar}
          label={`เดือน: ${filterMonth}`}
          onClick={() => {}}
          isActive={false}
        />
        <div className="ml-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="ค้นหา..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <Search
              size={16}
              className="absolute left-3 top-2.5 text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="มูลค่าคงคลังรวม"
          value="฿ 4,350,000"
          icon={Box}
          trend={5.2}
          color="bg-blue-500"
        />
        <StatCard
          title="รายการสินค้าทั้งหมด"
          value="1,245 รายการ"
          icon={Layers}
          trend={2.1}
          color="bg-green-500"
        />
        <StatCard
          title="ใบสั่งซื้อรอดำเนินการ"
          value="28 รายการ"
          icon={ShoppingCart}
          trend={-3.4}
          color="bg-orange-500"
        />
        <StatCard
          title="มูลค่าการซื้อเดือนนี้"
          value="฿ 352,000"
          icon={TrendingUp}
          trend={8.7}
          color="bg-purple-500"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="มูลค่าการจัดซื้อรายเดือน">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockInventoryData}>
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
        </Card>

        <Card title="สัดส่วนประเภทสินค้าในคลัง">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockCategoryData}
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
                  {mockCategoryData.map((entry, index) => (
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
        </Card>
      </div>

      {/* Recent POs section */}
      <Card title="ใบสั่งซื้อล่าสุด">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  รหัส
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  วันที่
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  หน่วยงาน
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  จำนวนรายการ
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  มูลค่ารวม
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  สถานะ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockPurchaseOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600">
                    {order.id}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {order.department}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {order.items}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    ฿ {order.total.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        order.status === "เสร็จสิ้น"
                          ? "bg-green-100 text-green-800"
                          : order.status === "รออนุมัติ"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const Page2: React.FC = () => (
    <div className="space-y-6">
      {/* Filter Section */}
      <div className="flex flex-wrap gap-3">
        <FilterButton
          icon={Calendar}
          label={`ปี: ${filterYear}`}
          onClick={() => setFilterYear(filterYear === 2025 ? 2024 : 2025)}
          isActive={true}
        />
        <FilterButton
          icon={Building}
          label={`หน่วยงาน: ${filterDepartment}`}
          onClick={() => {}}
          isActive={false}
        />
        <div className="ml-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="ค้นหา..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <Search
              size={16}
              className="absolute left-3 top-2.5 text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* PR vs PO Comparison chart */}
      <Card title="เปรียบเทียบมูลค่า PR และ PO รายเดือน">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockPRPOData}>
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
              <Bar dataKey="pr" name="ใบขอซื้อ (PR)" fill={colors.chart[0]} />
              <Bar dataKey="po" name="ใบสั่งซื้อ (PO)" fill={colors.chart[1]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* PR vs PO by Department chart */}
      <Card title="เปรียบเทียบมูลค่า PR และ PO ตามหน่วยงาน">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockDepartmentData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" stroke="#64748b" />
              <YAxis
                dataKey="department"
                type="category"
                stroke="#64748b"
                width={120}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                }}
              />
              <Legend />
              <Bar dataKey="pr" name="ใบขอซื้อ (PR)" fill={colors.chart[0]} />
              <Bar dataKey="po" name="ใบสั่งซื้อ (PO)" fill={colors.chart[1]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Summary stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="สรุปข้อมูล PR ประจำปี">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">จำนวน PR ทั้งหมด:</span>
              <span className="font-medium">358 รายการ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">มูลค่า PR รวม:</span>
              <span className="font-medium">฿ 1,680,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">มูลค่า PR เฉลี่ยต่อเดือน:</span>
              <span className="font-medium">฿ 140,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">มูลค่า PR สูงสุด:</span>
              <span className="font-medium">฿ 165,000 (ธ.ค.)</span>
            </div>
          </div>
        </Card>

        <Card title="สรุปข้อมูล PO ประจำปี">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">จำนวน PO ทั้งหมด:</span>
              <span className="font-medium">324 รายการ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">มูลค่า PO รวม:</span>
              <span className="font-medium">฿ 1,550,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">มูลค่า PO เฉลี่ยต่อเดือน:</span>
              <span className="font-medium">฿ 129,167</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">มูลค่า PO สูงสุด:</span>
              <span className="font-medium">฿ 150,000 (ธ.ค.)</span>
            </div>
          </div>
        </Card>

        <Card title="ประสิทธิภาพการจัดซื้อ">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">อัตราเฉลี่ย PO/PR:</span>
              <span className="font-medium">92.3%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ประหยัดงบประมาณ:</span>
              <span className="font-medium text-green-600">฿ 130,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">เวลาดำเนินการเฉลี่ย:</span>
              <span className="font-medium">5.2 วัน</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">
                จำนวน PR ที่ไม่ได้ดำเนินการ:
              </span>
              <span className="font-medium text-orange-600">8 รายการ</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-blue-600">
                Maechan Hospital
              </span>
              <span className="text-lg text-gray-600">| ระบบ Inventory</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm transition-colors">
                Settings
              </button>
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-6">
        {/* Page navigation */}
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Dashboard Inventory
          </h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(0)}
              className={`px-4 py-2 rounded-md text-sm flex items-center gap-2 transition-colors ${
                currentPage === 0
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-600 border border-gray-200"
              }`}
            >
              ภาพรวม
            </button>
            <button
              onClick={() => setCurrentPage(1)}
              className={`px-4 py-2 rounded-md text-sm flex items-center gap-2 transition-colors ${
                currentPage === 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-600 border border-gray-200"
              }`}
            >
              เปรียบเทียบ PR/PO
            </button>
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
            className={`p-2 rounded-full ${
              currentPage > 0
                ? "text-blue-600 hover:bg-blue-50"
                : "text-gray-300"
            }`}
            disabled={currentPage === 0}
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={() => currentPage < 1 && setCurrentPage(currentPage + 1)}
            className={`p-2 rounded-full ${
              currentPage < 1
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
