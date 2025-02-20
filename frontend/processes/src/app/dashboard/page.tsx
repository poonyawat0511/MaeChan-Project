"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Tabs, Tab } from "@heroui/react";
import { poApi } from "@/utils/api/api";

const RankingDashboard = () => {
  const [poData, setPoData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchPoData = async () => {
      try {
        const res = await fetch(poApi, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch purchase order data");
        }

        const result = await res.json();
        setPoData(result);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoData();
  }, []);

  if (loading) return <p>กำลังโหลด...</p>;

  return (
    <div className="p-6 space-y-6">
      <Tabs 
        defaultIndex={activeTab} 
        onSelect={(event, index: number) => setActiveTab(index)}
        className="space-y-6"
      >
        {/* Summary Tab */}
        <Tab title="สรุปคำสั่งซื้อ (Purchase Orders)">
          <Card className="mb-6">
            <CardHeader>รายการคำสั่งซื้อทั้งหมด</CardHeader>
            <div className="p-4">
              {poData.length > 0 ? (
                poData.map((po: any, index: number) => (
                  <div key={index} className="p-3 border rounded-md shadow-sm">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">{po.stockPoNo}</span>
                      <span className="text-gray-500">{po.stockPoDate}</span>
                    </div>
                    <div className="mt-1 flex justify-between text-sm">
                      <span className="text-gray-700">คลังสินค้า: {po.warehouseId}</span>
                      <span className="text-green-600 font-bold">฿{parseFloat(po.poAmount).toLocaleString()}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">ไม่มีข้อมูลคำสั่งซื้อ</p>
              )}
            </div>
          </Card>
        </Tab>

        <Tab title="หน้าที่สอง">
          <Card>
            <CardHeader>ข้อมูลเพิ่มเติม</CardHeader>
            <div className="p-4">เนื้อหาหน้านี้...</div>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default RankingDashboard;
