package com.example.workflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.workflow.model.StockPurchaseType;

@Repository
public interface StockPurchaseTypeRepository extends JpaRepository<StockPurchaseType, Long> {
}
