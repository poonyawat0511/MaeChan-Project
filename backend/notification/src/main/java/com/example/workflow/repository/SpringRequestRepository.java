package com.example.workflow.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.workflow.model.SpringRequest;

@Repository
public interface SpringRequestRepository extends JpaRepository<SpringRequest, Long> {
    Optional<SpringRequest> findByCamundaTaskId(String camundaTaskId);
}
