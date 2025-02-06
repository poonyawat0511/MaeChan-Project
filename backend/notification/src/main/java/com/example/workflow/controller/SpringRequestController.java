package com.example.workflow.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.workflow.model.SpringRequest;
import com.example.workflow.service.SpringRequestService;

@RestController
@RequestMapping("/spring-requests")
public class SpringRequestController {

    @Autowired
    private SpringRequestService springRequestService;

    @GetMapping
    public List<SpringRequest> getAllSpringRequests() {
        return springRequestService.getAllSpringRequests();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SpringRequest> getSpringRequestById(@PathVariable Long id) {
        SpringRequest springRequest = springRequestService.getSpringRequestById(id);
        return ResponseEntity.ok(springRequest);
    }

    @PostMapping
    public SpringRequest createSpringRequest(@RequestBody SpringRequest springRequest) {
        return springRequestService.createSpringRequest(springRequest);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SpringRequest> updateSpringRequest(@PathVariable Long id, @RequestBody SpringRequest springRequest) {
        SpringRequest updatedSpringRequest = springRequestService.updateSpringRequest(id, springRequest);
        return ResponseEntity.ok(updatedSpringRequest);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSpringRequest(@PathVariable Long id) {
        springRequestService.deleteSpringRequest(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/task/{taskId}")
    public Optional<SpringRequest> getByCamundaTaskId(@PathVariable String taskId) {
        return springRequestService.getByCamundaTaskId(taskId);
    }
}
