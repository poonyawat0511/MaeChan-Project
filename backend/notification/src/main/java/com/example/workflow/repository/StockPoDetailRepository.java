package com.example.workflow.repository;

import com.example.workflow.model.StockPoDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockPoDetailRepository extends JpaRepository<StockPoDetail, Long> {
    // Additional query methods can be defined here
}
