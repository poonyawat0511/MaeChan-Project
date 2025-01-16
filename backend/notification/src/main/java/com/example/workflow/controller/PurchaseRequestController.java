package com.example.workflow.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.workflow.model.PurchaseRequest;
import com.example.workflow.service.PurchaseRequestservice;

@RestController
@RequestMapping("/purchases-requests")
public class PurchaseRequestController {

    @Autowired
    PurchaseRequestservice purchaseRequestservice;

    @PostMapping
    public ResponseEntity<PurchaseRequest> createPurchaseRequest(@RequestBody PurchaseRequest purchaseRequest) {
        PurchaseRequest createPurchaseRequest = purchaseRequestservice.createPurchaseRequest(purchaseRequest);
        return new ResponseEntity<>(createPurchaseRequest, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<PurchaseRequest>> getPurchaseRequestList() {
        List<PurchaseRequest> purchaseRequests = purchaseRequestservice.findAllPurchaseRequest();
        return new ResponseEntity<>(purchaseRequests, HttpStatus.OK);
    }

    @GetMapping("/{purchaseId}")
    public ResponseEntity<PurchaseRequest> getPurchaseRequestsByPurchaseRequestId(@PathVariable Long purchaseId) {
        PurchaseRequest purchaseRequest = purchaseRequestservice.findPurchaseRequestPurchaseRequestById(purchaseId);
        if (purchaseRequest != null) {
            return new ResponseEntity<>(purchaseRequest, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PatchMapping("/{purchaseId}")
    public ResponseEntity<PurchaseRequest> updatePurchaseRequestById(@PathVariable Long purchaseId, @RequestBody PurchaseRequest purchaseRequest) {
        purchaseRequest.setId(purchaseId);
        PurchaseRequest updatedPurchaseRequest = purchaseRequestservice.updatePurchaseRequest(purchaseRequest);
        if (updatedPurchaseRequest != null) {
            return new ResponseEntity<>(updatedPurchaseRequest, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{purchaseId}")
    public ResponseEntity<String> deletedPurchaseRequestById(@PathVariable Long purchaseId) {
        String result = purchaseRequestservice.deletePurchaseRequestById(purchaseId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/task/{taskId}")
    public ResponseEntity<PurchaseRequest> getPurchaseRequestByCamundaTaskId(@PathVariable String taskId) {
        PurchaseRequest purchaseRequest = purchaseRequestservice.findPurchaseRequestByCamundaTaskId(taskId);
        if (purchaseRequest != null) {
            return new ResponseEntity<>(purchaseRequest, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
