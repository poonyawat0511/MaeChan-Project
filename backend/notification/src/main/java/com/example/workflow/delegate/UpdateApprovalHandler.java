package com.example.workflow.delegate;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.workflow.model.PurchaseRequest;
import com.example.workflow.service.PurchaseRequestservice;

@Service("updateApprovalHandler")
public class UpdateApprovalHandler implements JavaDelegate {

    @Autowired
    private PurchaseRequestservice purchaseRequestService;

    @Override
    public void execute(DelegateExecution execution) throws Exception {
        // ดึง Workflow Variables
        String purchaseIdStr = (String) execution.getVariable("purchaseId");
        String approver = (String) execution.getVariable("approver");
        Boolean approvedStatus = (Boolean) execution.getVariable("approvedStatus");
        String buyingDocStatus = (String) execution.getVariable("buyingDocStatus");

        // ตรวจสอบและแปลง purchaseId
        Long purchaseId = validateAndParsePurchaseId(purchaseIdStr);

        // ค้นหา PurchaseRequest
        PurchaseRequest purchaseRequest = purchaseRequestService.findPurchaseRequestPurchaseRequestById(purchaseId);
        if (purchaseRequest == null) {
            throw new RuntimeException("PurchaseRequest not found with id: " + purchaseId);
        }

        // อัปเดตข้อมูล
        purchaseRequest.setApprover(approver);
        purchaseRequest.setApprovedStatus(approvedStatus);
        purchaseRequest.setBuyingDocStatus(buyingDocStatus);

        // บันทึก
        purchaseRequestService.updatePurchaseRequest(purchaseRequest);
    }

    private Long validateAndParsePurchaseId(String purchaseIdStr) {
        try {
            if (purchaseIdStr != null && !purchaseIdStr.isEmpty()) {
                return Long.parseLong(purchaseIdStr);
            }
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid purchaseId format: " + purchaseIdStr);
        }
        throw new IllegalArgumentException("purchaseId must not be null or empty.");
    }
}
