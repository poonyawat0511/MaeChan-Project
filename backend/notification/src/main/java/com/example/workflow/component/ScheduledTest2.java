package com.example.workflow.component;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component 
public class ScheduledTest2 {
    
    // MON-FRI                  จันทร์-ศุกร์
    // "0 59 23 * * MON-FRI"   5 ทุ่ม 59 นาที 
    // "0 5 0 * * MON-FRI"     0 นาฬิกา 5 นาที
    @Scheduled(cron = "0 5 0 * * MON-FRI", zone = "Asia/Bangkok") 
    public void testMessage() { 
        System.out.println("This is your scheduled message! Test2");
    }
}