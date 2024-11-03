package com.example.workflow.Line;

import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.linecorp.bot.client.LineMessagingClient;
import com.linecorp.bot.model.PushMessage;
import com.linecorp.bot.model.message.TextMessage;

@Service
public class LineMessageService {

    private final LineMessagingClient lineMessagingClient;

    public LineMessageService(@Value("${line.bot.channel-token}") String channelToken) {
        this.lineMessagingClient = LineMessagingClient.builder(channelToken).build();
    }

    public void pushMessage(String userId, String messageText) {
        TextMessage textMessage = new TextMessage(messageText);
        PushMessage pushMessage = new PushMessage(userId, textMessage);

        try {
            lineMessagingClient.pushMessage(pushMessage).get();
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
    }
}
