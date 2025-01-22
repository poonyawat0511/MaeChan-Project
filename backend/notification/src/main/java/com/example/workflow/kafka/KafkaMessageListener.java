package com.example.workflow.kafka;

import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.camunda.bpm.engine.variable.Variables;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.example.workflow.repository.StockRequestRepository;

@Service
public class KafkaMessageListener {

    @Autowired
    private RuntimeService runtimeService;

    @Autowired
    private StockRequestRepository stockRequestRepository;  // Repository สำหรับการอัปเดตข้อมูลในฐานข้อมูล

    @KafkaListener(topics = "dbserver1.public.stock_request", groupId = "console-consumer-5182")
    public void handleMessage(String message) {
        System.out.println("Received message: " + message);
        try {
            // แปลงข้อความ JSON เป็น JSONObject
            JSONObject jsonMessage = new JSONObject(message);

            // ดึงค่า operation จาก payload
            String operation = jsonMessage.getJSONObject("payload").getString("op");

            if ("d".equals(operation)) {
                System.out.println("Detected delete operation, skipping process initiation.");
                return; // ข้ามการเริ่มกระบวนการถ้าเป็นการลบ
            }

            if ("u".equals(operation)) {
                System.out.println("Detected update operation, skipping process initiation.");
                return; // ข้ามการเริ่มกระบวนการถ้าเป็นการอัพเดต
            }

            // ตรวจสอบค่า requestId และ documentNumber
            JSONObject payload = jsonMessage.getJSONObject("payload");
            JSONObject after = payload.has("after") ? payload.getJSONObject("after") : null;

            String requestId = after != null ? after.optString("id", "N/A") : "N/A";
            String documentNumber = after != null ? after.optString("document_number", "N/A") : "N/A";
            String requester = after != null ? after.optString("requester", "Unknown Requester") : "Unknown Requester";
            String stockUser = after != null ? after.optString("stockUser", "Unknown StockUser") : "Unknown StockUser";
            requester = requester.isEmpty() ? "Unknown Requester" : requester.substring(0, Math.min(requester.length(), 50));
            stockUser = stockUser.isEmpty() ? "Unknown Inspector" : stockUser.substring(0, Math.min(stockUser.length(), 50));          String item = after != null ? after.optString("item", "Unknown Item") : "Unknown Item";

            int itemCount = after != null ? after.optInt("item_count", 0) : 0;
            double sumPrice = after != null ? after.optDouble("sum_price", 0.0) : 0.0;// ส่งข้อความไปยัง LINE (ถ้ามี)
            String userId = "U7c7b26b975ad0730d8b1db6ef91c5753";
            // เริ่มต้นกระบวนการ Camunda โดยใช้ RuntimeService
            ProcessInstance processInstance = runtimeService.startProcessInstanceByKey("Meachan-process", Variables.createVariables()
                    .putValue("requestId", requestId) // ส่ง requestId
                    .putValue("RequestId", requestId)
                    .putValue("tenantId", "meachan")
                    .putValue("message", "Received Kafka message: eiei")
                    .putValue("documentNumber", documentNumber)
                    .putValue("item", item)
                    .putValue("itemCount", itemCount)
                    .putValue("sumPrice", sumPrice)
                    .putValue("requester", requester)
                    .putValue("stockUser", stockUser)
                    .putValue("userId", userId));

            // หลังจากที่กระบวนการ Camunda เริ่มต้นแล้ว
            String taskId = processInstance.getId();  // หรือใช้ taskService เพื่อดึง taskId

            // อัปเดตฐานข้อมูล stock_request ให้มี camunda_task_id
            stockRequestRepository.updateCamundaTaskId(Long.valueOf(requestId), taskId);

        } catch (Exception e) {
            System.err.println("Error processing Kafka message: " + e.getMessage());
        }
    }
}
