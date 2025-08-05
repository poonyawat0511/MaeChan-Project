import { useCallback, useEffect, useState } from "react";
import {
    getStockDepartments,
    getStockBudgetType,
    getStockBugetsByPageTable,
    getStockBugetsListByPageTable,
} from "@/utils/services/getApi";
import { Page } from "@/types/page";
import { StockBudget } from "@/types/stock-budget";
import { StockBudgetType } from "@/types/stock-budget-type";
import { StockBudgetList } from "@/types/stock-buget-list";
import { StockDepartment } from "@/types/stock-department";

export const useDashboardPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [departments, setDepartments] = useState<StockDepartment[]>([]);
    const [budgetList, setBudgetList] = useState<StockBudgetList[]>([]);
    const [budgetType, setBudgetType] = useState<StockBudgetType[]>([]);
    const [budgets, setBudgets] = useState<StockBudget[]>([]);
    const [budgetPage, setBudgetPage] = useState<Page<StockBudget> | null>(null);
    const [budgetListPage, setBudgetListPage] = useState<Page<StockBudgetList> | null>(null);
    const [budgetPageIndex, setBudgetPageIndex] = useState(0);
    const [budgetListPageIndex, setBudgetListPageIndex] = useState(0);
    const pageSize = 15;

    const fetchData = async () => {
        try {
            const [deptData, budgetTypeData] = await Promise.all([
                getStockDepartments(),
                getStockBudgetType(),
            ]);
            setDepartments(deptData);
            setBudgetType(budgetTypeData);
            setError(null);
        } catch {
            setError("Failed to load dashboard metadata");
        } finally {
            setLoading(false);
        }
    };

    const fetchPaginatedBudgets = useCallback(async () => {
        try {
            const pageData = await getStockBugetsByPageTable(budgetPageIndex, pageSize);
            setBudgets(pageData.content);
            setBudgetPage(pageData);
        } catch (err) {
            console.error("Error fetching paginated stock budgets", err);
        }
    }, [budgetPageIndex]);


    const fetchPaginatedBudgetList = useCallback(async () => {
        try {
            const pageDate = await getStockBugetsListByPageTable(budgetListPageIndex, pageSize);
            setBudgetList(pageDate.content);
            setBudgetListPage(pageDate);
        } catch (err) {
            console.error("Error fetching paginated stock budgetlist", err);
        }
    }, [budgetListPageIndex]);

    useEffect(() => {
        fetchPaginatedBudgets();
        fetchPaginatedBudgetList();
    }, [fetchPaginatedBudgets, fetchPaginatedBudgetList]);

    useEffect(() => {
        fetchData();
    }, []);

    return {
        loading,
        error,
        departments,
        budgetList,
        budgets,
        budgetType,
        budgetPage,
        budgetListPage,
        budgetPageIndex,
        budgetListPageIndex,
        setBudgetPageIndex,
        setBudgetListPageIndex,
        fetchPaginatedBudgets,
        setDepartments,
        setBudgetList,
        setBudgets,
    };
};
