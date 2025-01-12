package com.example.workflow.service;

import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.linecorp.bot.client.LineMessagingClient;
import com.linecorp.bot.model.PushMessage;
import com.linecorp.bot.model.message.TextMessage;

@Service
public class LineMessageService {

    private final LineMessagingClient lineMessagingClient;

    // Constructor สำหรับสร้าง LineMessagingClient
    public LineMessageService(@Value("${line.bot.channel-token}") String channelToken) {
        this.lineMessagingClient = LineMessagingClient.builder(channelToken).build();
    }

    // เมธอดในการส่งข้อความไปยังผู้ใช้ LINE
    public void pushMessage(String userId, String messageText) {
        TextMessage textMessage = new TextMessage(messageText);
        PushMessage pushMessage = new PushMessage(userId, textMessage);

        try {
            // ส่งข้อความผ่าน LineMessagingClient
            lineMessagingClient.pushMessage(pushMessage).get();
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
    }
}
