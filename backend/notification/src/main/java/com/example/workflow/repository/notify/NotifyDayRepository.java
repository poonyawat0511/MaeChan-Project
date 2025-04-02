package com.example.workflow.repository.notify;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.workflow.model.notify.NotifyDay;



@Repository
public interface NotifyDayRepository extends JpaRepository<NotifyDay, Long> {
    NotifyDay findByName(String name);
    NotifyDay findByNameAndActiveIsTrue(String name);
}
