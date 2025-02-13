package com.example.workflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.workflow.model.StockBudgetType;

@Repository
public interface StockBudgetTypeRepository extends JpaRepository<StockBudgetType, Long> {
    // Additional query methods can be defined here
}
