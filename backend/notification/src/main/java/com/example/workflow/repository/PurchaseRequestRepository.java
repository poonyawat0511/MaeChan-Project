package com.example.workflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.workflow.model.PurchaseRequest;

public interface  PurchaseRequestRepository extends JpaRepository<PurchaseRequest, Long> {
    
}
