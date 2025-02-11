package com.example.workflow.repository;

import com.example.workflow.model.StockRequestList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockRequestListRepository extends JpaRepository<StockRequestList, Long> {
    // Additional query methods can be defined here
}
