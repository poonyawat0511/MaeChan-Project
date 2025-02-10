package com.example.workflow.repository;

import com.example.workflow.model.StockBudget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockBudgetRepository extends JpaRepository<StockBudget, Long> {
    // Custom query methods can be added here if needed
}
