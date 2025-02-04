package com.example.workflow.mapper;

import com.example.workflow.dto.StockUserDto;
import com.example.workflow.model.Role;
import com.example.workflow.model.StockUser;

public class StockUserMapper {

    public static StockUserDto mapToStockUserDto(StockUser stockUser) {
        if (stockUser == null) {
            return null;
        }

        StockUserDto dto = new StockUserDto();
        dto.setStockUserId(stockUser.getStockUserId());
        dto.setSignature(stockUser.getSignaturePath());
        dto.setUserHospitalId(stockUser.getUserHospitalId());
        dto.setLineId(stockUser.getLineId());
        dto.setFirstName(stockUser.getFirstName());
        dto.setLastName(stockUser.getLastName());
        dto.setEmail(stockUser.getEmail());
        dto.setPassword(stockUser.getPassword());
        dto.setRole(stockUser.getRole() != null ? stockUser.getRole().name() : null);
        return dto;
    }

    public static StockUser mapToStockUser(StockUserDto stockUserDto) {
        if (stockUserDto == null) {
            return null;
        }

        StockUser stockUser = new StockUser();
        stockUser.setStockUserId(stockUserDto.getStockUserId());
        stockUser.setLineId(stockUserDto.getLineId());
        stockUser.setSignaturePath(stockUserDto.getSignature());
        stockUser.setUserHospitalId(stockUserDto.getUserHospitalId());
        stockUser.setFirstName(stockUserDto.getFirstName());
        stockUser.setLastName(stockUserDto.getLastName());
        stockUser.setEmail(stockUserDto.getEmail());
        stockUser.setPassword(stockUserDto.getPassword());
        stockUser.setRole(stockUserDto.getRole() != null ? Role.valueOf(stockUserDto.getRole()) : null);
        return stockUser;
    }
}
