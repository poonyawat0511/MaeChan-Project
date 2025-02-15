package com.example.workflow.repository;

import com.example.workflow.model.NotifyTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotifyTimeRepository extends JpaRepository<NotifyTime, Long> {
}
