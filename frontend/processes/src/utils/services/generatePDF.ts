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
  
  thaitext(doc, stockRequest.requestWarehouseId.warehouseName, margin + 11, margin + 70);
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
  const filteredStockRequestList = stockRequestList.filter(item => item.requestId.requestId  === stockRequest.requestId);

  // Table Rows (Stock Request List Data)
  const itemRows = filteredStockRequestList.map((item, index) => [
    index + 1,
    item.tradeName || "-",
    item.requestQty,
    item.stockItemUnitStandardPrice || "-",
    item.totalPrice,
    "-",
    item.lastPrice || "-",
    stockRequest.transportDay,
  ]);

  doc.autoTable({
    startY: margin + 100,
    head: [itemColumn],
    body: itemRows,
    styles: { font: "Sarabun-Thin", fontSize: 10 },
    columnStyles: { 0: { cellWidth: 12 }, 1: { cellWidth: 50 } },
  });

  const finalY = doc.lastAutoTable?.finalY ?? margin + 120;

  //table summary
  const summaryColumns = ["รายการ", "จำนวนเงิน (บาท)"];
  const summaryRows = [
    ["ยอดเงินที่ได้รับจัดสรร", stockRequest.stockBudgetTotal, "บาท"],
    ["ยอดเงินที่ซื้อแล้ว", stockRequest.stockBudgetUse, "บาท"],
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

  //line 8 //stockRequest.purchaseType relation needed
  thaitext(doc, `ด้วยวิธี ${stockRequest.purchaseType} และขอแต่งตั้งคณะกรรมการตรวจรับพัสดุ ตามารายนามดังนี้`, margin, finalY2 + 10);


  //line 9
  doc.text('สถานะ __________________________________', margin +100, finalY2 + 30);
  if(stockRequest.requestComplete == true){
    thaitext(doc, `ผ่านการตรวจสอบ true`, margin +115, finalY2 + 30);
  }else if(stockRequest.requestComplete == null){
    thaitext(doc, `รอตรวจสอบ null`, margin +115, finalY2 + 30);
  }else{
    thaitext(doc, `ไม่ผ่านการตรวจสอบ false`, margin +115, finalY2 + 30);
  }
      

  /*

  var {
    ComboBox,
    ListBox,
    CheckBox,
    PushButton,
    TextField,
    PasswordField,
    RadioButton,
    Appearance
  } = jsPDF.AcroForm;

  doc.text("CheckBox:", margin + 60, finalY2 + 30);
  const checkBox = new CheckBox();
  checkBox.fieldName = "CheckBox1";
  checkBox.Rect = [margin + 80, finalY2 + 25, 10, 10];
  checkBox.noToggleToOff = true;
  checkBox.value = true;
  checkBox.color = "red";
  doc.addField(checkBox);
  */


  //line 10

  thaitext(doc, "ลงชื่อ ___________________________________ ผู้ตรวจสอบ", margin +100, finalY2 + 40);
  if(stockRequest.stockUserApprove){
    thaitext(doc, `${stockRequest.stockUserApprove.firstName} ${stockRequest.stockUserApprove.lastName}`, margin +100, finalY2 + 50);
  }else{
    thaitext(doc, `-`, margin +100, finalY2 + 50);
  }
    thaitext(doc, "ผู้ตรวจสอบ", margin +100, finalY2 + 60);

  thaitext(doc, "ลงชื่อ ___________________________________ ผู้ขออนุมัติ", margin, finalY2 + 40);
  if (stockRequest.stockUser) {
    thaitext(doc, `${stockRequest.stockUser.firstName} ${stockRequest.stockUser.lastName}`, margin, finalY2 + 50);
  }else{
    thaitext(doc, `-`, margin, finalY2 + 50);
  }
  thaitext(doc, "เจ้าหน้าที่พัสดุ", margin, finalY2 + 60);

  //line 11
  doc.text('สถานะ __________________________________', pageWidth / 2 - 30, finalY2 + 80);
  if(stockRequest.approve == true){
    thaitext(doc, `อนุมัติ true`, pageWidth / 2 -15, finalY2 + 80);
  }else if(stockRequest.approve == null){
    thaitext(doc, `รออนุมัติ null`, pageWidth / 2 -15, finalY2 + 80);
  }else{
    thaitext(doc, `ไม่อนุมัติ false`, pageWidth / 2 -15, finalY2 + 80);
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
