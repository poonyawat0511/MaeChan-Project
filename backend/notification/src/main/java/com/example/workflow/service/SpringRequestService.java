package com.example.workflow.service;

import com.example.workflow.dto.SpringRequestDto;
import com.example.workflow.mapper.SpringRequestMapper;
import com.example.workflow.model.SpringRequest;
import com.example.workflow.repository.SpringRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SpringRequestService {

    @Autowired
    private SpringRequestRepository springRequestRepository;

    @Autowired
    private SpringRequestMapper springRequestMapper;

    public List<SpringRequest> getAllSpringRequests() {
        return springRequestRepository.findAll();
    }

    public SpringRequest getSpringRequestById(Long id) {
        return springRequestRepository.findById(id).orElseThrow(() -> new RuntimeException("SpringRequest not found"));
    }

    public SpringRequest createSpringRequest(SpringRequest springRequest) {
        return springRequestRepository.save(springRequest);
    }

    public SpringRequest updateSpringRequest(Long id, SpringRequest springRequest) {
        SpringRequest existingSpringRequest = springRequestRepository.findById(id).orElseThrow(() -> new RuntimeException("SpringRequest not found"));
        springRequest.setId(existingSpringRequest.getId());
        return springRequestRepository.save(springRequest);
    }

    public void deleteSpringRequest(Long id) {
        springRequestRepository.deleteById(id);
    }
}
