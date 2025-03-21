package com.example.workflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.workflow.model.Officer;
import java.util.List;

public interface OfficerRepository extends JpaRepository<Officer, Long> {
    List<Officer> findByOfficerName(String officerName);
}
