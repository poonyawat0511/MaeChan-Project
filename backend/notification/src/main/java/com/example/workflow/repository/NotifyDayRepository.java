package com.example.workflow.repository;

import com.example.workflow.model.NotifyDay;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotifyDayRepository extends JpaRepository<NotifyDay, Long> {
    NotifyDay findByName(String name);
    NotifyDay findByNameAndActiveIsTrue(String name);
}
