package com.example.workflow.delegate;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.workflow.service.LineMessageService;

@Component
public class SendMessageDelegate implements JavaDelegate {

    @Autowired
    private LineMessageService lineMessageService;

    @Override
    public void execute(DelegateExecution execution) throws Exception {
        // ดึงข้อมูลจาก execution context
        String message = (String) execution.getVariable("message"); // สมมติว่า message ถูกส่งจาก Camunda
        String userId = (String) execution.getVariable("userId"); // userId ที่คุณต้องการส่งข้อความไป

        // ส่งข้อความไปยัง LINE
        if (message != null && userId != null) {
            lineMessageService.pushMessage(userId, message);
            System.out.println("Sent message to LINE: " + message);
        }
    }
}
