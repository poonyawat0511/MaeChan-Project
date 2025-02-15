package com.example.workflow.service;

import com.example.workflow.model.NotifyDay;
import com.example.workflow.repository.NotifyDayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotifyDayService {

    @Autowired
    private NotifyDayRepository messageDayRepository;

    public List<NotifyDay> getAllMessageDays() {
        return messageDayRepository.findAll();
    }

    public ResponseEntity<NotifyDay> getMessageDayById(Long id) {
        Optional<NotifyDay> messageDay = messageDayRepository.findById(id);
        return messageDay.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    public NotifyDay createMessageDay(NotifyDay messageDay) {
        return messageDayRepository.save(messageDay);
    }

    public ResponseEntity<NotifyDay> updateMessageDay(Long id, NotifyDay messageDay) {
        if (!messageDayRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        messageDay.setId(id);
        NotifyDay updatedMessageDay = messageDayRepository.save(messageDay);
        return ResponseEntity.ok(updatedMessageDay);
    }

    public ResponseEntity<Void> deleteMessageDay(Long id) {
        if (!messageDayRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        messageDayRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
