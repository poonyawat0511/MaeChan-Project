package com.example.workflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.workflow.model.StockUserApprove;

public interface StockUserApproveRepository extends JpaRepository<StockUserApprove, Long> {
}
