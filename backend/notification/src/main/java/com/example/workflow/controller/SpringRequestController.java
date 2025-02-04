package com.example.workflow.controller;

import com.example.workflow.dto.SpringRequestDto;
import com.example.workflow.service.SpringRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/spring-requests")
public class SpringRequestController {

    @Autowired
    private SpringRequestService springRequestService;

    @GetMapping
    public List<SpringRequestDto> getAllSpringRequests() {
        return springRequestService.getAllSpringRequests();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SpringRequestDto> getSpringRequestById(@PathVariable Long id) {
        SpringRequestDto springRequestDTO = springRequestService.getSpringRequestById(id);
        return ResponseEntity.ok(springRequestDTO);
    }

    @PostMapping
    public SpringRequestDto createSpringRequest(@RequestBody SpringRequestDto springRequestDTO) {
        return springRequestService.createSpringRequest(springRequestDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SpringRequestDto> updateSpringRequest(@PathVariable Long id, @RequestBody SpringRequestDto springRequestDTO) {
        SpringRequestDto updatedSpringRequest = springRequestService.updateSpringRequest(id, springRequestDTO);
        return ResponseEntity.ok(updatedSpringRequest);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSpringRequest(@PathVariable Long id) {
        springRequestService.deleteSpringRequest(id);
        return ResponseEntity.noContent().build();
    }
}
