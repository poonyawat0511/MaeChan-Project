package com.example.workflow.controller.notify;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.workflow.model.notify.NotifyTime;
import com.example.workflow.service.notify.NotifyTimeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/notify-time")
public class NotifyTimeController {

    @Autowired
    private NotifyTimeService notifyTimeService;

    @PostMapping
    public ResponseEntity<NotifyTime> createTime(@Valid @RequestBody NotifyTime notifyTime) {
        NotifyTime created = notifyTimeService.createTime(notifyTime);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping
    public ResponseEntity<List<NotifyTime>> getAllTimes() {
        List<NotifyTime> messageTimes = notifyTimeService.getAllTimes();
        return ResponseEntity.ok(messageTimes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NotifyTime> getTimeById(@PathVariable Long id) {
        NotifyTime notifyTime = notifyTimeService.getTimeById(id);
        return ResponseEntity.ok(notifyTime);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<NotifyTime> updateTime(@PathVariable Long id, @RequestBody NotifyTime messageTime) {
        NotifyTime updated = notifyTimeService.updateTime(id, messageTime);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTime(@PathVariable Long id) {
        notifyTimeService.deleteTime(id);
        return ResponseEntity.noContent().build();
    }
}
