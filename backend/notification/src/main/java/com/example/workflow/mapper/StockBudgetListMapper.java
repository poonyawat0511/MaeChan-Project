package com.example.workflow.mapper;

import org.springframework.stereotype.Component;

import com.example.workflow.dto.StockBudgetListDto;
import com.example.workflow.model.StockBudgetList;

@Component
public class StockBudgetListMapper {

    public StockBudgetListDto toDto(StockBudgetList stockBudgetList) {
        StockBudgetListDto dto = new StockBudgetListDto();
        dto.setStockBudgetListId(stockBudgetList.getStockBudgetListId());
        dto.setBudgetId(stockBudgetList.getBudgetId());
        dto.setStockBudgetYear(stockBudgetList.getStockBudgetYear());
        dto.setStockBudgetPrice(stockBudgetList.getStockBudgetPrice());
        dto.setStockBudgetRemain(stockBudgetList.getStockBudgetRemain());
        dto.setStockBudgetUse(stockBudgetList.getStockBudgetUse());
        dto.setStockBudgetRcvPrice(stockBudgetList.getStockBudgetRcvPrice());
        return dto;
    }

    public StockBudgetList toEntity(StockBudgetListDto dto) {
        StockBudgetList stockBudgetList = new StockBudgetList();
        stockBudgetList.setStockBudgetListId(dto.getStockBudgetListId());
        stockBudgetList.setBudgetId(dto.getBudgetId());
        stockBudgetList.setStockBudgetYear(dto.getStockBudgetYear());
        stockBudgetList.setStockBudgetPrice(dto.getStockBudgetPrice());
        stockBudgetList.setStockBudgetRemain(dto.getStockBudgetRemain());
        stockBudgetList.setStockBudgetUse(dto.getStockBudgetUse());
        stockBudgetList.setStockBudgetRcvPrice(dto.getStockBudgetRcvPrice());
        return stockBudgetList;
    }
}
