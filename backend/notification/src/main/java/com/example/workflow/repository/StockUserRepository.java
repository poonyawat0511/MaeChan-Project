package com.example.workflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.workflow.model.StockUser;

public interface StockUserRepository extends JpaRepository<StockUser, Long> {

}
