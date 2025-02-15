package com.example.workflow.delegate;

import java.util.Optional;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.workflow.model.SpringRequest;
import com.example.workflow.model.StockRequest;
import com.example.workflow.model.StockUser;
import com.example.workflow.repository.StockUserRepository;
import com.example.workflow.service.SpringRequestService;
import com.example.workflow.service.StockRequestService;

@Service("updateApprovalHandler")
public class UpdateApprovalHandler implements JavaDelegate {

    @Autowired
    private StockRequestService stockRequestService;

    @Autowired
    private SpringRequestService springRequestService;

    @Autowired
    private StockUserRepository stockUserRepository;

    @Override
    public void execute(DelegateExecution execution) throws Exception {
        // ดึง Workflow Variables
        String requestIdStr = (String) execution.getVariable("requestId");
        String stockUserApproveId = (String) execution.getVariable("stockUserApprove");
        Boolean requestComplete = (Boolean) execution.getVariable("requestComplete");

        // ตรวจสอบและแปลง purchaseId
        Long requestId = validateAndParseRequestId(requestIdStr);

        // ค้นหา springRequest
        SpringRequest springRequest = springRequestService.getSpringRequestById(requestId);
        if (springRequest == null) {
            throw new RuntimeException("StockRequest not found with id: " + requestId);
        }

        // ค้นหา StockUser 
        Optional<StockUser> stockUser = stockUserRepository.findById(Long.parseLong(stockUserApproveId));
        if (stockUser == null) {
            throw new RuntimeException("StockUser not found with id: " + stockUserApproveId);
        }

        //update springRequest
        springRequest.setUserApprove(stockUser.get());
        springRequest.setApproverApproveStatus(requestComplete);
        springRequestService.updateSpringRequest(requestId, springRequest);

        //update stockRequest
        StockRequest stockRequest = stockRequestService.findStockRequestById(springRequest.getStockRequest().getId());
        //Long
        stockRequest.setStockUserApprove(stockUser.get().getStockUserId());
        stockRequest.setStockSubjectPerson("ผู้อำนวยการโรงพยาบาลแม่จัน");
        if (requestComplete != true) {

            stockRequest.setRequestComplete(false);
        }
        stockRequest.setRequestComplete(requestComplete);
        stockRequestService.updateStockRequest(stockRequest);
    }

    private Long validateAndParseRequestId(String requestIdStr) {
        try {
            if (requestIdStr != null && !requestIdStr.isEmpty()) {
                return Long.parseLong(requestIdStr);
            }
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid requestId format: " + requestIdStr);
        }
        throw new IllegalArgumentException("requestId must not be null or empty.");
    }
}
