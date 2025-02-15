package com.example.workflow.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.workflow.model.SpringRequest;
import com.example.workflow.repository.SpringRequestRepository;

@Service
public class SpringRequestService {

    @Autowired
    private SpringRequestRepository springRequestRepository;

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

    public Optional<SpringRequest> getByCamundaTaskId(String camundaTaskId) {
        return springRequestRepository.findByCamundaTaskId(camundaTaskId);
    }
}
