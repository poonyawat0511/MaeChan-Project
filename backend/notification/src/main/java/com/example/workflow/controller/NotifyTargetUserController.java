package com.example.workflow.controller;

import com.example.workflow.model.NotifyTargetUser;
import com.example.workflow.service.NotifyTargetUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notify-target-user")
public class NotifyTargetUserController {

    @Autowired
    private NotifyTargetUserService notifyTargetUserService;

    @GetMapping
    public ResponseEntity<List<NotifyTargetUser>> getAllNotifyTargetUsers() {
        List<NotifyTargetUser> users = notifyTargetUserService.getAllNotifyTargetUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping
    public ResponseEntity<NotifyTargetUser> createNotifyTargetUser(@RequestBody NotifyTargetUser notifyTargetUser) {
        NotifyTargetUser createdUser = notifyTargetUserService.createNotifyTargetUser(notifyTargetUser);
        return ResponseEntity.ok(createdUser);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NotifyTargetUser> getNotifyTargetUserById(@PathVariable Long id) {
        NotifyTargetUser user = notifyTargetUserService.getNotifyTargetUserById(id);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<NotifyTargetUser> updateNotifyTargetUser(@PathVariable Long id, @RequestBody NotifyTargetUser notifyTargetUserDetails) {
        NotifyTargetUser updatedUser = notifyTargetUserService.updateNotifyTargetUser(id, notifyTargetUserDetails);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotifyTargetUser(@PathVariable Long id) {
        notifyTargetUserService.deleteNotifyTargetUser(id);
        return ResponseEntity.noContent().build();
    }
}
