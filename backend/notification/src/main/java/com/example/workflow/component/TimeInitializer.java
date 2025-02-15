package com.example.workflow.component;

import org.springframework.stereotype.Component;

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
            //timeRepository.save(new TimeSchedule(LocalTime.of(9, 0))); // Default to 09:00
        }
    }
}

