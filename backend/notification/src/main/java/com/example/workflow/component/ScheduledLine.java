package com.example.workflow.component;

import org.springframework.scheduling.annotation.Scheduled; 
import org.springframework.stereotype.Component;
import com.example.workflow.service.LineMessageService;

@Component
public class ScheduledLine {
    private final LineMessageService lineMessageService;

    public ScheduledLine(LineMessageService lineMessageService) {
        this.lineMessageService = lineMessageService;
    }

    @Scheduled(cron = "0 0 9 * * MON-FRI", zone = "Asia/Bangkok") 
    public void sendDailyLineMessage() {
        lineMessageService.pushMessage("your-user-id", "This is your scheduled message!");
    }
}