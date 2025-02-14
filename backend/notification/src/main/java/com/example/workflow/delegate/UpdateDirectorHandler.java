package com.example.workflow.delegate;

import java.time.LocalDate;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.workflow.model.SpringRequest;
import com.example.workflow.model.StockRequest;
import com.example.workflow.repository.StockUserRepository;
import com.example.workflow.service.SpringRequestService;
import com.example.workflow.service.StockRequestService;

@Service("updateDirectorHandler")
public class UpdateDirectorHandler implements JavaDelegate {

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
        String stockSubjectPerson = (String) execution.getVariable("stockSubjectPerson");
        Boolean approve = (Boolean) execution.getVariable("approve");

        // ตรวจสอบและแปลง purchaseId
        Long requestId = validateAndParseRequestId(requestIdStr);
        Long directorId = validateAndParseRequestId(stockSubjectPerson);
        //Date
        LocalDate date = LocalDate.now();

        //get springRequest
        SpringRequest springRequest = springRequestService.getSpringRequestById(requestId);
        if (springRequest == null) {
            throw new RuntimeException("StockRequest not found with id: " + requestId);
        }
        //get stockRequest
        StockRequest stockRequest = springRequest.getStockRequest();

        // update springRequest       
        springRequest.setUserDirector(stockUserRepository.findById(directorId).get());
        springRequest.setDirectorApproveStatus(approve);
        springRequest.setDirectorApproveDate(date);
        springRequest.setAllCompleteStatus(approve);
        springRequestService.updateSpringRequest(requestId, springRequest);

        // update stockRequest
        stockRequest.setApprove(approve);
        stockRequest.setRequestComplete(approve); // ใช้ approve กำหนดค่า requestComplete ด้วย
        if (Boolean.TRUE.equals(approve)) {
            stockRequest.setStockApproveDate(date);
        }
        stockRequest.setRequestAllComplete(approve); // ตั้งค่า requestAllComplete ตาม approve
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
