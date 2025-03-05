import { stockBudgetType } from "./stock-budget-type";

export interface StokcBudget {
  budgetId: string;
  budgetName: string;
  budgetStatus: true;
  stockBudgetTypeId: stockBudgetType;
  accPoBudgetSubTypeId: null;
}
