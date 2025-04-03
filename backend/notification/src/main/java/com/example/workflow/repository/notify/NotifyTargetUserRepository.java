package com.example.workflow.repository.notify;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.workflow.model.notify.NotifyTargetUser;
import com.example.workflow.model.UserHospital;
import com.example.workflow.model.notify.NotifyTargetUser;

@Repository
public interface NotifyTargetUserRepository extends JpaRepository<NotifyTargetUser, Long> {

    boolean existsByTargetUser(UserHospital targetUser);

    @Query("""
        SELECT n FROM NotifyTargetUser n
        WHERE LOWER(n.targetUser.firstName) LIKE LOWER(CONCAT('%', :search, '%'))
           OR LOWER(n.targetUser.lastName) LIKE LOWER(CONCAT('%', :search, '%'))
           OR LOWER(n.targetUser.email) LIKE LOWER(CONCAT('%', :search, '%'))
    """)
    Page<NotifyTargetUser> searchByTargetUserInfo(@Param("search") String search, Pageable pageable);

}
