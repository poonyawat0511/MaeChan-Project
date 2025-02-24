"use client"
import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Clock, TrendingUp, Package, AlertTriangle, Users, ChevronDown, Search, Bell, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/global/cards/card';
import { motion } from 'framer-motion';

const InventoryDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('week');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'amount', direction: 'desc' });
  
  const colors = {
    primary: '#4F46E5',    // Indigo
    secondary: '#0EA5E9',  // Sky blue
    accent: '#06B6D4',     // Cyan
    success: '#10B981',    // Emerald
    warning: '#F59E0B',    // Amber
    danger: '#EF4444',     // Red
    neutral: '#6B7280',    // Gray
    chart1: '#4F46E5',     // Primary Indigo
    chart2: '#8B5CF6',     // Purple
    chart3: '#EC4899',     // Pink
    chart4: '#14B8A6',     // Teal
    chart5: '#F97316',     // Orange
  };

  const departmentUsage = [
    { department: 'ห้องยา', amount: 180000, orders: 52, stock: 85 },
    { department: 'ห้องฉุกเฉิน', amount: 150000, orders: 45, stock: 72 },
    { department: 'ผู้ป่วยนอก', amount: 125000, orders: 38, stock: 65 },
    { department: 'ผู้ป่วยใน', amount: 115000, orders: 35, stock: 78 },
    { department: 'ห้องผ่าตัด', amount: 95000, orders: 28, stock: 92 },
    { department: 'ห้องปฏิบัติการ', amount: 85000, orders: 25, stock: 88 },
  ];

  const categoryData = [
    { name: 'เวชภัณฑ์ยา', value: 35 },
    { name: 'วัสดุการแพทย์', value: 25 },
    { name: 'วัสดุสำนักงาน', value: 20 },
    { name: 'ครุภัณฑ์', value: 15 },
    { name: 'อื่นๆ', value: 5 },
  ];

  const recentOrders = [
    { 
      id: 'PO-2024-001',
      department: 'ห้องยา',
      items: 'Paracetamol 500mg',
      quantity: '5000 เม็ด',
      amount: 25000,
      date: '23/02/2024',
      status: 'completed',
      urgency: 'normal'
    },
    { 
      id: 'PO-2024-002',
      department: 'ห้องฉุกเฉิน',
      items: 'Surgical Mask',
      quantity: '50 กล่อง',
      amount: 15000,
      date: '23/02/2024',
      status: 'pending',
      urgency: 'urgent'
    },
    { 
      id: 'PO-2024-003',
      department: 'ห้องปฏิบัติการ',
      items: 'Test Tubes',
      quantity: '200 ชิ้น',
      amount: 12000,
      date: '22/02/2024',
      status: 'processing',
      urgency: 'normal'
    },
  ];

  const notifications = [
    {
      id: 1,
      type: 'stock',
      title: 'พัสดุใกล้หมด',
      message: 'Surgical Gloves (Size M) เหลือน้อยกว่า 20%',
      time: '10 นาทีที่แล้ว',
      priority: 'high'
    },
    {
      id: 2,
      type: 'order',
      title: 'คำสั่งซื้อด่วน',
      message: 'ห้องฉุกเฉินขอเบิก N95 Mask ด่วน',
      time: '25 นาทีที่แล้ว',
      priority: 'urgent'
    },
    {
      id: 3,
      type: 'expiry',
      title: 'พัสดุใกล้หมดอายุ',
      message: 'Normal Saline 100ml จะหมดอายุภายใน 30 วัน',
      time: '1 ชั่วโมงที่แล้ว',
      priority: 'medium'
    },
  ];

  // Helper function to get status color
  const getStatusColor = (status: any) => {
    switch (status) {
      case 'completed':
        return colors.success;
      case 'pending':
        return colors.warning;
      case 'processing':
        return colors.accent;
      default:
        return colors.neutral;
    }
  };

  // Helper function to get priority color
  const getPriorityColor = (priority: any) => {
    switch (priority) {
      case 'high':
        return colors.warning;
      case 'urgent':
        return colors.danger;
      case 'medium':
        return colors.accent;
      default:
        return colors.neutral;
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const scaleIn = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.5 }
  };


  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Top Navigation - Enhanced with shadows and animations */}
      <motion.div 
        className="bg-white border-b shadow-sm sticky top-0 z-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">ระบบคลังพัสดุ</h1>
                <p className="text-sm text-slate-500 font-medium">โรงพยาบาลแม่จัน จังหวัดเชียงราย</p>
              </div>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                <Search size={18} className="text-slate-400" />
                <input 
                  type="text" 
                  placeholder="ค้นหาพัสดุ..." 
                  className="bg-transparent border-none focus:outline-none text-sm w-64"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg hover:bg-slate-50 relative"
              >
                <Bell size={20} className="text-slate-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </motion.button>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer"
              >
                <Calendar size={18} className="text-slate-400" />
                <span className="text-sm font-medium">กุมภาพันธ์ 2567</span>
                <ChevronDown size={16} className="text-slate-400" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="p-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <Package size={24} />
                <span className="text-xs font-medium bg-blue-400/30 px-2 py-1 rounded">รายเดือน</span>
              </div>
              <h3 className="text-3xl font-bold mb-1">4,528</h3>
              <p className="text-blue-100">รายการพัสดุทั้งหมด</p>
              <div className="flex items-center gap-2 mt-4 text-sm">
                <span className="bg-green-500 text-white px-2 py-0.5 rounded text-xs">+12%</span>
                <span className="text-blue-100">จากเดือนที่แล้ว</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <AlertTriangle size={24} className="text-orange-500" />
                <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded">เร่งด่วน</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">18</h3>
              <p className="text-gray-500">รายการที่ต้องสั่งซื้อ</p>
              <div className="flex items-center gap-2 mt-4 text-sm">
                <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs">+5</span>
                <span className="text-gray-500">จากสัปดาห์ที่แล้ว</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <TrendingUp size={24} className="text-green-500" />
                <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded">รายสัปดาห์</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">฿289K</h3>
              <p className="text-gray-500">มูลค่าการเบิกจ่าย</p>
              <div className="flex items-center gap-2 mt-4 text-sm">
                <span className="bg-green-500 text-white px-2 py-0.5 rounded text-xs">+8%</span>
                <span className="text-gray-500">จากสัปดาห์ที่แล้ว</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <Users size={24} className="text-purple-500" />
                <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded">ทั้งหมด</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">12</h3>
              <p className="text-gray-500">แผนกที่เบิกประจำ</p>
              <div className="flex items-center gap-2 mt-4 text-sm">
                <span className="text-gray-500">ครบทุกแผนก</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          {/* Department Usage Chart */}
          <Card className="col-span-8">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-medium text-gray-800">การเบิกจ่ายตามแผนก</h3>
                  <p className="text-sm text-gray-500">แสดงมูลค่าและจำนวนครั้งในการเบิก</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50">
                    <Filter size={16} />
                    <span>ตัวกรอง</span>
                  </button>
                  <select 
                    className="px-3 py-1.5 text-sm border rounded-lg bg-white"
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value)}
                  >
                    <option value="week">7 วันล่าสุด</option>
                    <option value="month">30 วันล่าสุด</option>
                    <option value="quarter">3 เดือน</option>
                  </select>
                </div>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentUsage} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="department" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                      interval={0}
                      angle={-15}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="amount" 
                      name="มูลค่า (บาท)" 
                      fill={colors.primary} 
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar 
                      dataKey="orders" 
                      name="จำนวนครั้ง" 
                      fill={colors.secondary}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card className="col-span-4">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-medium text-gray-800">สัดส่วนประเภทพัสดุ</h3>
                  <p className="text-sm text-gray-500">แยกตามประเภท</p>
                </div>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill={colors.primary}
                      label
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={Object.values(colors)[index % Object.values(colors).length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  };
  
  export default InventoryDashboard;
  