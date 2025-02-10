package com.example.workflow.mapper;

import com.example.workflow.dto.StockBudgetDto;
import com.example.workflow.model.StockBudget;
import org.springframework.stereotype.Component;

@Component
public class StockBudgetMapper {

    public StockBudgetDto toDto(StockBudget stockBudget) {
        StockBudgetDto dto = new StockBudgetDto();
        dto.setId(stockBudget.getId());
        dto.setBudgetName(stockBudget.getBudgetName());
        dto.setBudgetStatus(stockBudget.isBudgetStatus());
        dto.setStockBudgetTypeId(stockBudget.getStockBudgetTypeId());
        dto.setAccPoBudgetSubTypeId(stockBudget.getAccPoBudgetSubTypeId());
        return dto;
    }

    public StockBudget toEntity(StockBudgetDto dto) {
        StockBudget stockBudget = new StockBudget();
        stockBudget.setId(dto.getId());
        stockBudget.setBudgetName(dto.getBudgetName());
        stockBudget.setBudgetStatus(dto.isBudgetStatus());
        stockBudget.setStockBudgetTypeId(dto.getStockBudgetTypeId());
        stockBudget.setAccPoBudgetSubTypeId(dto.getAccPoBudgetSubTypeId());
        return stockBudget;
    }
}
