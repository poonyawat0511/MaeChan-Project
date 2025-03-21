package com.example.workflow.repository;

import com.example.workflow.model.StockBudgetListTr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockBudgetListTrRepository extends JpaRepository<StockBudgetListTr, Long> {
    // Additional query methods can be defined here
}
