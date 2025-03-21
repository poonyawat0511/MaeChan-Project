package com.example.workflow.repository;

import com.example.workflow.model.StockBudgetList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockBudgetListRepository extends JpaRepository<StockBudgetList, Long> {
    // Additional query methods can be defined here
}
