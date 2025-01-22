package com.example.workflow.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.workflow.model.StockRequest;
import com.example.workflow.repository.StockRequestRepository;


@Service
public class StockRequestService {

    @Autowired
    private StockRequestRepository stockRequestRepository;

    // crud
    public StockRequest createStockRequest(StockRequest stockRequest) {
        return stockRequestRepository.save(stockRequest);
    }

    public List<StockRequest> findAllStockRequest() {
        return stockRequestRepository.findAll();
    }

    public StockRequest findStockRequestById(Long requestId) {
        Optional<StockRequest> purchaseRequest = stockRequestRepository.findById(requestId);
        return purchaseRequest.orElse(null);
    }

    public StockRequest updateStockRequest(StockRequest updatedStockRequest) {
        return stockRequestRepository.findById(updatedStockRequest.getId()).map(existingStockRequest -> {
            existingStockRequest.setRequestId(updatedStockRequest.getRequestId());
            existingStockRequest.setRequestDate(updatedStockRequest.getRequestDate());
            existingStockRequest.setRequestNo(updatedStockRequest.getRequestNo());
            existingStockRequest.setRequestReceiveDate(updatedStockRequest.getRequestReceiveDate());
            existingStockRequest.setRequestWarehouseId(updatedStockRequest.getRequestWarehouseId());
            existingStockRequest.setRequestComplete(updatedStockRequest.getRequestComplete());
            existingStockRequest.setUseDate(updatedStockRequest.getUseDate());
            existingStockRequest.setStockPoId(updatedStockRequest.getStockPoId());
            existingStockRequest.setHosGuid(updatedStockRequest.getHosGuid());
            existingStockRequest.setBudgetYear(updatedStockRequest.getBudgetYear());
            existingStockRequest.setStockSubject(updatedStockRequest.getStockSubject());
            existingStockRequest.setStockSubjectPerson(updatedStockRequest.getStockSubjectPerson());
            existingStockRequest.setSupplierId(updatedStockRequest.getSupplierId());
            existingStockRequest.setDepartmentId(updatedStockRequest.getDepartmentId());
            existingStockRequest.setNote(updatedStockRequest.getNote());
            existingStockRequest.setTransportDay(updatedStockRequest.getTransportDay());
            existingStockRequest.setBudgetId(updatedStockRequest.getBudgetId());
            existingStockRequest.setRunNumber(updatedStockRequest.getRunNumber());
            existingStockRequest.setNumberYear(updatedStockRequest.getNumberYear());
            existingStockRequest.setNumberMonth(updatedStockRequest.getNumberMonth());
            existingStockRequest.setStockRequestDocId(updatedStockRequest.getStockRequestDocId());
            existingStockRequest.setProjectId(updatedStockRequest.getProjectId());
            existingStockRequest.setStockUserApprove(updatedStockRequest.getStockUserApprove());
            existingStockRequest.setStockApproveDate(updatedStockRequest.getStockApproveDate());
            existingStockRequest.setStockUser(updatedStockRequest.getStockUser());
            existingStockRequest.setStockRequestDocumentId(updatedStockRequest.getStockRequestDocumentId());
            existingStockRequest.setProjectPlanId(updatedStockRequest.getProjectPlanId());
            existingStockRequest.setRequestAllComplete(updatedStockRequest.getRequestAllComplete());
            existingStockRequest.setBudgetRunNo(updatedStockRequest.getBudgetRunNo());
            existingStockRequest.setApprove(updatedStockRequest.getApprove());
            existingStockRequest.setRequestTagNo(updatedStockRequest.getRequestTagNo());
            existingStockRequest.setRequestTime(updatedStockRequest.getRequestTime());
            existingStockRequest.setPurchaseType(updatedStockRequest.getPurchaseType());
            existingStockRequest.setStockBudgetTotal(updatedStockRequest.getStockBudgetTotal());
            existingStockRequest.setStockBudgetUse(updatedStockRequest.getStockBudgetUse());
            existingStockRequest.setStockBudgetRemain(updatedStockRequest.getStockBudgetRemain());
            existingStockRequest.setTrimester(updatedStockRequest.getTrimester());
            existingStockRequest.setVatPercent(updatedStockRequest.getVatPercent());
            existingStockRequest.setRequestReason(updatedStockRequest.getRequestReason());
            existingStockRequest.setRequestTotalPrice(updatedStockRequest.getRequestTotalPrice());
            existingStockRequest.setRequestItemCount(updatedStockRequest.getRequestItemCount());
            existingStockRequest.setStockBudgetPrUse(updatedStockRequest.getStockBudgetPrUse());
            existingStockRequest.setStockBudgetPrRemain(updatedStockRequest.getStockBudgetPrRemain());
            existingStockRequest.setOfficerList(updatedStockRequest.getOfficerList());
            existingStockRequest.setStockPoNoList(updatedStockRequest.getStockPoNoList());
            existingStockRequest.setStockBudgetTypeId(updatedStockRequest.getStockBudgetTypeId());
            existingStockRequest.setDepRequestNoList(updatedStockRequest.getDepRequestNoList());
            existingStockRequest.setCamundaTaskId(updatedStockRequest.getCamundaTaskId());
    
            return stockRequestRepository.save(existingStockRequest);
        }).orElseThrow(() -> new RuntimeException("StockRequest not found with id: " + updatedStockRequest.getId()));
    }
    

    public String deleteStockRequestById(Long requestId) {
        stockRequestRepository.deleteById(requestId);
        return "StockRequest id:" + requestId + " has been deleted";
    }

    public StockRequest findStockRequestByCamundaTaskId(String taskId) {
        Optional<StockRequest> purchaseRequest = stockRequestRepository.findStockRequestByCamundaTaskId(taskId);
        return purchaseRequest.orElse(null);
    }

}
