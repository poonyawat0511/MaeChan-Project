package com.example.workflow.mapper;

import com.example.workflow.dto.StockUserDto;
import com.example.workflow.model.StockUser;

public class StockUserMapper {

    // Method for mapping from StockUser to StockUserDto
    public static StockUserDto mapToStockUserDto(StockUser stockUser) {
        if (stockUser == null) {
            return null;
        }

        StockUserDto dto = new StockUserDto();
        dto.setStockUserId(stockUser.getStockUserId());
        dto.setStockUserName(stockUser.getStockUserName());
        return dto;
    }

    // Method for mapping from StockUserDto to StockUser
    public static StockUser mapToStockUser(StockUserDto stockUserDto) {
        if (stockUserDto == null) {
            return null;
        }

        StockUser stockUser = new StockUser();
        stockUser.setStockUserId(stockUserDto.getStockUserId());
        stockUser.setStockUserName(stockUserDto.getStockUserName());
        return stockUser;
    }
}
