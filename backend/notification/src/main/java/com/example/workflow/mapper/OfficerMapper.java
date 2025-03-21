package com.example.workflow.mapper;

import com.example.workflow.dto.OfficerDto;
import com.example.workflow.model.Officer;

public class OfficerMapper {

    public static OfficerDto mapToOfficerDto(Officer officer) {
        if (officer == null) {
            return null;
        }

        OfficerDto dto = new OfficerDto();
        dto.setOfficerId(officer.getOfficerId());
        dto.setOfficerName(officer.getOfficerName());
        return dto;
    }

    public static Officer mapToOfficer(OfficerDto officerDto) {
        if (officerDto == null) {
            return null;
        }

        Officer officer = new Officer();
        officer.setOfficerId(officerDto.getOfficerId());
        officer.setOfficerName(officerDto.getOfficerName());
        return officer;
    }

}
