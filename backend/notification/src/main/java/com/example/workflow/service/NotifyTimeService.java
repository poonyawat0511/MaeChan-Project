package com.example.workflow.service;

import com.example.workflow.model.NotifyTime;
import com.example.workflow.repository.NotifyTimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotifyTimeService {

    @Autowired
    private NotifyTimeRepository messageTimeRepository;

    public List<NotifyTime> getAllMessageTimes() {
        return messageTimeRepository.findAll();
    }

    public ResponseEntity<NotifyTime> getMessageTimeById(Long id) {
        Optional<NotifyTime> messageTime = messageTimeRepository.findById(id);
        return messageTime.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    public NotifyTime createMessageTime(NotifyTime messageTime) {
        return messageTimeRepository.save(messageTime);
    }

    public ResponseEntity<NotifyTime> updateMessageTime(Long id, NotifyTime messageTime) {
        if (!messageTimeRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        messageTime.setId(id);
        NotifyTime updatedMessageTime = messageTimeRepository.save(messageTime);
        return ResponseEntity.ok(updatedMessageTime);
    }

    public ResponseEntity<Void> deleteMessageTime(Long id) {
        if (!messageTimeRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        messageTimeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
