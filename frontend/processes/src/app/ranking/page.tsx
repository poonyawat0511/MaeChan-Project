"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Progress } from "@heroui/react";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const RankingDashboard = () => {
  const [totalData, setTotalData] = useState<any>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [totalYear, setTotalYear] = useState<string>("2023");
  const [chartYear, setChartYear] = useState<string>("2023");
  const [orderYear, setOrderYear] = useState<string>("2023");

  useEffect(() => {
    const fetchData = async (year: string, setState: any) => {
      try {
        const res = await fetch(`/api-temp/ranking?year=${year}`);
        const result = await res.json();
        setState(result);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(totalYear, setTotalData);
    fetchData(chartYear, setChartData);
    fetchData(orderYear, setOrderData);
  }, [totalYear, chartYear, orderYear]);

  if (loading) return <p>กำลังโหลด...</p>;

  return (
    <div className="p-6 space-y-6">
      <Card>
        <div className="flex justify-between items-center">
          <CardHeader>ค่าใช้จ่ายทั้งหมด</CardHeader>
          <select value={totalYear} onChange={(e) => setTotalYear(e.target.value)} className="w-36 border p-2 rounded">
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <CardBody>
          <h2 className="text-3xl font-bold">฿{parseFloat(totalData?.totalBudget || 0).toLocaleString()}</h2>
          <div className="mt-4 space-y-2">
            {totalData?.departments?.map((dept: any, index: number) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{dept.departmentname}</span>
                  <span>฿{parseFloat(dept.total_spent).toLocaleString()}</span>
                </div>
                <Progress value={(parseFloat(dept.total_spent) / parseFloat(totalData.totalBudget)) * 100} />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card>
        <div className="flex justify-between items-center">
          <CardHeader>สถิติการใช้เงิน</CardHeader>
          <select value={chartYear} onChange={(e) => setChartYear(e.target.value)} className="w-36 border p-2 rounded">
            <option value="2024">พ.ศ. 2567</option>
            <option value="2023">พ.ศ. 2566</option>
            <option value="2022">พ.ศ. 2565</option>
          </select>
        </div>
        <CardBody>
          {chartData?.monthlySpending?.length > 0 ? <Bar data={{
            labels: chartData.monthlySpending.map((item: any) => new Date(item.month).toLocaleString('th-TH', { month: 'long', year: 'numeric' })),
            datasets: [{
              label: 'Spending',
              data: chartData.monthlySpending.map((item: any) => item.monthly_spent),
              backgroundColor: '#6366F1',
            }],
          }} /> : <p>ไม่มีข้อมูลสถิติ</p>}
        </CardBody>
      </Card>

      <Card>
        <div className="flex justify-between items-center">
          <CardHeader>รายการสั่งซื้อ</CardHeader>
          <select value={orderYear} onChange={(e) => setOrderYear(e.target.value)} className="w-36 border p-2 rounded">
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <CardBody>
          <Table>
            <TableHeader>
              <TableColumn>หมายเลข PO</TableColumn>
              <TableColumn>หน่วยงาน</TableColumn>
              <TableColumn>จำนวนเงิน</TableColumn>
              <TableColumn>วันที่ซื้อ</TableColumn>
            </TableHeader>
            <TableBody>
              {orderData?.latestOrders?.map((order: any) => (
                <TableRow key={order.stock_po_no}>
                  <TableCell>{order.stock_po_no}</TableCell>
                  <TableCell>{order.departmentname}</TableCell>
                  <TableCell>{`฿${parseFloat(order.po_amount).toLocaleString()}`}</TableCell>
                  <TableCell>{order.end_date ? new Date(order.end_date).toLocaleDateString('th-TH') : 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default RankingDashboard;
