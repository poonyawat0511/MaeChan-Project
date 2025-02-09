import { StockUser } from "./stock-user";

export interface StockRequest {
  id: string; // หรือเปลี่ยนเป็น number หาก backend ส่ง id เป็น number
  requestId: string; // เลขที่คำขอ
  requestDate: string; // วันที่คำขอ (ส่งมาเป็น ISO string จาก backend)
  requestNo: string; // หมายเลขคำขอ
  requestReceiveDate: string; // วันที่รับคำขอ (ส่งมาเป็น ISO string จาก backend)
  requestWarehouseId: string; // รหัสคลังสินค้า
  requestComplete: boolean; // สถานะคำขอเสร็จสมบูรณ์
  useDate: string; // วันที่ใช้ (ส่งมาเป็น ISO string จาก backend)
  stockPoId: string; // รหัสใบสั่งซื้อ
  hosGuid: string; // GUID ของโรงพยาบาล
  budgetYear: number; // ปีงบประมาณ
  stockSubject: string; // หัวข้อการขอ
  stockSubjectPerson: string; // ผู้รับผิดชอบในการขอ
  supplierId: string; // รหัสผู้จัดหา
  departmentId: string; // รหัสแผนก
  note: string; // หมายเหตุ
  transportDay: number; // วันขนส่ง
  budgetId: string; // รหัสงบประมาณ
  runNumber: number; // หมายเลขการดำเนินการ
  numberYear: number; // ปีที่เริ่มดำเนินการ
  numberMonth: number; // เดือนที่เริ่มดำเนินการ
  stockRequestDocId: string; // รหัสเอกสารคำขอ
  projectId: string; // รหัสโครงการ
  stockUserApprove: string; // ผู้อนุมัติคำขอ (เชื่อมโยงกับ StockUserApprove)
  stockApproveDate: string; // วันที่อนุมัติคำขอ (ส่งมาเป็น ISO string จาก backend)
  stockUser: StockUser; // ผู้ขอ (เชื่อมโยงกับ StockUser)
  stockRequestDocumentId: string; // รหัสเอกสารคำขอ
  projectPlanId: string; // รหัสแผนโครงการ
  requestAllComplete: boolean; // สถานะคำขอทั้งหมดเสร็จสมบูรณ์
  budgetRunNo: string; // หมายเลขการดำเนินการงบประมาณ
  approve: boolean; // สถานะการอนุมัติ
  requestTagNo: string; // หมายเลขแท็กคำขอ
  requestTime: string; // เวลาที่ทำการขอ
  purchaseType: string; // ประเภทการซื้อ
  stockBudgetTotal: number; // งบประมาณรวม
  stockBudgetUse: number; // งบประมาณที่ใช้ไป
  stockBudgetRemain: number; // งบประมาณที่เหลือ
  trimester: number; // ไตรมาส
  vatPercent: number; // เปอร์เซ็นต์ VAT
  requestReason: string; // เหตุผลในการขอ
  requestTotalPrice: number; // ราคาคำขอรวม
  requestItemCount: number; // จำนวนรายการในคำขอ
  stockBudgetPrUse: number; // งบประมาณที่ใช้ใน PR
  stockBudgetPrRemain: number; // งบประมาณที่เหลือใน PR
  officerList: string; // รายชื่อเจ้าหน้าที่
  stockPoNoList: string; // รายการหมายเลขใบสั่งซื้อ
  stockBudgetTypeId: number; // รหัสประเภทงบประมาณ
  depRequestNoList: string; // รายการหมายเลขคำขอแผนก
}
