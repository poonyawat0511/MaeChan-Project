package com.example.workflow.repository.notify;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.workflow.model.notify.NotifyTargetUser;
import com.example.workflow.model.UserHospital;

@Repository
public interface NotifyTargetUserRepository extends JpaRepository<NotifyTargetUser, Long> {

    boolean existsByTargetUser(UserHospital targetUser);

}
