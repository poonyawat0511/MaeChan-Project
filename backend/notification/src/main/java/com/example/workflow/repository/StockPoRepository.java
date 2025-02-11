package com.example.workflow.repository;

import com.example.workflow.model.StockPo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockPoRepository extends JpaRepository<StockPo, Long> {
    // Additional query methods can be defined here
}
