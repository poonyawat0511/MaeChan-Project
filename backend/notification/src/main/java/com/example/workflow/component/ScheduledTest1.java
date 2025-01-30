package com.example.workflow.component;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component 
public class ScheduledTest1 {
    
    //message every 1 minute
    @Scheduled(cron = "0 */1 * * * *", zone = "Asia/Bangkok") 
    public void test1Message() { 
        System.out.println("This is your scheduled message! Test every 1 minute");
    }
}