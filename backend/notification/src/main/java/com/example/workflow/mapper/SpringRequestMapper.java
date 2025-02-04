package com.example.workflow.mapper;

import org.springframework.stereotype.Component;

import com.example.workflow.dto.SpringRequestDto;
import com.example.workflow.model.SpringRequest;

@Component
public class SpringRequestMapper {

    public SpringRequestDto toDTO(SpringRequest springRequest) {

        if (springRequest == null){ 
            return null;
        }

        SpringRequestDto dto = new SpringRequestDto();
        dto.setId(springRequest.getId());
        dto.setStockRequest(springRequest.getStockRequest());
        dto.setCamundaTaskId(springRequest.getCamundaTaskId());
        dto.setUserApprove(springRequest.getUserApprove());
        dto.setApproverApproveStatus(springRequest.getApproverApproveStatus());
        dto.setUserDirector(springRequest.getUserDirector());
        dto.setDirectorApproveStatus(springRequest.getDirectorApproveStatus());
        dto.setDirectorApproveDate(springRequest.getDirectorApproveDate());
        dto.setAllCompleteStatus(springRequest.getAllCompleteStatus());
        return dto;
    }

    public SpringRequest toEntity(SpringRequestDto springRequestDto) {

        if (springRequestDto == null) {
            return null;
        }

        SpringRequest springRequest = new SpringRequest();
        springRequest.setId(springRequestDto.getId());
        springRequest.setStockRequest(springRequestDto.getStockRequest());
        springRequest.setCamundaTaskId(springRequestDto.getCamundaTaskId());
        springRequest.setUserApprove(springRequestDto.getUserApprove());
        springRequest.setApproverApproveStatus(springRequestDto.getApproverApproveStatus());
        springRequest.setUserDirector(springRequestDto.getUserDirector());
        springRequest.setDirectorApproveStatus(springRequestDto.getDirectorApproveStatus());
        springRequest.setDirectorApproveDate(springRequestDto.getDirectorApproveDate());
        springRequest.setAllCompleteStatus(springRequestDto.getAllCompleteStatus());
        return springRequest;
    }

}
