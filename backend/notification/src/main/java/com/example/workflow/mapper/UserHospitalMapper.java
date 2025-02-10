package com.example.workflow.mapper;

import com.example.workflow.dto.UserHospitalDto;
import com.example.workflow.model.UserHospital;

public class UserHospitalMapper {

    public static UserHospitalDto mapToUserHospitalDto(UserHospital userHospital) {
        if (userHospital == null) {
            return null;
        }

        UserHospitalDto dto = new UserHospitalDto();
        dto.setId(userHospital.getId());
        dto.setFirstName(userHospital.getFirstName());
        dto.setLastName(userHospital.getLastName());
        dto.setHospitalId(userHospital.getHospitalId());
        return dto;
    }

    public static UserHospital mapToUserHospital(UserHospitalDto userHospitalDto) {
        if (userHospitalDto == null) {
            return null;
        }

        UserHospital userHospital = new UserHospital();
        userHospital.setId(userHospitalDto.getId());
        userHospital.setFirstName(userHospitalDto.getFirstName());
        userHospital.setLastName(userHospitalDto.getLastName());
        userHospital.setHospitalId(userHospitalDto.getHospitalId());
        return userHospital;
    }

}
