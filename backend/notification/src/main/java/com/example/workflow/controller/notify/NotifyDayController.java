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

import com.example.workflow.model.notify.NotifyDay;
import com.example.workflow.service.notify.NotifyDayService;

@RestController
@RequestMapping("/notify-days")
public class NotifyDayController {

    @Autowired
    private NotifyDayService messageDayService;

    @GetMapping
    public ResponseEntity<List<NotifyDay>> getAllMessageDays() {
        List<NotifyDay> messageDays = messageDayService.getAllMessageDays();
        return new ResponseEntity<>(messageDays, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NotifyDay> getMessageDayById(@PathVariable Long id) {
        ResponseEntity<NotifyDay> responseEntity = messageDayService.getMessageDayById(id);
        return responseEntity.getStatusCode().is2xxSuccessful() ? ResponseEntity.ok(responseEntity.getBody()) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<NotifyDay> createMessageDay(@RequestBody NotifyDay messageDay) {
        NotifyDay createdMessageDay = messageDayService.createMessageDay(messageDay);
        return new ResponseEntity<>(createdMessageDay, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<NotifyDay> updateMessageDay(@PathVariable Long id, @RequestBody NotifyDay messageDay) {
        ResponseEntity<NotifyDay> responseEntity = messageDayService.updateMessageDay(id, messageDay);
        return responseEntity.getStatusCode().is2xxSuccessful() ? ResponseEntity.ok(responseEntity.getBody()) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessageDay(@PathVariable Long id) {
        ResponseEntity<Void> responseEntity = messageDayService.deleteMessageDay(id);
        return responseEntity.getStatusCode().is2xxSuccessful() ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
