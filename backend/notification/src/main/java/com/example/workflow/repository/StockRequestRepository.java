package com.example.workflow.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.workflow.model.StockRequest;

import jakarta.transaction.Transactional;

public interface StockRequestRepository extends JpaRepository<StockRequest, Long> {

    @Modifying
    @Transactional
    @Query("UPDATE StockRequest pr SET pr.camundaTaskId = :taskId WHERE pr.id = :requestId")
    void updateCamundaTaskId(@Param("requestId") Long requestId, @Param("taskId") String taskId);


    @Query("SELECT pr FROM StockRequest pr WHERE pr.camundaTaskId = :taskId")
    Optional<StockRequest> findStockRequestByCamundaTaskId(@Param("taskId") String taskId);
    
    
}
