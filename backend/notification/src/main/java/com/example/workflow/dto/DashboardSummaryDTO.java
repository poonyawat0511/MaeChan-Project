package com.example.workflow.dto;

import java.util.List;
import java.util.Map;

import lombok.Data;

@Data
public class DashboardSummaryDTO {
    private double monthlyPurchases;
    private List<Map<String, Object>> formattedInventoryData;
    private List<Map<String, Object>> formattedWarehouseData;
    private List<Map<String, Object>> filteredDepartmentData;
    private List<Map<String, Object>> prPoData;
    private int totalStockRequests;
    private double totalStockRequestValue;
    private double avgStockRequestValue;
    private double highestStockRequest;

    private int totalStockPo;
    private double totalStockPoValue;
    private double avgStockPoValue;
    private double highestStockPo;

    private double poPrRatio;
    private double budgetSaved;
    private String avgProcessingTime;
    private int pendingPr;

    private double totalBudgetListValue;
    private double totalBudgetUsed;
    private double totalBudgetRemain;
}
