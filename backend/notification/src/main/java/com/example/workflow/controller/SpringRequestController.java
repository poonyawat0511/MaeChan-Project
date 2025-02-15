package com.example.workflow.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
    public ResponseEntity<List<SpringRequest>> getAllSpringRequests() {
        List<SpringRequest> springRequests = springRequestService.getAllSpringRequests();
        return new ResponseEntity<>(springRequests, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SpringRequest> getSpringRequestById(@PathVariable Long id) {
        SpringRequest springRequest = springRequestService.getSpringRequestById(id);
        if (springRequest != null) {
            return new ResponseEntity<>(springRequest, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<SpringRequest> createSpringRequest(@RequestBody SpringRequest springRequest) {
        SpringRequest createdSpringRequest = springRequestService.createSpringRequest(springRequest);
        return new ResponseEntity<>(createdSpringRequest, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<SpringRequest> updateSpringRequest(@PathVariable Long id, @RequestBody SpringRequest springRequest) {
        SpringRequest updatedSpringRequest = springRequestService.updateSpringRequest(id, springRequest);
        return new ResponseEntity<>(updatedSpringRequest, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSpringRequest(@PathVariable Long id) {
        springRequestService.deleteSpringRequest(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/task/{taskId}")
    public ResponseEntity<Optional<SpringRequest>> getByCamundaTaskId(@PathVariable String taskId) {
        Optional<SpringRequest> springRequest = springRequestService.getByCamundaTaskId(taskId);
        return new ResponseEntity<>(springRequest, HttpStatus.OK);
    }
}
