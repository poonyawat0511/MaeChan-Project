import jsPDF from "jspdf";
import "jspdf-autotable";
import addThaiFont from "../Sarabun-Thin-normal";
import { StockRequest } from "../types/stock-request";
import imageData from "../imageData.json";
import { StockRequestList } from "../types/stock-request-list";

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

function formatNumber(num: number | null | undefined) {
  if (num === null || num === undefined) return "-"; // Handle null or undefined
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function generatePDF(stockRequest: StockRequest, stockRequestList: StockRequestList[]): string {
  const doc = new jsPDF("p", "mm", "a4");

  addThaiFont(doc);
  doc.setFont("Sarabun-Thin");

  const margin = 10;
  const pageWidth = doc.internal.pageSize.getWidth();

  const logo = imageData.myImage;
  doc.addImage(logo, 'JPEG', margin, margin, 16, 18);

  // doc.addImage("examples/images/Octonyan.jpg", "JPEG", 15, 40, 180, 180);


  //line 1
  doc.setFontSize(19);
  doc.text("บันทึกข้อความ", pageWidth / 2, margin + 20, { align: "center" });

  //line 2
  doc.setFontSize(10);
  thaitext(doc, "ส่วนราชการ", margin, margin + 30);
  thaitext(doc, "โรงพยาบาลแม่จัน   อ.แม่จัน จ.เชียงราย", margin + 70, margin + 30);

  //line 3
  thaitext(doc, `ที่ ชร 033.301/ `, margin, margin + 40);
  
  thaitext(doc, ` ${stockRequest.requestNo}`, margin + 26, margin + 40);
  doc.line(margin + 25, margin + 41, margin + 50, margin + 41); // Add bottom line

  thaitext(doc, `ลงวันที่ `, margin + 70, margin + 40);

  thaitext(doc, ` ${stockRequest.requestDate}`, margin + 86, margin + 40);
  doc.line(margin + 85, margin + 41, margin + 185, margin + 41); // Add bottom line

  //line 4
  thaitext(doc, "เรื่อง ", margin, margin + 50);

  thaitext(doc, ` ${stockRequest.stockSubject}`, margin + 11, margin + 50);
  doc.line(margin + 10, margin + 51, margin + 185, margin + 51); // Add bottom line

  //line 5
  thaitext(doc, "เรียน ผู้อำนวยการโรงพยาบาลแม่จัน", margin, margin + 60);

  //line 6
  thaitext(doc, "ด้วย ", margin, margin + 70);
  
  thaitext(doc, stockRequest.requestWarehouseId?.warehouseName || "-", margin + 11, margin + 70);
  doc.line(margin + 10, margin + 71, margin + 80, margin + 71); // Add bottom line
  
  thaitext(doc, "โรงพยาบาลแม่จันมีความประสงค์ ขออนุมัติสั่งซื้อวัสดุ ", margin + 82, margin + 70);

  //line 7
  thaitext(doc, "เพื่อสำรองจ่ายในคลังพัสดุกลางประจำเดือน ", margin , margin + 80);
  thaitext(doc, "เพื่อให้แต่ละหน่วยงานสามารถเบิกใช้ได้อย่างเหมาะสม จึงขออนุมัติตามรายการดังนี้", margin, margin + 90);

  const itemColumn = [
    "ลำดับ",
    "รายการ",
    "จำนวน",
    "ราคา/หน่วย",
    "เป็นเงิน",
    "ราคามาตรฐาน",
    "ราคาหลังสุด",
    "กำหนดเวลาใช้พัสดุ",
  ];

  // Filter stockRequestList to only include items that match the stockRequest
  const filteredStockRequestList = stockRequestList.filter(item => item?.requestId?.requestId  === stockRequest?.requestId);

  // Table Rows (Stock Request List Data)
  const itemRows = filteredStockRequestList.map((item, index) => [
    index + 1,
    item.tradeName || "-",
    formatNumber(item.requestQty),
    formatNumber(item.stockItemUnitStandardPrice) || "-",
    formatNumber(item.totalPrice),
    "-",
    formatNumber(item.lastPrice) || "-",
    `${stockRequest?.transportDay || '-'}` + ' วัน',
  ]);

  const itemCount = itemRows.length;
  const sumTotalPrice = filteredStockRequestList.reduce((sum, item) => sum + (item.totalPrice || 0), 0);

  doc.autoTable({
    startY: margin + 100,
    head: [itemColumn],
    body: itemRows,
    styles: { 
        font: "Sarabun-Thin", 
        fontSize: 10, 
        fillColor: [255, 255, 255], // White background for body rows
        textColor: [0, 0, 0], // Black text for body
        lineColor: [0, 0, 0], // Black outline for border
        lineWidth: 0.2 // Set thickness of the border
    },
    headStyles: {
        fillColor: [200, 200, 200], // Gray background for header
        textColor: [0, 0, 0], // Black text for header
        lineColor: [0, 0, 0], // Black outline for header border
        lineWidth: 0.2 // Set thickness of the header border
    },
    columnStyles: { 
        0: { cellWidth: 12, halign: "center" }, 
        1: { cellWidth: 50 } 
    },
});

const finalY = doc.lastAutoTable?.finalY ?? margin + 120;

  //line 7.1 total summary
  thaitext(doc, "รวม " + itemCount + " รายการ เป็นเงินทั้งสิ้น  " + formatNumber(sumTotalPrice) + "  บาท", margin, finalY+10);

  //table summary
  const summaryColumns = ["ยอดเงินที่ได้รับจัดสรร", "ยอดเงินที่ซื้อแล้ว", "ยอดเงินที่เหลือ"];
  const summaryRows = [
    [formatNumber(stockRequest.stockBudgetTotal)+ " บาท",formatNumber(stockRequest.stockBudgetUse) + " บาท", formatNumber(stockRequest.stockBudgetRemain) + " บาท"],
  ];

  doc.autoTable({
    startY: finalY + 20,
    head: [summaryColumns],
    body: summaryRows,
    styles: { 
        font: "Sarabun-Thin", 
        fontSize: 10, 
        fillColor: [255, 255, 255], // White background for body rows
        textColor: [0, 0, 0], // Black text for body
        lineColor: [0, 0, 0], // Black outline for border
        lineWidth: 0.2 // Set thickness of the border
    },
    headStyles: {
        fillColor: [200, 200, 200], // Gray background for header
        textColor: [0, 0, 0], // Black text for header
        lineColor: [0, 0, 0], // Black outline for header border
        lineWidth: 0.2 // Set thickness of the header border
    },
    columnStyles: { 
        0: { cellWidth: 60, halign: "left" }, 
        1: { halign: "left" } 
    },
});

  let finalY2 = doc.lastAutoTable?.finalY ?? finalY + 20;

  // Check if the content exceeds the page height and add a new page if necessary
  if (finalY2 + 30 > doc.internal.pageSize.getHeight() - margin) {
    doc.addPage();
    finalY2 = margin; // Reset finalY2 for the new page
  }

  //line 8 //stockRequest.purchaseType relation needed
  thaitext(doc, `ด้วยวิธี `, margin, finalY2 + 10);

  thaitext(doc, `${stockRequest?.purchaseType?.purchaseTypeName || "-"} `, margin + 14, finalY2 + 10);
  doc.line(margin + 12, finalY2 + 11, margin + 80, finalY2 + 11);

  thaitext(doc, ` และขอแต่งตั้งคณะกรรมการตรวจรับพัสดุ ตามารายนามดังนี้`, margin + 81, finalY2 + 10);

  // Check again for overflow before adding more content
  if (finalY2 + 50 > doc.internal.pageSize.getHeight() - margin) {
    doc.addPage();
    finalY2 = margin; // Reset finalY2 for the new page
  }

  //line 9
  doc.text('สถานะ __________________________________', margin + 100, finalY2 + 30);
  if (stockRequest.requestComplete === "Y") {
    thaitext(doc, `ผ่านการตรวจสอบ`, margin + 115, finalY2 + 30);
  } else if (stockRequest.requestComplete === null) {
    thaitext(doc, `รอตรวจสอบ`, margin + 115, finalY2 + 30);
  } else {
    thaitext(doc, `ไม่ผ่านการตรวจสอบ`, margin + 115, finalY2 + 30);
  }    

  //line 10

  thaitext(doc, "ลงชื่อ ___________________________________ ผู้ตรวจสอบ", margin +100, finalY2 + 40);
  if(stockRequest.stockUserApprove){
    thaitext(doc, `${stockRequest.stockUserApprove.officerName}`, margin +100, finalY2 + 50);
  }else{
    thaitext(doc, `-`, margin +100, finalY2 + 50);
  }
    thaitext(doc, "ผู้ตรวจสอบ", margin +100, finalY2 + 60);

  thaitext(doc, "ลงชื่อ ___________________________________ ผู้ขออนุมัติ", margin, finalY2 + 40);
  if (stockRequest.stockUser) {
    thaitext(doc, `${stockRequest.stockUser.officerName}`, margin, finalY2 + 50);
  }else{
    thaitext(doc, `-`, margin, finalY2 + 50);
  }
  thaitext(doc, "เจ้าหน้าที่พัสดุ", margin, finalY2 + 60);

  //line 11
  doc.text('สถานะ __________________________________', pageWidth / 2 - 30, finalY2 + 80);
  if (stockRequest.approve === "Y") {
    thaitext(doc, `อนุมัติ`, pageWidth / 2 - 15, finalY2 + 80);
  } else if (stockRequest.approve === null) {
    thaitext(doc, `รออนุมัติ`, pageWidth / 2 - 15, finalY2 + 80);
  } else {
    thaitext(doc, `ไม่อนุมัติ`, pageWidth / 2 - 15, finalY2 + 80);
  }
  

  //line 12
  thaitext(doc, "ลงชื่อ ___________________________________", pageWidth / 2 - 30, finalY2 + 90);
  thaitext(doc, "(นายฐิติวัฒน์ ปาระมี)", pageWidth / 2 - 30, finalY2 + 100);
  thaitext(doc, "ผู้อำนวยการโรงพยาบาลแม่จัน", pageWidth / 2 - 30, finalY2 + 110);

  try {
    const pdfBlob = doc.output("blob");
    return URL.createObjectURL(pdfBlob);
  } catch (error) {
    console.error("Error generating PDF:", error);
    return "";
  }
}
