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

    @KafkaListener(topics = "dbserver1.public.purchase_requests", groupId = "console-consumer-5182")
    public void handleMessage(String message) {
        System.out.println("Received message: " + message);
        try {
            // แปลงข้อความ JSON เป็น JSONObject
            JSONObject jsonMessage = new JSONObject(message);

            // ดึงค่า operation จาก payload
            String operation = jsonMessage.getJSONObject("payload").getString("op");

            // ตรวจสอบประเภทของการดำเนินการ
            if ("d".equals(operation)) {
                System.out.println("Detected delete operation, skipping process initiation.");
                return; // ออกจาก method
            }

            if ("u".equals(operation)) {
                System.out.println("Detected update operation, skipping process initiation.");
                return; // ออกจาก method
            }

            // ตรวจสอบว่า "documentNumber" มีอยู่ใน payload หรือไม่
            JSONObject payload = jsonMessage.getJSONObject("payload");
            String documentNumber = payload.has("after") ? payload.getJSONObject("after").optString("document_number", "N/A") : "N/A";

            // ตรวจสอบคีย์อื่น ๆ ที่อาจจะเป็นค่าว่าง
            String requester = payload.has("after") ? payload.getJSONObject("after").optString("requester", "") : "";
            String inspector = payload.has("after") ? payload.getJSONObject("after").optString("inspector", "") : "";

            // หากข้อความ requester หรือ inspector เป็นค่าว่าง ให้ใช้ค่าปริยาย
            requester = requester.isEmpty() ? "Unknown Requester" : requester.substring(0, Math.min(requester.length(), 50));
            inspector = inspector.isEmpty() ? "Unknown Inspector" : inspector.substring(0, Math.min(inspector.length(), 50));

            // กรณีข้อมูลยาวเกินไป ให้ย่อข้อมูล
            String item = payload.has("after") ? payload.getJSONObject("after").optString("item", "Unknown Item") : "Unknown Item";
            int itemCount = payload.has("after") ? payload.getJSONObject("after").optInt("item_count", 0) : 0;
            double sumPrice = payload.has("after") ? payload.getJSONObject("after").optDouble("sum_price", 0.0) : 0.0;

            // ส่งข้อความไปยัง LINE (ถ้ามี)
            String userId = "U7c7b26b975ad0730d8b1db6ef91c5753";

            // เริ่มต้นกระบวนการ Camunda โดยใช้ RuntimeService
            runtimeService.startProcessInstanceByKey("Meachan-process", Variables.createVariables()
                    .putValue("tenantId", "meachan")
                    .putValue("message", "Received Kafka message: eiei")
                    .putValue("documentNumber", documentNumber)
                    .putValue("item", item)
                    .putValue("itemCount", itemCount)
                    .putValue("sumPrice", sumPrice)
                    .putValue("requester", requester)
                    .putValue("inspector", inspector)
                    .putValue("userId", userId));

        } catch (Exception e) {
            System.err.println("Error processing Kafka message: " + e.getMessage());
        }
    }
}
