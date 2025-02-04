package com.example.workflow.repository;

import com.example.workflow.model.SpringRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpringRequestRepository extends JpaRepository<SpringRequest, Long> {
}
