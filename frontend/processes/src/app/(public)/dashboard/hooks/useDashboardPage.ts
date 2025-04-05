import { useEffect, useState } from "react";
import { getStockRequests, getStockPo, getStockDepartments, getStockBudgetList, getStockBugets, getStockBudgetType } from "@/utils/services/getApi";
import { StockRequest } from "@/utils/types/stock-request";
import { StockPo } from "@/utils/types/stock-po";
import { StockDepartment } from "@/utils/types/stock-department";
import { StockBudgetList } from "@/utils/types/stock-buget-list";
import { StockBudget } from "@/utils/types/stock-budget";
import { StockBudgetType } from "@/utils/types/stock-budget-type";

export const useDashboardPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [requests, setRequests] = useState<StockRequest[]>([]);
    const [po, setPo] = useState<StockPo[]>([]);
    const [departments, setDepartments] = useState<StockDepartment[]>([]);
    const [budgetList, setBudgetList] = useState<StockBudgetList[]>([]);
    const [budgetType, setBudgetType] = useState<StockBudgetType[]>([]);
    const [budgets, setBudgets] = useState<StockBudget[]>([]);

    const fetchData = async () => {
        try {
            const [reqData, poData, deptData, listData, budgetData ,budgetTypeData] = await Promise.all([
                getStockRequests(),
                getStockPo(),
                getStockDepartments(),
                getStockBudgetList(),
                getStockBugets(),
                getStockBudgetType(),
            ]);
            setRequests(reqData);
            setPo(poData);
            setDepartments(deptData);
            setBudgetList(listData);
            setBudgets(budgetData);
            setBudgetType(budgetTypeData);
            setError(null);
        } catch {
            setError("Failed to load requests");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {
        loading,
        error,
        requests,
        po,
        departments,
        budgetList,
        budgets,
        budgetType,
        setRequests,
        setPo,
        setDepartments,
        setBudgetList,
        setBudgets,
    };
};
