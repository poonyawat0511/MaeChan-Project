package com.example.workflow.mapper;

import com.example.workflow.dto.StockUserApproveDto;
import com.example.workflow.model.StockUserApprove;

public class StockUserApproveMapper {

    // Method for mapping from StockUserApprove to StockUserApproveDto
    public static StockUserApproveDto mapToStockUserApproveDto(StockUserApprove stockUserApprove) {
        if (stockUserApprove == null) {
            return null;
        }

        StockUserApproveDto dto = new StockUserApproveDto();
        dto.setStockUserApproveId(stockUserApprove.getStockUserApproveId());
        dto.setStockUserApproveName(stockUserApprove.getStockUserApproveName());
        return dto;
    }

    // Method for mapping from StockUserApproveDto to StockUserApprove
    public static StockUserApprove mapToStockUserApprove(StockUserApproveDto stockUserApproveDto) {
        if (stockUserApproveDto == null) {
            return null;
        }

        StockUserApprove stockUserApprove = new StockUserApprove();
        stockUserApprove.setStockUserApproveId(stockUserApproveDto.getStockUserApproveId());
        stockUserApprove.setStockUserApproveName(stockUserApproveDto.getStockUserApproveName());
        return stockUserApprove;
    }
}
