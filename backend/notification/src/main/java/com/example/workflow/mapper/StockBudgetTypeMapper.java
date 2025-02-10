package com.example.workflow.mapper;

import com.example.workflow.model.StockBudgetType;
import org.springframework.stereotype.Component;

@Component
public class StockBudgetTypeMapper {

    public StockBudgetType toEntity(StockBudgetType dto) {
        StockBudgetType entity = new StockBudgetType();
        entity.setStockBudgetTypeName(dto.getStockBudgetTypeName());
        entity.setAccPoBudgetTypeId(dto.getAccPoBudgetTypeId());
        return entity;
    }

    public StockBudgetType toDto(StockBudgetType entity) {
        StockBudgetType dto = new StockBudgetType();
        dto.setStockBudgetTypeName(entity.getStockBudgetTypeName());
        dto.setAccPoBudgetTypeId(entity.getAccPoBudgetTypeId());
        return dto;
    }
}
