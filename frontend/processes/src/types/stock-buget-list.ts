import { StockBudget } from "./stock-budget";

export interface StockBudgetList {
  stockBudgetListId: number;
  budgetId: StockBudget;
  stockBudgetYear: string;
  stockBudgetPrice: number;
  stockBudgetRemain: number;
  stockBudgetUse: number;
  stockBudgetRcvPrice: number;
}
