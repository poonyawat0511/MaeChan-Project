package com.example.workflow.delegate;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.workflow.model.PurchaseRequest;
import com.example.workflow.service.PurchaseRequestservice;

@Service("updatePurchaseRequestHandler")
public class UpdatePurchaseRequestHandler implements JavaDelegate {

    @Autowired
    private PurchaseRequestservice purchaseRequestService;

    @Override
public void execute(DelegateExecution execution) throws Exception {
    // ดึง Workflow Variables ที่ได้จากฟอร์ม
    String purchaseIdStr = (String) execution.getVariable("purchaseId"); // รับค่าจากฟอร์มเป็น String
    String inspector = (String) execution.getVariable("inspector");
    Boolean inspectStatus = (Boolean) execution.getVariable("inspectStatus");
    String approver = (String) execution.getVariable("approver");
    Boolean approvedStatus = (Boolean) execution.getVariable("approvedStatus");
    String buyingDocStatus = (String) execution.getVariable("buyingDocStatus");

    // เพิ่ม log เพื่อตรวจสอบค่าของตัวแปรที่ได้รับ
    System.out.println("purchaseId: " + purchaseIdStr);  // เปลี่ยนจาก purchaseId เป็น purchaseIdStr
    System.out.println("inspector: " + inspector);
    System.out.println("inspectStatus: " + inspectStatus);
    System.out.println("approver: " + approver);
    System.out.println("approvedStatus: " + approvedStatus);
    System.out.println("buyingDocStatus: " + buyingDocStatus);

    // แปลง purchaseId จาก String เป็น Long
    Long purchaseId = null;
    try {
        if (purchaseIdStr != null && !purchaseIdStr.isEmpty()) {
            purchaseId = Long.parseLong(purchaseIdStr);  // แปลงจาก String เป็น Long
        }
    } catch (NumberFormatException e) {
        throw new IllegalArgumentException("Invalid purchaseId format, cannot convert to Long: " + purchaseIdStr);
    }

    // ตรวจสอบ purchaseId ว่าถูกต้อง
    if (purchaseId == null || purchaseId <= 0) {
        throw new IllegalArgumentException("Invalid purchaseId: must be a positive number.");
    }

    // อัปเดต PurchaseRequest ในระบบ
    System.out.println("Searching for PurchaseRequest with ID: " + purchaseId);
    PurchaseRequest purchaseRequest = purchaseRequestService.findPurchaseRequestPurchaseRequestById(purchaseId);

    // ตรวจสอบว่า purchaseRequest ไม่เป็น null
    if (purchaseRequest == null) {
        System.out.println("PurchaseRequest not found with id: " + purchaseId);
        throw new RuntimeException("PurchaseRequest not found with id: " + purchaseId);
    }

    // อัปเดตข้อมูลที่จำเป็น
    purchaseRequest.setInspector(inspector);
    purchaseRequest.setInspectStatus(inspectStatus);
    purchaseRequest.setApprover(approver);
    purchaseRequest.setApprovedStatus(approvedStatus);
    purchaseRequest.setBuyingDocStatus(buyingDocStatus);

    // บันทึกข้อมูลที่อัปเดต
    System.out.println("Updating PurchaseRequest with ID: " + purchaseId);
    purchaseRequestService.updatePurchaseRequest(purchaseRequest);
}


}
