import jsPDF from "jspdf";
import "jspdf-autotable";
import addThaiFont from "../Sarabun-Thin-normal";
import { StockRequest } from "../types/stock-request";

export default function generatePDF(stockRequest: StockRequest): string {
  const doc = new jsPDF("p", "mm", "a4");

  addThaiFont(doc);
  doc.setFont("Sarabun-Thin");

  doc.setFontSize(16);
  doc.text("บันทึกข้อความ", 105, 20, { align: "center" });

  doc.setFontSize(10);
  doc.text("ส่วนราชการ:", 20, 30);
  doc.text("โรงพยาบาลแม่จัน", 60, 30);
  doc.text("อ.แม่จัน จ.เชียงราย", 140, 30);

  doc.text(`ที่ ${stockRequest.requestNo}`, 20, 40);
  doc.text(`ลงวันที่ ${stockRequest.requestDate}`, 140, 40);

  doc.text("เรื่อง ขออนุมัติซื้อวัสดุ", 20, 50);
  doc.text("เรียน ผู้อำนวยการโรงพยาบาลแม่จัน", 20, 60);

  doc.text(
    `ด้วย ${stockRequest.requestWarehouseId} โรงพยาบาลแม่จันมีความประสงค์ ขออนุมัติสั่งซื้อวัสดุ`,
    20,
    70
  );
  doc.text(
    "เพื่อสำรองจ่ายในคลังพัสดุกลางประจำเดือน และเพื่อให้แต่ละหน่วยงานสามารถเบิกใช้ได้อย่างเหมาะสม",
    20,
    80
  );
  doc.text("จึงขออนุมัติตามรายการดังนี้", 20, 90);

  const tableColumn = [
    "ลำดับ",
    "รายการ",
    "จำนวน",
    "ราคา/หน่วย",
    "เป็นเงิน",
    "ราคามาตรฐาน",
    "ราคาหลังสุด",
    "กำหนดเวลาใช้พัสดุ",
  ];
  const tableRows = [
    [
      stockRequest.supplierId,
      stockRequest.stockSubject,
      stockRequest.requestItemCount,
      stockRequest.requestTotalPrice,
      stockRequest.requestTotalPrice,
      "-",
      "-",
      stockRequest.useDate,
    ],
  ];

  doc.autoTable({
    startY: 100,
    head: [tableColumn],
    body: tableRows,
    styles: { font: "Sarabun-Thin", fontSize: 9 },
    columnStyles: { 0: { cellWidth: 12 }, 1: { cellWidth: 80 } },
  });

  const finalY = doc.lastAutoTable?.finalY ?? 120;

  const summaryColumns = ["รายการ", "จำนวนเงิน (บาท)"];
  const summaryRows = [
    ["รวมเป็นเงิน", stockRequest.requestTotalPrice, "บาท"],
    ["ยอดเงินที่ได้รับจัดสรร", stockRequest.stockBudgetTotal, "บาท"],
    ["ยอดเงินที่เหลือ", stockRequest.stockBudgetRemain, "บาท"],
  ];

  doc.autoTable({
    startY: finalY + 10,
    head: [summaryColumns],
    body: summaryRows,
    styles: { font: "Sarabun-Thin", fontSize: 10, halign: "center" },
    columnStyles: { 0: { cellWidth: 80, halign: "left" }, 1: { halign: "right" } },
  });

  const finalY2 = doc.lastAutoTable?.finalY ?? finalY + 30;

  doc.text(
    `ด้วยวิธี ${stockRequest.note} และขอแต่งตั้งคณะกรรมการตรวจรับพัสดุ ตามารายนามดังนี้`,
    20,
    finalY2 + 10
  );
  doc.text(`${stockRequest.stockUser} ตำแหน่ง `, 20, finalY2 + 20);

  doc.text("▢ อนุมัติ    ▢ ไม่อนุมัติ", 20, finalY2 + 30);

  doc.text("ลงชื่อ ____________________ ผู้ตรวจสอบ", 120, finalY2 + 40);
  doc.text("(นายวิสุทธิ์ แก้วประกาย)", 120, finalY2 + 50);
  doc.text("ผู้ตรวจสอบ", 120, finalY2 + 60);

  doc.text("ลงชื่อ ____________________ ผู้ขออนุมัติ", 20, finalY2 + 40);
  doc.text("(นายอธิวัฒน์ สุวรรณปัญญา)", 20, finalY2 + 50);
  doc.text("เจ้าหน้าที่พัสดุ", 20, finalY2 + 60);

  doc.text("ลงชื่อ ____________________", 70, finalY2 + 80);
  doc.text("(นายฐิติวัฒน์ ปาระมี)", 70, finalY2 + 90);
  doc.text("ผู้อำนวยการโรงพยาบาลแม่จัน", 70, finalY2 + 100);

  try {
    const pdfBlob = doc.output("blob");
    return URL.createObjectURL(pdfBlob);
  } catch (error) {
    console.error("Error generating PDF:", error);
    return "";
  }
}
