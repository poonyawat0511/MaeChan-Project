package com.example.workflow.controller;

import com.example.workflow.model.NotifyTime;
import com.example.workflow.service.NotifyTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notify-time")
public class NotifyTimeController {

    @Autowired
    private NotifyTimeService messageTimeService;

    @GetMapping
    public ResponseEntity<List<NotifyTime>> getAllMessageTimes() {
        List<NotifyTime> messageTimes = messageTimeService.getAllMessageTimes();
        return new ResponseEntity<>(messageTimes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NotifyTime> getMessageTimeById(@PathVariable Long id) {
        ResponseEntity<NotifyTime> responseEntity = messageTimeService.getMessageTimeById(id);
        return responseEntity.getStatusCode().is2xxSuccessful() ? ResponseEntity.ok(responseEntity.getBody()) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<NotifyTime> createMessageTime(@RequestBody NotifyTime messageTime) {
        NotifyTime createdMessageTime = messageTimeService.createMessageTime(messageTime);
        return new ResponseEntity<>(createdMessageTime, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<NotifyTime> updateMessageTime(@PathVariable Long id, @RequestBody NotifyTime messageTime) {
        ResponseEntity<NotifyTime> responseEntity = messageTimeService.updateMessageTime(id, messageTime);
        return responseEntity.getStatusCode().is2xxSuccessful() ? ResponseEntity.ok(responseEntity.getBody()) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessageTime(@PathVariable Long id) {
        ResponseEntity<Void> responseEntity = messageTimeService.deleteMessageTime(id);
        return responseEntity.getStatusCode().is2xxSuccessful() ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
