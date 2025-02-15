package com.example.workflow.component;

import java.util.List;

import org.springframework.stereotype.Component;

import com.example.workflow.repository.NotifyDayRepository;
import com.example.workflow.model.NotifyDay;

import jakarta.annotation.PostConstruct;

@Component
public class DayInitializer {
    private final NotifyDayRepository dayRepository;

    public DayInitializer(NotifyDayRepository dayRepository) {
        this.dayRepository = dayRepository;
    }

    @PostConstruct
    public void initializeDays() {
        List<String> weekDays = List.of("monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday");
        for (String day : weekDays) {
            NotifyDay tempDay = dayRepository.findByName(day);
            if (tempDay == null) {
                NotifyDay newDay = new NotifyDay();
                newDay.setName(day);
                newDay.setActive(false);
                dayRepository.save(newDay);
            }
        }
    }
}

