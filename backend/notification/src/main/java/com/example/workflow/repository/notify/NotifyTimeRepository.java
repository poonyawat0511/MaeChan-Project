package com.example.workflow.repository.notify;

import java.time.LocalTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.workflow.model.notify.NotifyTime;

@Repository
public interface NotifyTimeRepository extends JpaRepository<NotifyTime, Long> {
    Optional<NotifyTime> findByTime(LocalTime time);
}
