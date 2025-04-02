package com.example.workflow.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.workflow.model.NotifyTargetUser;
import com.example.workflow.service.NotifyTargetUserService;

@RestController
@RequestMapping("/notify-target-user")
public class NotifyTargetUserController {

    @Autowired
    private NotifyTargetUserService notifyTargetUserService;

    @PostMapping
    public ResponseEntity<NotifyTargetUser> createNotifyTargetUser(@RequestBody Map<String, Long> request) {
        Long userHospitalId = request.get("targetUser");
        NotifyTargetUser created = notifyTargetUserService.createNotifyTargetUser(userHospitalId);
        return ResponseEntity.status(201).body(created);
    }

    @GetMapping
    public ResponseEntity<List<NotifyTargetUser>> getAllNotifyTargetUsers() {
        List<NotifyTargetUser> users = notifyTargetUserService.getAllNotifyTargetUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NotifyTargetUser> getNotifyTargetUserById(@PathVariable Long id) {
        NotifyTargetUser user = notifyTargetUserService.getNotifyTargetUserById(id);
        return ResponseEntity.ok(user);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<NotifyTargetUser> updateNotifyTargetUser(
            @PathVariable Long id,
            @RequestBody NotifyTargetUser notifyTargetUser) {

        NotifyTargetUser updated = notifyTargetUserService.updateNotifyTargetUser(id, notifyTargetUser);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotifyTargetUser(@PathVariable Long id) {
        notifyTargetUserService.deleteNotifyTargetUser(id);
        return ResponseEntity.noContent().build();
    }

}
