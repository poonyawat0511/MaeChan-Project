import { StockBudgetType } from "./stock-budget-type";
export interface StockBudget {
  budgetId: number;
  budgetName: string;
  budgetStatus: 'Y' | 'N' | null;
  stockBudgetTypeId: StockBudgetType | null;
  accPoBudgetSubTypeId: number;
}
