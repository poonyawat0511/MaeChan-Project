package com.example.workflow.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.workflow.model.PurchaseRequest;
import com.example.workflow.repository.PurchaseRequestRepository;

@Service
public class PurchaseRequestservice {

    @Autowired
    private PurchaseRequestRepository purchaseRequestRepository;

    // crud
    public PurchaseRequest createPurchaseRequest(PurchaseRequest purchaseRequest) {
        return purchaseRequestRepository.save(purchaseRequest);
    }

    public List<PurchaseRequest> findAllPurchaseRequest() {
        return purchaseRequestRepository.findAll();
    }

    public PurchaseRequest findPurchaseRequestPurchaseRequestById(Long purchaseId) {
        Optional<PurchaseRequest> purchaseRequest = purchaseRequestRepository.findById(purchaseId);
        return purchaseRequest.orElse(null);
    }

    public PurchaseRequest updatePurchaseRequest(PurchaseRequest updatedPurchaseRequest) {
        return purchaseRequestRepository.findById(updatedPurchaseRequest.getId()).map(existingPurchaseRequest -> {
            existingPurchaseRequest.setRowNumber(updatedPurchaseRequest.getRowNumber());
            existingPurchaseRequest.setDocumentNumber(updatedPurchaseRequest.getDocumentNumber());
            existingPurchaseRequest.setMainInventory(updatedPurchaseRequest.getMainInventory());
            existingPurchaseRequest.setRequestType(updatedPurchaseRequest.getRequestType());
            existingPurchaseRequest.setItem(updatedPurchaseRequest.getItem());
            existingPurchaseRequest.setItemCount(updatedPurchaseRequest.getItemCount());
            existingPurchaseRequest.setItemPrice(updatedPurchaseRequest.getItemPrice());
            existingPurchaseRequest.setSumPrice(updatedPurchaseRequest.getSumPrice());
            existingPurchaseRequest.setBudgetReceived(updatedPurchaseRequest.getBudgetReceived());
            existingPurchaseRequest.setBudgetUsed(updatedPurchaseRequest.getBudgetUsed());
            existingPurchaseRequest.setBudgetLeft(updatedPurchaseRequest.getBudgetLeft());
            existingPurchaseRequest.setBuyingMethod(updatedPurchaseRequest.getBuyingMethod());
            existingPurchaseRequest.setBudgetType(updatedPurchaseRequest.getBudgetType());
            existingPurchaseRequest.setRequester(updatedPurchaseRequest.getRequester());
            existingPurchaseRequest.setCreateDate(updatedPurchaseRequest.getCreateDate());
            existingPurchaseRequest.setDueDate(updatedPurchaseRequest.getDueDate());
            existingPurchaseRequest.setInspector(updatedPurchaseRequest.getInspector());
            existingPurchaseRequest.setInspectStatus(updatedPurchaseRequest.getInspectStatus());
            existingPurchaseRequest.setApprover(updatedPurchaseRequest.getApprover());
            existingPurchaseRequest.setApprovedStatus(updatedPurchaseRequest.getApprovedStatus());
            existingPurchaseRequest.setApprovedDate(updatedPurchaseRequest.getApprovedDate());
            existingPurchaseRequest.setBuyingDocStatus(updatedPurchaseRequest.getBuyingDocStatus());
            existingPurchaseRequest.setBuyingDocNumber(updatedPurchaseRequest.getBuyingDocNumber());

            return purchaseRequestRepository.save(existingPurchaseRequest);
        }).orElseThrow(() -> new RuntimeException("PurchaseRequest not found with id: " + updatedPurchaseRequest.getId()));
    }

    public String deletePurchaseRequestById(Long purchaseId) {
        purchaseRequestRepository.deleteById(purchaseId);
        return "PurchaseRequest id:" + purchaseId + " has been deleted";
    }
}
