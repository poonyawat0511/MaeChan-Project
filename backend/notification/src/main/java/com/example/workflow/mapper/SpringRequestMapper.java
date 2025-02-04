package com.example.workflow.mapper;

import com.example.workflow.dto.SpringRequestDto;
import com.example.workflow.model.SpringRequest;
import com.example.workflow.model.StockUser;
import org.springframework.stereotype.Component;

@Component
public class SpringRequestMapper {

    public SpringRequestDto toDTO(SpringRequest springRequest) {
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

    public SpringRequest toEntity(SpringRequestDto dto) {
        SpringRequest springRequest = new SpringRequest();
        springRequest.setId(dto.getId());
        springRequest.setStockRequest(dto.getStockRequest());
        springRequest.setCamundaTaskId(dto.getCamundaTaskId());
        springRequest.setUserApprove(dto.getUserApprove());
        springRequest.setApproverApproveStatus(dto.getApproverApproveStatus());
        springRequest.setUserDirector(dto.getUserDirector());
        springRequest.setDirectorApproveStatus(dto.getDirectorApproveStatus());
        springRequest.setDirectorApproveDate(dto.getDirectorApproveDate());
        springRequest.setAllCompleteStatus(dto.getAllCompleteStatus());
        return springRequest;
    }

}
