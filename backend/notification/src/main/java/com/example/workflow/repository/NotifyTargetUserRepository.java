package com.example.workflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.workflow.model.NotifyTargetUser;
import com.example.workflow.model.UserHospital;

@Repository
public interface NotifyTargetUserRepository extends JpaRepository<NotifyTargetUser, Long> {

    boolean existsByTargetUser(UserHospital targetUser);

}
