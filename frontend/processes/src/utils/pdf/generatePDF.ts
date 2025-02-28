import jsPDF from "jspdf";
import "jspdf-autotable";
import addThaiFont from "../Sarabun-Thin-normal";
import { StockRequest } from "../types/stock-request";
import imageData from "../imageData.json";

function thaitext(doc: jsPDF, str: string, x: number, y: number) {
  const sara = ['่', '้', '๊', '๋', '์'];
  const pushers = ['ิ', 'ี', 'ึ', 'ื', 'ำ', 'ั'];
  let base = '';
  const dim = doc.getTextDimensions(str);
  for (let i = 0; i < str.length; i++) {
    const c = str.charAt(i);
    if (sara.indexOf(c) < 0) {
      base += c;
    } else {
      const pusher = base.charAt(base.length - 1);
      if (pushers.indexOf(pusher) < 0) {
        if (str.charAt(i + 1) != '' && str.charAt(i + 1) == "ำ") { // next char is ำ
          const len = doc.getTextWidth(base + "ำ");
          doc.text(c, x + len, y - (dim.h / 4));
        } else {
          base += c;
        }
      } else {
        const len = doc.getTextWidth(base);
        doc.text(c, x + len, y - (dim.h / 4));
      }
    }
  }
  doc.text(base, x, y);
}

export default function generatePDF(stockRequest: StockRequest): string {
  const doc = new jsPDF("p", "mm", "a4");

  addThaiFont(doc);
  doc.setFont("Sarabun-Thin");

  const margin = 10;
  const pageWidth = doc.internal.pageSize.getWidth();

  const logo = imageData.myImage;
  doc.addImage(logo, 'JPEG', margin, margin, 16, 18);

  doc.setFontSize(19);
  doc.text("บันทึกข้อความ", pageWidth / 2, margin + 20, { align: "center" });


  doc.setFontSize(10);
  thaitext(doc, "ส่วนราชการ", margin, margin + 30);
  thaitext(doc, "โรงพยาบาลแม่จัน   อ.แม่จัน จ.เชียงราย", pageWidth / 3, margin + 30);

  thaitext(doc, `ที่ ชร 033.301/ ${stockRequest.requestNo}`, margin, margin + 40);
  thaitext(doc, `ลงวันที่ ${stockRequest.requestDate}`, pageWidth - margin - 40, margin + 40);

  thaitext(doc, "เรื่อง ขออนุมัติซื้อวัสดุ", margin, margin + 50);
  thaitext(doc, "เรียน ผู้อำนวยการโรงพยาบาลแม่จัน", margin, margin + 60);

  thaitext(
    doc,
    `ด้วย ${stockRequest.requestWarehouseId} โรงพยาบาลแม่จันมีความประสงค์ ขออนุมัติสั่งซื้อวัสดุ`,
    margin,
    margin + 70
  );
  thaitext(
    doc,
    "เพื่อสำรองจ่ายในคลังพัสดุกลางประจำเดือน และเพื่อให้แต่ละหน่วยงานสามารถเบิกใช้ได้อย่างเหมาะสม",
    margin,
    margin + 80
  );
  thaitext(doc, "จึงขออนุมัติตามรายการดังนี้", margin, margin + 90);

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
    startY: margin + 100,
    head: [tableColumn],
    body: tableRows,
    styles: { font: "Sarabun-Thin", fontSize: 9 },
    columnStyles: { 0: { cellWidth: 12 }, 1: { cellWidth: 80 } },
  });

  const finalY = doc.lastAutoTable?.finalY ?? margin + 120;

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

  thaitext(
    doc,
    `ด้วยวิธี ${stockRequest.note} และขอแต่งตั้งคณะกรรมการตรวจรับพัสดุ ตามารายนามดังนี้`,
    margin,
    finalY2 + 10
  );
  thaitext(doc, `${stockRequest.stockUser} ตำแหน่ง `, margin, finalY2 + 20);

  thaitext(doc, "▢ อนุมัติ    ▢ ไม่อนุมัติ", margin, finalY2 + 30);

  thaitext(doc, "ลงชื่อ ____________________ ผู้ตรวจสอบ", pageWidth - margin - 80, finalY2 + 40);
  thaitext(doc, "(นายวิสุทธิ์ แก้วประกาย)", pageWidth - margin - 80, finalY2 + 50);
  thaitext(doc, "ผู้ตรวจสอบ", pageWidth - margin - 80, finalY2 + 60);

  thaitext(doc, "ลงชื่อ ____________________ ผู้ขออนุมัติ", margin, finalY2 + 40);
  thaitext(doc, "(นายอธิวัฒน์ สุวรรณปัญญา)", margin, finalY2 + 50);
  thaitext(doc, "เจ้าหน้าที่พัสดุ", margin, finalY2 + 60);

  thaitext(doc, "ลงชื่อ ____________________", pageWidth / 2 - 30, finalY2 + 80);
  thaitext(doc, "(นายฐิติวัฒน์ ปาระมี)", pageWidth / 2 - 30, finalY2 + 90);
  thaitext(doc, "ผู้อำนวยการโรงพยาบาลแม่จัน", pageWidth / 2 - 30, finalY2 + 100);

  try {
    const pdfBlob = doc.output("blob");
    return URL.createObjectURL(pdfBlob);
  } catch (error) {
    console.error("Error generating PDF:", error);
    return "";
  }
}
