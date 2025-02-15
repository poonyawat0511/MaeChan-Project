package com.example.workflow.service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.workflow.repository.NotifyDayRepository;
import com.example.workflow.repository.NotifyTargetUserRepository;
import com.example.workflow.repository.NotifyTimeRepository;
import com.example.workflow.model.NotifyDay;
import com.example.workflow.model.NotifyTargetUser;
import com.example.workflow.model.NotifyTime;
import com.example.workflow.service.LineMessageService;

@Service
public class NotifyService {
    private final NotifyDayRepository dayRepository;
    private final NotifyTimeRepository timeRepository;
    private final NotifyTargetUserRepository targetUserRepository;
    private final LineMessageService lineMessageService;
    private final StockUserService stockUserService;

    public NotifyService(NotifyDayRepository dayRepository, NotifyTimeRepository timeRepository, 
                         NotifyTargetUserRepository targetUserRepository, LineMessageService lineMessageService, StockUserService stockUserService) {
        this.dayRepository = dayRepository;
        this.timeRepository = timeRepository;
        this.targetUserRepository = targetUserRepository;
        this.lineMessageService = lineMessageService;
        this.stockUserService = stockUserService;
    }

    @Scheduled(fixedRate = 60000) // Runs every minute
    public void checkAndSendMessages() {
        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Bangkok"));
        String today = now.getDayOfWeek().toString().toLowerCase(); // e.g., "monday"
        LocalTime currentTime = now.toLocalTime().truncatedTo(ChronoUnit.MINUTES);

        // Check if today is active
        NotifyDay day = dayRepository.findByNameAndActiveIsTrue(today);
        if (day == null) 
        {
            System.out.println("Today is not active day");
            return; // Skip if today is not active
        }

        // Check if the current time matches a scheduled time
        boolean matchtime = false;
        List<NotifyTime> time = timeRepository.findAll();
        if (time.isEmpty()) 
        {
            System.out.println("No time set");
            return; 
        }
        for (NotifyTime t : time) {
            if (t.getTime().truncatedTo(ChronoUnit.MINUTES).equals(currentTime)) {
                matchtime = true;
                break; // Found a match
            }
        }
        if (matchtime == false) 
        {
            System.out.println("No active time found");
            return; // Skip if no active time
        }

        // Send message to all target users
        List<NotifyTargetUser> users = targetUserRepository.findAll();
        if (users.isEmpty()) {
            System.out.println("No notify target users found");
            return;
        }
        for (NotifyTargetUser user : users) {
            
            //message logic
            //lineMessageService.pushMessage(user.getId().toString(), "Hello from message service!");
            System.out.println("Hello : " + stockUserService.findStockUserById(user.getTargetUser()).getFirstName() + " this is a message from the schedule service");
        }
    }
}
