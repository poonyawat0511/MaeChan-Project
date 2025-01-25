package com.example.workflow.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.workflow.model.Role;
import com.example.workflow.model.StockUser;

public interface StockUserRepository extends JpaRepository<StockUser, Long> {

    Optional<StockUser> findByEmail(String email);

    StockUser findByRole(Role role);
}
