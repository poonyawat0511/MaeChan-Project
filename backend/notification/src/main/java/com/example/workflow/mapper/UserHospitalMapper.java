package com.example.workflow.mapper;

import com.example.workflow.dto.UserHospitalDto;
import com.example.workflow.model.Role;
import com.example.workflow.model.UserHospital;

public class UserHospitalMapper {

    public static UserHospitalDto mapToStockUserDto(UserHospital userHospital) {
        if (userHospital == null) {
            return null;
        }

        UserHospitalDto dto = new UserHospitalDto();
        dto.setId(userHospital.getId());
        dto.setSignature(userHospital.getSignaturePath());
        dto.setStockUserId(userHospital.getStockUserId());
        dto.setLineId(userHospital.getLineId());
        dto.setFirstName(userHospital.getFirstName());
        dto.setLastName(userHospital.getLastName());
        dto.setEmail(userHospital.getEmail());
        dto.setPassword(userHospital.getPassword());
        dto.setRole(userHospital.getRole() != null ? userHospital.getRole().name() : null);
        return dto;
    }

    public static UserHospital mapToStockUser(UserHospitalDto userHospitalDto) {
        if (userHospitalDto == null) {
            return null;
        }

        UserHospital userHospital = new UserHospital();
        userHospital.setId(userHospitalDto.getId());
        userHospital.setLineId(userHospitalDto.getLineId());
        userHospital.setSignaturePath(userHospitalDto.getSignature());
        userHospital.setStockUserId(userHospitalDto.getStockUserId());
        userHospital.setFirstName(userHospitalDto.getFirstName());
        userHospital.setLastName(userHospitalDto.getLastName());
        userHospital.setEmail(userHospitalDto.getEmail());
        userHospital.setPassword(userHospitalDto.getPassword());
        userHospital.setRole(userHospitalDto.getRole() != null ? Role.valueOf(userHospitalDto.getRole()) : null);
        return userHospital;
    }
}
