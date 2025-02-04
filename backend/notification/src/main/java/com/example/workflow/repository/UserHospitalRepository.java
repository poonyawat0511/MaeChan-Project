package com.example.workflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.workflow.model.UserHospital;

public interface UserHospitalRepository extends JpaRepository<UserHospital, Long> {

}
