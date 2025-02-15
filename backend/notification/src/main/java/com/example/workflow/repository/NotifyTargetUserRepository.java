package com.example.workflow.repository;

import com.example.workflow.model.NotifyTargetUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotifyTargetUserRepository extends JpaRepository<NotifyTargetUser, Long> {
}
