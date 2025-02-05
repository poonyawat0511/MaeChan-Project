package com.example.workflow.mapper;

import java.math.BigDecimal;

import com.example.workflow.dto.StockRequestDto;
import com.example.workflow.model.StockRequest;

public class StockRequestMapper {

    // Method for mapping from StockRequest to StockRequestDto
    public static StockRequestDto mapToStockRequestDto(StockRequest stockRequest) {
        if (stockRequest == null) {
            return null;
        }

        StockRequestDto dto = new StockRequestDto();
        dto.setId(stockRequest.getId());
        dto.setRequestId(stockRequest.getRequestId());
        dto.setRequestDate(stockRequest.getRequestDate());
        dto.setRequestNo(stockRequest.getRequestNo());
        dto.setRequestReceiveDate(stockRequest.getRequestReceiveDate());
        dto.setRequestWarehouseId(stockRequest.getRequestWarehouseId());
        dto.setRequestComplete(stockRequest.getRequestComplete());
        dto.setUseDate(stockRequest.getUseDate());
        dto.setStockPoId(stockRequest.getStockPoId());
        dto.setHosGuid(stockRequest.getHosGuid());
        dto.setBudgetYear(stockRequest.getBudgetYear());
        dto.setStockSubject(stockRequest.getStockSubject());
        dto.setStockSubjectPerson(stockRequest.getStockSubjectPerson());
        dto.setSupplierId(stockRequest.getSupplierId());
        dto.setDepartmentId(stockRequest.getDepartmentId());
        dto.setNote(stockRequest.getNote());
        dto.setTransportDay(stockRequest.getTransportDay());
        dto.setBudgetId(stockRequest.getBudgetId());
        dto.setRunNumber(stockRequest.getRunNumber());
        dto.setNumberYear(stockRequest.getNumberYear());
        dto.setNumberMonth(stockRequest.getNumberMonth());
        dto.setStockRequestDocId(stockRequest.getStockRequestDocId());
        dto.setProjectId(stockRequest.getProjectId());
        dto.setStockUserApprove(stockRequest.getStockUserApprove());
        dto.setStockApproveDate(stockRequest.getStockApproveDate());
        dto.setStockUser(stockRequest.getStockUser());
        dto.setStockRequestDocumentId(stockRequest.getStockRequestDocumentId());
        dto.setProjectPlanId(stockRequest.getProjectPlanId());
        dto.setRequestAllComplete(stockRequest.getRequestAllComplete());
        dto.setBudgetRunNo(stockRequest.getBudgetRunNo());
        dto.setApprove(stockRequest.getApprove());
        dto.setRequestTagNo(stockRequest.getRequestTagNo());
        dto.setRequestTime(stockRequest.getRequestTime());
        dto.setPurchaseType(stockRequest.getPurchaseType());
        dto.setStockBudgetTotal(stockRequest.getStockBudgetTotal().doubleValue());
        dto.setStockBudgetUse(stockRequest.getStockBudgetUse().doubleValue());
        dto.setStockBudgetRemain(stockRequest.getStockBudgetRemain().doubleValue());
        dto.setTrimester(stockRequest.getTrimester());
        dto.setVatPercent(stockRequest.getVatPercent().doubleValue());
        dto.setRequestReason(stockRequest.getRequestReason());
        dto.setRequestTotalPrice(stockRequest.getRequestTotalPrice().doubleValue());
        dto.setRequestItemCount(stockRequest.getRequestItemCount());
        dto.setStockBudgetPrUse(stockRequest.getStockBudgetPrUse().doubleValue());
        dto.setStockBudgetPrRemain(stockRequest.getStockBudgetPrRemain().doubleValue());
        dto.setOfficerList(stockRequest.getOfficerList());
        dto.setStockPoNoList(stockRequest.getStockPoNoList());
        dto.setStockBudgetTypeId(stockRequest.getStockBudgetTypeId());
        dto.setDepRequestNoList(stockRequest.getDepRequestNoList());

        return dto;
    }

    // Method for mapping from StockRequestDto to StockRequest
    public static StockRequest mapToStockRequest(StockRequestDto stockRequestDto) {
        if (stockRequestDto == null) {
            return null;
        }

        StockRequest stockRequest = new StockRequest();
        stockRequest.setId(stockRequestDto.getId());
        stockRequest.setRequestId(stockRequestDto.getRequestId());
        stockRequest.setRequestDate(stockRequestDto.getRequestDate());
        stockRequest.setRequestNo(stockRequestDto.getRequestNo());
        stockRequest.setRequestReceiveDate(stockRequestDto.getRequestReceiveDate());
        stockRequest.setRequestWarehouseId(stockRequestDto.getRequestWarehouseId());
        stockRequest.setRequestComplete(stockRequestDto.getRequestComplete());
        stockRequest.setUseDate(stockRequestDto.getUseDate());
        stockRequest.setStockPoId(stockRequestDto.getStockPoId());
        stockRequest.setHosGuid(stockRequestDto.getHosGuid());
        stockRequest.setBudgetYear(stockRequestDto.getBudgetYear());
        stockRequest.setStockSubject(stockRequestDto.getStockSubject());
        stockRequest.setStockSubjectPerson(stockRequestDto.getStockSubjectPerson());
        stockRequest.setSupplierId(stockRequestDto.getSupplierId());
        stockRequest.setDepartmentId(stockRequestDto.getDepartmentId());
        stockRequest.setNote(stockRequestDto.getNote());
        stockRequest.setTransportDay(stockRequestDto.getTransportDay());
        stockRequest.setBudgetId(stockRequestDto.getBudgetId());
        stockRequest.setRunNumber(stockRequestDto.getRunNumber());
        stockRequest.setNumberYear(stockRequestDto.getNumberYear());
        stockRequest.setNumberMonth(stockRequestDto.getNumberMonth());
        stockRequest.setStockRequestDocId(stockRequestDto.getStockRequestDocId());
        stockRequest.setProjectId(stockRequestDto.getProjectId());
        stockRequest.setStockUserApprove(stockRequestDto.getStockUserApprove());
        stockRequest.setStockApproveDate(stockRequestDto.getStockApproveDate());
        stockRequest.setStockUser(stockRequestDto.getStockUser());
        stockRequest.setStockRequestDocumentId(stockRequestDto.getStockRequestDocumentId());
        stockRequest.setProjectPlanId(stockRequestDto.getProjectPlanId());
        stockRequest.setRequestAllComplete(stockRequestDto.getRequestAllComplete());
        stockRequest.setBudgetRunNo(stockRequestDto.getBudgetRunNo());
        stockRequest.setApprove(stockRequestDto.getApprove());
        stockRequest.setRequestTagNo(stockRequestDto.getRequestTagNo());
        stockRequest.setRequestTime(stockRequestDto.getRequestTime());
        stockRequest.setPurchaseType(stockRequestDto.getPurchaseType());
        stockRequest.setStockBudgetTotal(BigDecimal.valueOf(stockRequestDto.getStockBudgetTotal()));
        stockRequest.setStockBudgetUse(BigDecimal.valueOf(stockRequestDto.getStockBudgetUse()));
        stockRequest.setStockBudgetRemain(BigDecimal.valueOf(stockRequestDto.getStockBudgetRemain()));
        stockRequest.setTrimester(stockRequestDto.getTrimester());
        stockRequest.setVatPercent(BigDecimal.valueOf(stockRequestDto.getVatPercent()));
        stockRequest.setRequestReason(stockRequestDto.getRequestReason());
        stockRequest.setRequestTotalPrice(BigDecimal.valueOf(stockRequestDto.getRequestTotalPrice()));
        stockRequest.setRequestItemCount(stockRequestDto.getRequestItemCount());
        stockRequest.setStockBudgetPrUse(BigDecimal.valueOf(stockRequestDto.getStockBudgetPrUse()));
        stockRequest.setStockBudgetPrRemain(BigDecimal.valueOf(stockRequestDto.getStockBudgetPrRemain()));
        stockRequest.setOfficerList(stockRequestDto.getOfficerList());
        stockRequest.setStockPoNoList(stockRequestDto.getStockPoNoList());
        stockRequest.setStockBudgetTypeId(stockRequestDto.getStockBudgetTypeId());
        stockRequest.setDepRequestNoList(stockRequestDto.getDepRequestNoList());

        return stockRequest;
    }
}
