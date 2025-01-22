package com.example.workflow.delegate;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.workflow.model.StockRequest;
import com.example.workflow.service.StockRequestService;

@Service("updateDirectorHandler")
public class UpdateDirectorHandler implements JavaDelegate {

    @Autowired
    private StockRequestService stockRequestService;

    @Override
    public void execute(DelegateExecution execution) throws Exception {
        // ดึง Workflow Variables
        String requestIdStr = (String) execution.getVariable("requestId");
        String stockSubjectPerson = (String) execution.getVariable("stockSubjectPerson");
        Boolean approve = (Boolean) execution.getVariable("approve");

        // ตรวจสอบและแปลง purchaseId
        Long requestId = validateAndParseRequestId(requestIdStr);

        // ค้นหา PurchaseRequest
        StockRequest stockRequest = stockRequestService.findStockRequestById(requestId);
        if (stockRequest == null) {
            throw new RuntimeException("StockRequest not found with id: " + requestId);
        }

        // อัปเดตข้อมูล
        stockRequest.setStockSubjectPerson(stockSubjectPerson);;
        stockRequest.setApprove(approve);

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
