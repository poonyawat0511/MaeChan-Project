package com.example.workflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.workflow.model.StockUser;

import java.util.Optional;

public interface StockUserRepository extends JpaRepository<StockUser, Long> {
    StockUser findByFirstNameAndLastName(String firstName, String lastName);
}
