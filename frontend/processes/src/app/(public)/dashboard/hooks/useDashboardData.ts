import { useMemo } from "react";
import { StockPo } from "@/utils/types/stock-po";
import { StockRequest } from "@/utils/types/stock-request";
import { StockBudgetList } from "@/utils/types/stock-buget-list";

interface PRPOData {
  month: string;
  pr: number;
  po: number;
}

export const useDashboardData = (
  StockRequest: StockRequest[],
  po: StockPo[],
  stockBudgetList: StockBudgetList[],
  filterYear: number,
  filterMonth: string,
  selectedDepartments: string[],
  allDepartmentNames: string[]
) => {
  const budgetYearThai = (filterYear + 543).toString();

  const monthlyPurchases = useMemo(() => {
    return po
      .filter(
        (po) =>
          new Date(po.stockPoDate).getFullYear() === filterYear &&
          new Date(po.stockPoDate).toLocaleString("th-TH", { month: "short" }) === filterMonth
      )
      .reduce((sum, po) => sum + (po.poAmount || 0), 0);
  }, [po, filterYear, filterMonth]);

  const formattedInventoryData = useMemo(() => {
    return po
      .filter((po) => new Date(po.stockPoDate).getFullYear() === filterYear)
      .reduce((acc, po) => {
        if (!po.stockPoDate || !po.poAmount) return acc;

        const month = new Date(po.stockPoDate).toLocaleString("th-TH", { month: "short" });
        const existingEntry = acc.find((entry) => entry.month === month);
        if (existingEntry) {
          existingEntry.value += po.poAmount;
        } else {
          acc.push({ month, value: po.poAmount });
        }
        return acc;
      }, [] as { month: string; value: number }[]);
  }, [po, filterYear]);

  const formattedWarehouseData = useMemo(() => {
    return po
      .filter(
        (po) =>
          new Date(po.stockPoDate).toLocaleString("th-TH", { month: "short" }) === filterMonth
      )
      .reduce((acc, po) => {
        const warehouseName = po.warehouseId?.warehouseName || "Unknown";
        const existingWarehouse = acc.find((w) => w.name === warehouseName);

        if (existingWarehouse) {
          existingWarehouse.value += 1;
        } else {
          acc.push({ name: warehouseName, value: 1 });
        }
        return acc;
      }, [] as { name: string; value: number }[]);
  }, [po, filterMonth]);

  const totalBudgetListValue = useMemo(() => {
    return stockBudgetList
      .filter((b) => b.stockBudgetYear === budgetYearThai)
      .reduce((sum, b) => sum + (b.stockBudgetPrice || 0), 0);
  }, [stockBudgetList, budgetYearThai]);

  const totalBudgetUsed = useMemo(() => {
    return stockBudgetList
      .filter((b) => b.stockBudgetYear === budgetYearThai)
      .reduce((sum, b) => sum + (b.stockBudgetUse || 0), 0);
  }, [stockBudgetList, budgetYearThai]);

  const totalBudgetRemain = useMemo(() => {
    return stockBudgetList
      .filter((b) => b.stockBudgetYear === budgetYearThai)
      .reduce((sum, b) => sum + (b.stockBudgetRemain || 0), 0);
  }, [stockBudgetList, budgetYearThai]);

  const filteredDepartmentData = useMemo(() => {
    const departments = selectedDepartments.length > 0 ? selectedDepartments : allDepartmentNames;
    return departments
      .map((deptName) => {
        const prTotal = StockRequest.filter(
          (req) =>
            req.departmentId?.departmentName === deptName &&
            new Date(req.requestDate).getFullYear() === filterYear
        ).reduce((sum, req) => sum + (req.requestTotalPrice || 0), 0);

        const poTotal = po
          .filter((poItem) => {
            const relatedRequest = StockRequest.find(
              (req) =>
                req.requestId === poItem.refRequestId?.requestId &&
                req.departmentId?.departmentName === deptName
            );
            return (
              relatedRequest &&
              new Date(poItem.stockPoDate).getFullYear() === filterYear
            );
          })
          .reduce((sum, poItem) => sum + (poItem.poDeliverAmount || 0), 0);

        const poPercent = totalBudgetListValue > 0
          ? (poTotal / totalBudgetListValue) * 100
          : 0;

        return {
          department: deptName,
          pr: prTotal,
          po: poTotal,
          poPercent: +poPercent.toFixed(1),
        };
      })
      .filter((entry) => entry.pr > 0 || entry.po > 0)
      .sort((a, b) => b.po - a.po)
      .slice(0, selectedDepartments.length === 0 ? 8 : undefined);
  }, [selectedDepartments, allDepartmentNames, StockRequest, po, filterYear, totalBudgetListValue]);

  const prPoData: PRPOData[] = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const month = new Date(2025, i).toLocaleString("th-TH", { month: "short" });

      const prTotal = StockRequest.filter(
        (req) =>
          new Date(req.requestDate).getMonth() === i &&
          new Date(req.requestDate).getFullYear() === filterYear
      ).reduce((sum, req) => sum + (req.requestTotalPrice || 0), 0);

      const poTotal = po
        .filter(
          (po) =>
            new Date(po.stockPoDate).getMonth() === i &&
            new Date(po.stockPoDate).getFullYear() === filterYear
        )
        .reduce((sum, po) => sum + (po.poDeliverAmount || 0), 0);

      return { month, pr: prTotal, po: poTotal };
    });
  }, [StockRequest, po, filterYear]);

  const totalStockPo = po.length;
  const totalStockRequests = StockRequest.length;

  const totalStockPoValue = po.reduce(
    (sum, poItem) => sum + (poItem.stockBudgetUse || 0),
    0
  );
  const totalStockRequestValue = StockRequest.reduce(
    (sum, req) => sum + (req.requestTotalPrice || 0),
    0
  );

  const avgStockPoValue = totalStockPoValue / 12;
  const avgStockRequestValue = totalStockRequestValue / 12;

  const highestStockPo = po.reduce(
    (max, poItem) => (poItem.stockBudgetUse && poItem.stockBudgetUse > max ? poItem.stockBudgetUse : max),
    0
  );

  const highestStockRequest = StockRequest.reduce(
    (max, req) => (req.requestTotalPrice && req.requestTotalPrice > max ? req.requestTotalPrice : max),
    0
  );

  const poPrRatio = totalStockPo > 0 ? (totalStockRequests / totalStockPo) * 100 : 0;
  const budgetSaved = totalStockRequestValue - totalStockPoValue;

  const totalProcessingTime = po.reduce((sum, poItem) => {
    const request = StockRequest.find((req) => req.requestId === poItem.refRequestId?.requestId);
    if (!request) return sum;
    const prDate = new Date(request.requestDate);
    const poDate = new Date(poItem.stockPoDate);
    return sum + (poDate.getTime() - prDate.getTime()) / (1000 * 60 * 60 * 24);
  }, 0);

  const avgProcessingTime = totalStockPo > 0 ? (totalProcessingTime / totalStockPo).toFixed(1) : "0";

  const pendingPr = StockRequest.filter(
    (req) =>
      !po.some((poItem) => poItem.refRequestId?.requestId === req?.requestId)
  ).length;

  return {
    monthlyPurchases,
    totalBudgetListValue,
    totalBudgetUsed,
    totalBudgetRemain,
    formattedInventoryData,
    formattedWarehouseData,
    filteredDepartmentData,
    prPoData,
    totalStockPo,
    totalStockPoValue,
    avgStockPoValue,
    highestStockPo,
    totalStockRequests,
    totalStockRequestValue,
    avgStockRequestValue,
    highestStockRequest,
    poPrRatio,
    budgetSaved,
    avgProcessingTime,
    pendingPr,
  };
};
