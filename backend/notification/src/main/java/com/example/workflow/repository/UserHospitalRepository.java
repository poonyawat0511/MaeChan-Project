package com.example.workflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.workflow.model.UserHospital;

import java.util.Optional;

public interface UserHospitalRepository extends JpaRepository<UserHospital, Long> {
    Optional<UserHospital> findByFirstNameAndLastName(String firstName, String lastName);
}
