import { StockBudgetList } from "./stock-buget-list";

export interface StockBudgetListTr {
  stockBudgetListTrId: number;
  stockBudgetListId: StockBudgetList;
  budgetPrice: number;
  budgetDate: string;
  budgetNote: string;
  updateDatetime: string;
}
