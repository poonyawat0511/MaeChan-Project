package com.example.workflow.mapper;

import com.example.workflow.dto.SpringRequestDTO;
import com.example.workflow.model.SpringRequest;
import com.example.workflow.model.StockUser;
import org.springframework.stereotype.Component;

@Component
public class SpringRequestMapper {

    public SpringRequestDTO toDTO(SpringRequest springRequest) {
        SpringRequestDTO dto = new SpringRequestDTO();
        dto.setId(springRequest.getId());
        dto.setCamundaTaskId(springRequest.getCamundaTaskId());
        dto.setUserApproveId(springRequest.getUserApprove().getStockUserId());
        dto.setApproverApproveStatus(springRequest.getApproverApproveStatus());
        dto.setUserDirectorId(springRequest.getUserDirector().getStockUserId());
        dto.setDirectorApproveStatus(springRequest.getDirectorApproveStatus());
        dto.setDirectorApproveDate(springRequest.getDirectorApproveDate());
        dto.setAllCompleteStatus(springRequest.getAllCompleteStatus());
        return dto;
    }

    public SpringRequest toEntity(SpringRequestDTO dto) {
        SpringRequest springRequest = new SpringRequest();
        springRequest.setId(dto.getId());
        springRequest.setCamundaTaskId(dto.getCamundaTaskId());
        springRequest.setUserApprove(fetchStockUserById(dto.getUserApproveId()));
        springRequest.setApproverApproveStatus(dto.getApproverApproveStatus());
        springRequest.setUserDirector(fetchStockUserById(dto.getUserDirectorId()));
        springRequest.setDirectorApproveStatus(dto.getDirectorApproveStatus());
        springRequest.setDirectorApproveDate(dto.getDirectorApproveDate());
        springRequest.setAllCompleteStatus(dto.getAllCompleteStatus());
        return springRequest;
    }

    private StockUser fetchStockUserById(Long id) {
        // Implement this method to fetch StockUser by ID
        return new StockUser(); // Placeholder
    }
}
