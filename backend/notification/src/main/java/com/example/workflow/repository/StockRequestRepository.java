package com.example.workflow.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.workflow.model.StockRequest;

import jakarta.transaction.Transactional;

@Repository
public interface StockRequestRepository extends JpaRepository<StockRequest, Long> {

    
}
