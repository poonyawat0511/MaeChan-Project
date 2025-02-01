import jsPDF from "jspdf";
import { StockRequest } from "../types/stock-request";


export default function generatePDF(stockRequest: StockRequest): string {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Purchase Request", 105, 20, { align: "center" });
  doc.setFontSize(12);
  doc.text(`No: ${stockRequest.id}`, 20, 40);
  doc.text(`Document Number: ${stockRequest.runNumber}`, 20, 50);
  doc.text(`Item: ${stockRequest.requestNo}`, 20, 60);
  doc.text(`Quantity: ${stockRequest.stockApproveDate}`, 20, 70);
  doc.text(`Total Price: ${stockRequest.stockSubjectPerson}`, 20, 80);
  doc.text(`Requester: ${stockRequest.approve}`, 20, 90);
  doc.text(`Create Date: ${stockRequest.budgetRunNo}`, 20, 100);
  doc.text(`Due Date: ${stockRequest.useDate}`, 20, 110);
  const pdfBlob = doc.output("blob");
  return URL.createObjectURL(pdfBlob);
}
