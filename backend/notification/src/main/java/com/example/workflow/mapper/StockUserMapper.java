package com.example.workflow.mapper;

import com.example.workflow.dto.StockUserDto;
import com.example.workflow.model.Role;
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
        dto.setFirstName(stockUser.getFirstName());
        dto.setLastName(stockUser.getLastName());
        dto.setEmail(stockUser.getEmail());
        dto.setPassword(stockUser.getPassword());
        dto.setRole(stockUser.getRole() != null ? stockUser.getRole().name() : null); // Convert Role enum to String
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
        stockUser.setFirstName(stockUserDto.getFirstName());
        stockUser.setLastName(stockUserDto.getLastName());
        stockUser.setEmail(stockUserDto.getEmail());
        stockUser.setPassword(stockUserDto.getPassword());
        stockUser.setRole(stockUserDto.getRole() != null ? Role.valueOf(stockUserDto.getRole()) : null); // Convert String to Role enum
        return stockUser;
    }
}
