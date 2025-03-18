package com.example.workflow.repository;

import com.example.workflow.model.StockDepartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockDepartmentRepository extends JpaRepository<StockDepartment, Long> {
    // Additional query methods can be defined here
}
