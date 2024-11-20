package com.example.workflow.kafka;

import java.util.Timer;
import java.util.TimerTask;

import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.variable.Variables;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaMessageListener {

    @Autowired
    private RuntimeService runtimeService;
    // @Autowired
    // private LineMessageService lineMessageService;
    private int messageCount = 0;
    private long totalProcessDuration = 0;
    private long roundStartTime = 0;
    private Timer resetTimer;

    @KafkaListener(topics = "dbserver1.public.users", groupId = "console-consumer-5182")
    public void handleMessage(String message) {
        if (roundStartTime == 0) {
            roundStartTime = System.currentTimeMillis();
            messageCount = 0;
            totalProcessDuration = 0;
        }

        messageCount++;
        System.out.println("Received message: " + message);
        System.out.println("Total processes in this round: " + messageCount);

        try {
            JSONObject jsonMessage = new JSONObject(message);
            String operation = jsonMessage.getJSONObject("payload").getString("op");

            if ("d".equals(operation)) {
                System.out.println("Detected delete operation, skipping process initiation.");
                return;
            }

            long startTime = System.currentTimeMillis();

            runtimeService.startProcessInstanceByKey("Meachan-process", Variables.createVariables()
                    .putValue("tenantId", "meachan"));

            // String userId = "U7c7b26b975ad0730d8b1db6ef91c5753";  // แทน USER_LINE_ID ด้วย user ID ที่ต้องการส่ง
            // String userId =  "U7c7b26b975ad0730d8b1db6ef91c5753";
            // lineMessageService.pushMessage(userId, "Received Kafka message: " + message);

            long endTime = System.currentTimeMillis();
            long duration = endTime - startTime;
            totalProcessDuration += duration;

            System.out.println("Camunda process started successfully. Time taken: " + duration + " ms");

        } catch (Exception e) {
            System.err.println("Error processing Kafka message: " + e.getMessage());
        }

        if (messageCount > 0) {
            float averageTime = totalProcessDuration / messageCount;
            System.out.println("Average time per process: " + averageTime + " ms");
        }
        resetMessageCountIfIdle();
    }

    private void resetMessageCountIfIdle() {
        if (resetTimer != null) {
            resetTimer.cancel();
        }

        resetTimer = new Timer();
        resetTimer.schedule(new TimerTask() {
            @Override
            public void run() {
                System.out.println("No new messages in the last 10 seconds. Resetting process count.");
                messageCount = 0;
                totalProcessDuration = 0;
                roundStartTime = 0;
            }
        }, 10000);
    }
}
