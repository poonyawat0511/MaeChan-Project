package com.example.workflow.dto;

import java.math.BigDecimal;

import com.example.workflow.model.StockBudget;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StockBudgetListDto {
    private Long stockBudgetListId;
    private StockBudget budgetId;
    private String stockBudgetYear;
    private BigDecimal stockBudgetPrice;
    private BigDecimal stockBudgetRemain;
    private BigDecimal stockBudgetUse;
    private BigDecimal stockBudgetRcvPrice;
}
