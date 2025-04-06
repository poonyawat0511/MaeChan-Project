import { useEffect, useState } from "react";
import { getStockRequests, getStockPo, getStockDepartments, getStockBudgetList, getStockBudgetType, getStockBugetsByPageTable } from "@/utils/services/getApi";
import { StockRequest } from "@/utils/types/stock-request";
import { StockPo } from "@/utils/types/stock-po";
import { StockDepartment } from "@/utils/types/stock-department";
import { StockBudgetList } from "@/utils/types/stock-buget-list";
import { StockBudget } from "@/utils/types/stock-budget";
import { StockBudgetType } from "@/utils/types/stock-budget-type";
import { Page } from "@/utils/types/page";

export const useDashboardPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [requests, setRequests] = useState<StockRequest[]>([]);
    const [po, setPo] = useState<StockPo[]>([]);
    const [departments, setDepartments] = useState<StockDepartment[]>([]);
    const [budgetList, setBudgetList] = useState<StockBudgetList[]>([]);
    const [budgetType, setBudgetType] = useState<StockBudgetType[]>([]);
    const [budgets, setBudgets] = useState<StockBudget[]>([]);
    const [budgetPage, setBudgetPage] = useState<Page<StockBudget> | null>(null);

    const [budgetPageIndex, setBudgetPageIndex] = useState(0);
    const pageSize = 15;


    const fetchData = async () => {
        try {
            const [reqData, poData, deptData, listData, budgetTypeData] = await Promise.all([
                getStockRequests(),
                getStockPo(),
                getStockDepartments(),
                getStockBudgetList(),
                getStockBudgetType(),
            ]);
            setRequests(reqData);
            setPo(poData);
            setDepartments(deptData);
            setBudgetList(listData);
            setBudgetType(budgetTypeData);
            setError(null);
        } catch {
            setError("Failed to load requests");
        } finally {
            setLoading(false);
        }
    };


    const fetchPaginatedBudgets = async () => {
        try {
            const pageData = await getStockBugetsByPageTable(budgetPageIndex, pageSize);
            setBudgets(pageData.content);
            setBudgetPage(pageData);
        } catch (err) {
            console.error("Error fetching paginated stock budgets", err);
        }
    };

    useEffect(() => {
        fetchPaginatedBudgets();
    }, [budgetPageIndex]);

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
        budgetPage,
        budgetPageIndex,
        setBudgetPageIndex,
        fetchPaginatedBudgets,
        setRequests,
        setPo,
        setDepartments,
        setBudgetList,
        setBudgets,
    };
};
