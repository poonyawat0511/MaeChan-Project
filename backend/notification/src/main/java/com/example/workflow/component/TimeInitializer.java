package com.example.workflow.component;

import java.time.LocalTime;

import org.springframework.stereotype.Component;

import com.example.workflow.model.NotifyTime;
import com.example.workflow.repository.NotifyTimeRepository;

import jakarta.annotation.PostConstruct;

@Component
public class TimeInitializer {
    private final NotifyTimeRepository timeRepository;

    public TimeInitializer(NotifyTimeRepository timeRepository) {
        this.timeRepository = timeRepository;
    }

    @PostConstruct
    public void initializeTime() {
        if (timeRepository.count() == 0) {
            NotifyTime newTime = new NotifyTime();
            newTime.setTime(LocalTime.of(9, 0));
            timeRepository.save(newTime);
        }
    }
}

