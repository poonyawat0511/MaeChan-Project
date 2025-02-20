import { StockRequest } from "../types/stock-request";

export const downloadCSV = (requests: StockRequest[]) => {
  if (!requests || requests.length === 0) {
    alert("No data available to download.");
    return;
  }
  const headers = [
    "ID", "Request ID", "Request Date", "Request No", "Request Receive Date",
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

  const csvRows = requests.map((request) => [
    request.id,
    request.requestId,
    request.requestDate,
    request.requestNo,
    request.requestReceiveDate,
    request.requestWarehouseId,
    request.requestComplete,
    request.useDate,
    request.stockPoId,
    request.hosGuid,
    request.budgetYear,
    request.stockSubject,
    request.stockSubjectPerson,
    request.supplierId,
    request.departmentId,
    request.note,
    request.transportDay,
    request.budgetId,
    request.runNumber,
    request.numberYear,
    request.numberMonth,
    request.stockRequestDocId,
    request.projectId,
    request.stockUserApprove,
    request.stockApproveDate,
    request.stockUser,
    request.stockRequestDocumentId,
    request.projectPlanId,
    request.requestAllComplete,
    request.budgetRunNo,
    request.approve,
    request.requestTagNo,
    request.requestTime,
    request.purchaseType,
    request.stockBudgetTotal,
    request.stockBudgetUse,
    request.stockBudgetRemain,
    request.trimester,
    request.vatPercent,
    request.requestReason,
    request.requestTotalPrice,
    request.requestItemCount,
    request.stockBudgetPrUse,
    request.stockBudgetPrRemain,
    request.officerList,
    request.stockPoNoList,
    request.stockBudgetTypeId,
    request.depRequestNoList
  ]);

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
