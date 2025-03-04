package com.example.workflow.mapper;

import com.example.workflow.dto.StockUserDto;
import com.example.workflow.model.StockUser;

public class StockUserMapper {

    public static StockUserDto mapToUserHospitalDto(StockUser stockUser) {
        if (stockUser == null) {
            return null;
        }

        StockUserDto dto = new StockUserDto();
        dto.setId(stockUser.getId());
        dto.setFirstName(stockUser.getFirstName());
        dto.setLastName(stockUser.getLastName());
        return dto;
    }

    public static StockUser mapToUserHospital(StockUserDto stockUserDto) {
        if (stockUserDto == null) {
            return null;
        }

        StockUser stockUser = new StockUser();
        stockUser.setId(stockUserDto.getId());
        stockUser.setFirstName(stockUserDto.getFirstName());
        stockUser.setLastName(stockUserDto.getLastName());
        return stockUser;
    }

}
