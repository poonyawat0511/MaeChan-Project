package com.example.workflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.workflow.model.PurchaseRequest;

import jakarta.transaction.Transactional;

public interface PurchaseRequestRepository extends JpaRepository<PurchaseRequest, Long> {

    @Modifying
    @Transactional
    @Query("UPDATE PurchaseRequest pr SET pr.camundaTaskId = :taskId WHERE pr.id = :purchaseId")
    void updateCamundaTaskId(@Param("purchaseId") Long purchaseId, @Param("taskId") String taskId);

}
