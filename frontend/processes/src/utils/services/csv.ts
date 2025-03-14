import { StockRequest } from "../types/stock-request";
import { StockUser } from "../types/stock-user";

export const downloadCSV = (requests: StockRequest[]) => {
  if (!requests || requests.length === 0) {
    alert("No data available to download.");
    return;
  }
  const headers = [
    "Request ID", "Request Date", "Request No", "Request Receive Date",
    "Request Warehouse ID", "Request Complete", "Use Date", "Stock PO ID",
    "HOS GUID", "Budget Year", "Stock Subject", "Stock Subject Person",
    "Supplier ID", "Department ID", "Note", "Transport Day", "Budget ID",
    "Run Number", "Number Year", "Number Month", "Stock Request Doc ID",
    "Project ID", "Stock User Approve", "Stock Approve Date", "Stock User",
    "Stock Request Document ID", "Project Plan ID", "Request All Complete",
    "Budget Run No", "Approve", "Request Tag No", "Request Time",
    "Purchase Type", "Stock Budget Total", "Stock Budget Use",
    "Stock Budget Remain", "Trimester", "VAT Percent", "Request Reason",
    "Request Total Price", "Request Item Count", "Stock Budget PR Use",
    "Stock Budget PR Remain", "Officer List", "Stock PO No List",
    "Stock Budget Type ID", "Dep Request No List"
  ];

  const getStockUserId = (user: StockUser | undefined | null): string => {
    if (!user) {
      console.warn("⚠️ Missing StockUser Data!");
      return "N/A"; // กำหนดค่า default
    }
    return user.firstName ? user.firstName.toString() : "N/A";
  };
  

  const csvRows = requests.map((request) => {
    console.log("Checking stockUserApprove:", request.stockUserApprove);
    console.log("Checking stockUser:", request.stockUser);
  
    return [
      request.requestId,
      request.requestDate,
      request.requestNo,
      request.requestReceiveDate,
      request.requestWarehouseId?.warehouseId ?? "N/A",
      request.requestComplete,
      request.useDate,
      request.stockPoId?.stockPoId ?? "N/A",
      request.hosGuid ?? "N/A",
      request.budgetYear ?? "N/A",
      request.stockSubject ?? "N/A",
      request.stockSubjectPerson ?? "N/A",
      request.supplierId ?? "N/A",
      request.departmentId ?? "N/A",
      request.note ?? "N/A",
      request.transportDay ?? "N/A",
      request.budgetId ?? "N/A",
      request.runNumber ?? "N/A",
      request.numberYear ?? "N/A",
      request.numberMonth ?? "N/A",
      request.stockRequestDocId ?? "N/A",
      request.projectId ?? "N/A",
      request.stockUserApprove ? getStockUserId(request.stockUserApprove) : "N/A",
      request.stockApproveDate ?? "N/A",
      request.stockUser ? getStockUserId(request.stockUser) : "N/A",
      request.stockRequestDocumentId ?? "N/A",
      request.projectPlanId ?? "N/A",
      request.requestAllComplete ?? "N/A",
      request.budgetRunNo ?? "N/A",
      request.approve ?? "N/A",
      request.requestTagNo ?? "N/A",
      request.requestTime ?? "N/A",
      request.purchaseType ?? "N/A",
      request.stockBudgetTotal ?? "N/A",
      request.stockBudgetUse ?? "N/A",
      request.stockBudgetRemain ?? "N/A",
      request.trimester ?? "N/A",
      request.vatPercent ?? "N/A",
      request.requestReason ?? "N/A",
      request.requestTotalPrice ?? "N/A",
      request.requestItemCount ?? "N/A",
      request.stockBudgetPrUse ?? "N/A",
      request.stockBudgetPrRemain ?? "N/A",
      request.officerList ?? "N/A",
      request.stockPoNoList ?? "N/A",
      request.stockBudgetTypeId ?? "N/A",
      request.depRequestNoList ?? "N/A"
    ];
  });
   
  const csvContent = [
    headers.join(","), 
    ...csvRows.map((row) => row.map((item) => `"${item}"`).join(","))
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "stock_requests.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
