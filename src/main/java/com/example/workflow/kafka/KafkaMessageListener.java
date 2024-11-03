package com.example.workflow.kafka;

import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.variable.Variables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.example.workflow.Line.LineMessageService;

@Service
public class KafkaMessageListener {

    @Autowired
    private RuntimeService runtimeService;

        @Autowired
    private LineMessageService lineMessageService;

    @KafkaListener(topics = "dbserver1.public.users", groupId = "console-consumer-5182")
    public void handleMessage(String message) {

        System.out.println("Received message: " + message);

        // เริ่มต้นกระบวนการ Camunda โดยใช้ RuntimeService
        runtimeService.startProcessInstanceByKey("Meachan-process", Variables.createVariables()
                .putValue("tenantId", "meachan"));

                String userId = "U7c7b26b975ad0730d8b1db6ef91c5753";  // แทน USER_LINE_ID ด้วย user ID ที่ต้องการส่ง
                lineMessageService.pushMessage(userId, "Received Kafka message: " + message);
    }
}
