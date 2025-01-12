package com.example.workflow.kafka;

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

    @KafkaListener(topics = "dbserver1.public.users", groupId = "console-consumer-5182")
    public void handleMessage(String message) {
        System.out.println("Received message: " + message);
        try {
            // แปลงข้อความ JSON เป็น JSONObject
            JSONObject jsonMessage = new JSONObject(message);

            // ดึงค่า operation จาก payload
            String operation = jsonMessage.getJSONObject("payload").getString("op");

            // ถ้าเป็นการลบ (delete) ข้อมูล ไม่ต้องเริ่มกระบวนการ Camunda
            if ("d".equals(operation)) {
                System.out.println("Detected delete operation, skipping process initiation.");
                return; // ออกจาก method
            }

            // หากต้องการส่งข้อความไปยัง LINE ก็สามารถทำได้ที่นี่
            String userId = "U7c7b26b975ad0730d8b1db6ef91c5753";  // แทน USER_LINE_ID ด้วย user ID ที่ต้องการส่ง

            // เริ่มต้นกระบวนการ Camunda โดยใช้ RuntimeService
            runtimeService.startProcessInstanceByKey("Meachan-process", Variables.createVariables()
                    .putValue("tenantId", "meachan")
                    .putValue("message", "Received Kafka message: " + message) // ส่งข้อความ
                    .putValue("userId", userId)); // ส่ง userId

        } catch (Exception e) {
            System.err.println("Error processing Kafka message: " + e.getMessage());
        }
    }
}
