package com.example.workflow.delegate;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.workflow.model.StockRequest;
import com.example.workflow.model.StockUserApprove;
import com.example.workflow.repository.StockUserApproveRepository;
import com.example.workflow.service.StockRequestService;

@Service("updateApprovalHandler")
public class UpdateApprovalHandler implements JavaDelegate {

    @Autowired
    private StockRequestService stockRequestService;

    @Autowired
    private StockUserApproveRepository stockUserApproveRepository;

    @Override
    public void execute(DelegateExecution execution) throws Exception {
        // ดึง Workflow Variables
        String requestIdStr = (String) execution.getVariable("requestId");
        String stockUserApproveId = (String) execution.getVariable("stockUserApprove");

        // ตรวจสอบและแปลง purchaseId
        Long requestId = validateAndParseRequestId(requestIdStr);

        // TODO change to springRequest
        // ค้นหา StockRequest
        StockRequest stockRequest = stockRequestService.findStockRequestById(requestId);
        if (stockRequest == null) {
            throw new RuntimeException("StockRequest not found with id: " + requestId);
        }

        // TODO change to stockUser
        // ค้นหา StockUserApprove ตาม stockUserApproveId
        StockUserApprove stockUserApprove = stockUserApproveRepository.findById(Long.parseLong(stockUserApproveId))
                .orElseThrow(() -> new RuntimeException("StockUserApprove not found with id: " + stockUserApproveId));

        // TODO เขียนลง springRequest กับ stockRequest
        // 

        // อัปเดตข้อมูล
        stockRequest.setStockUserApprove(stockUserApprove);

        // บันทึก
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
