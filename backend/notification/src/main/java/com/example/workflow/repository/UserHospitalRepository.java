package com.example.workflow.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.workflow.model.Role;
import com.example.workflow.model.UserHospital;

public interface UserHospitalRepository extends JpaRepository<UserHospital, Long> {

    Optional<UserHospital> findByEmail(String email);

    UserHospital findByRole(Role role);
}
