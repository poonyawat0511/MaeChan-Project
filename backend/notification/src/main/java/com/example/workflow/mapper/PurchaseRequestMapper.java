package com.example.workflow.mapper;

import java.math.BigDecimal;

import com.example.workflow.dto.PurchaseRequestDto;
import com.example.workflow.model.PurchaseRequest;

public class PurchaseRequestMapper {

    // Method for mapping from PurchaseRequest to PurchaseRequestDto
    public static PurchaseRequestDto mapToPurchaseRequestDto(PurchaseRequest purchaseRequest) {
        if (purchaseRequest == null) {
            return null;
        }

        PurchaseRequestDto dto = new PurchaseRequestDto();
        dto.setId(purchaseRequest.getId());
        dto.setRowNumber(purchaseRequest.getRowNumber());
        dto.setDocumentNumber(purchaseRequest.getDocumentNumber());
        dto.setMainInventory(purchaseRequest.getMainInventory());
        dto.setRequestType(purchaseRequest.getRequestType());
        dto.setItem(purchaseRequest.getItem());
        dto.setItemCount(purchaseRequest.getItemCount());
        dto.setItemPrice(purchaseRequest.getItemPrice().doubleValue());
        dto.setSumPrice(purchaseRequest.getSumPrice().doubleValue());
        dto.setBudgetReceived(purchaseRequest.getBudgetReceived().doubleValue());
        dto.setBudgetUsed(purchaseRequest.getBudgetUsed().doubleValue());
        dto.setBudgetLeft(purchaseRequest.getBudgetLeft().doubleValue());
        dto.setBuyingMethod(purchaseRequest.getBuyingMethod());
        dto.setBudgetType(purchaseRequest.getBudgetType());
        dto.setRequester(purchaseRequest.getRequester());
        dto.setCreateDate(purchaseRequest.getCreateDate());
        dto.setDueDate(purchaseRequest.getDueDate());
        dto.setInspector(purchaseRequest.getInspector());
        dto.setInspectStatus(purchaseRequest.getInspectStatus());
        dto.setApprover(purchaseRequest.getApprover());
        dto.setApprovedStatus(purchaseRequest.getApprovedStatus());
        dto.setApprovedDate(purchaseRequest.getApprovedDate());
        dto.setBuyingDocStatus(purchaseRequest.getBuyingDocStatus());
        dto.setBuyingDocNumber(purchaseRequest.getBuyingDocNumber());

        return dto;
    }

    // Method for mapping from PurchaseRequestDto to PurchaseRequest
    public static PurchaseRequest mapToPurchaseRequest(PurchaseRequestDto purchaseRequestDto) {
        if (purchaseRequestDto == null) {
            return null;
        }

        PurchaseRequest purchaseRequest = new PurchaseRequest();
        purchaseRequest.setId(purchaseRequestDto.getId());
        purchaseRequest.setRowNumber(purchaseRequestDto.getRowNumber());
        purchaseRequest.setDocumentNumber(purchaseRequestDto.getDocumentNumber());
        purchaseRequest.setMainInventory(purchaseRequestDto.getMainInventory());
        purchaseRequest.setRequestType(purchaseRequestDto.getRequestType());
        purchaseRequest.setItem(purchaseRequestDto.getItem());
        purchaseRequest.setItemCount(purchaseRequestDto.getItemCount());
        purchaseRequest.setItemPrice(BigDecimal.valueOf(purchaseRequestDto.getItemPrice()));
        purchaseRequest.setSumPrice(BigDecimal.valueOf(purchaseRequestDto.getSumPrice()));
        purchaseRequest.setBudgetReceived(BigDecimal.valueOf(purchaseRequestDto.getBudgetReceived()));
        purchaseRequest.setBudgetUsed(BigDecimal.valueOf(purchaseRequestDto.getBudgetUsed()));
        purchaseRequest.setBudgetLeft(BigDecimal.valueOf(purchaseRequestDto.getBudgetLeft()));
        purchaseRequest.setBuyingMethod(purchaseRequestDto.getBuyingMethod());
        purchaseRequest.setBudgetType(purchaseRequestDto.getBudgetType());
        purchaseRequest.setRequester(purchaseRequestDto.getRequester());
        purchaseRequest.setCreateDate(purchaseRequestDto.getCreateDate());
        purchaseRequest.setDueDate(purchaseRequestDto.getDueDate());
        purchaseRequest.setInspector(purchaseRequestDto.getInspector());
        purchaseRequest.setInspectStatus(purchaseRequestDto.getInspectStatus());
        purchaseRequest.setApprover(purchaseRequestDto.getApprover());
        purchaseRequest.setApprovedStatus(purchaseRequestDto.getApprovedStatus());
        purchaseRequest.setApprovedDate(purchaseRequestDto.getApprovedDate());
        purchaseRequest.setBuyingDocStatus(purchaseRequestDto.getBuyingDocStatus());
        purchaseRequest.setBuyingDocNumber(purchaseRequestDto.getBuyingDocNumber());

        return purchaseRequest;
    }
}
