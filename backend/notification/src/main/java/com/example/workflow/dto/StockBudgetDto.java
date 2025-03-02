package com.example.workflow.dto;

import com.example.workflow.model.StockBudgetType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StockBudgetDto {
    private Long budgetId;
    private String budgetName;
    private boolean budgetStatus;
    private StockBudgetType stockBudgetTypeId;
    private Long accPoBudgetSubTypeId;
}
