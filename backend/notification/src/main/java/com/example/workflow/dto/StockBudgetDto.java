package com.example.workflow.dto;

import lombok.Data;

@Data
public class StockBudgetDto {
    private Long id;
    private String budgetName;
    private boolean budgetStatus;
    private Long stockBudgetTypeId;
    private Long accPoBudgetSubTypeId;
}
