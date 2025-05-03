package com.example.workflow.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.workflow.model.Role;
import com.example.workflow.model.UserHospital;

public interface UserHospitalRepository extends JpaRepository<UserHospital, Long> {

    Optional<UserHospital> findByEmail(String email);

    Optional<UserHospital> findFirstByRole(Role role);

    boolean existsByEmail(String email);

    Page<UserHospital> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
    String firstName, String lastName, String email, Pageable pageable);

    UserHospital findByFirstNameAndLastNameAndEmail(String firstName, String lastName, String email);

}
