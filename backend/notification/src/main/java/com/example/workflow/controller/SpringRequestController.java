package com.example.workflow.controller;

import com.example.workflow.dto.SpringRequestDTO;
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
    public List<SpringRequestDTO> getAllSpringRequests() {
        return springRequestService.getAllSpringRequests();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SpringRequestDTO> getSpringRequestById(@PathVariable Long id) {
        SpringRequestDTO springRequestDTO = springRequestService.getSpringRequestById(id);
        return ResponseEntity.ok(springRequestDTO);
    }

    @PostMapping
    public SpringRequestDTO createSpringRequest(@RequestBody SpringRequestDTO springRequestDTO) {
        return springRequestService.createSpringRequest(springRequestDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SpringRequestDTO> updateSpringRequest(@PathVariable Long id, @RequestBody SpringRequestDTO springRequestDTO) {
        SpringRequestDTO updatedSpringRequest = springRequestService.updateSpringRequest(id, springRequestDTO);
        return ResponseEntity.ok(updatedSpringRequest);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSpringRequest(@PathVariable Long id) {
        springRequestService.deleteSpringRequest(id);
        return ResponseEntity.noContent().build();
    }
}
