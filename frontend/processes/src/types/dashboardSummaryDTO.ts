export interface DashboardSummaryDTO {
    monthlyPurchases: number;
    formattedInventoryData: { month: string; value: number }[];
    formattedWarehouseData: { name: string; value: number }[];
    filteredDepartmentData: {
      department: string;
      pr: number;
      po: number;
      poPercent: number;
    }[];
    prPoData: { month: string; pr: number; po: number }[];
  
    totalStockRequests: number;
    totalStockRequestValue: number;
    avgStockRequestValue: number;
    highestStockRequest: number;
  
    totalStockPo: number;
    totalStockPoValue: number;
    avgStockPoValue: number;
    highestStockPo: number;
  
    poPrRatio: number;
    budgetSaved: number;
    avgProcessingTime: string;
    pendingPr: number;
  
    totalBudgetListValue: number;
    totalBudgetUsed: number;
    totalBudgetRemain: number;
  }
  