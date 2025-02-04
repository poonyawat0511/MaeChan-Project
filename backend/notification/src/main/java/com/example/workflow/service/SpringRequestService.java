package com.example.workflow.service;

import com.example.workflow.dto.SpringRequestDTO;
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

    public List<SpringRequestDTO> getAllSpringRequests() {
        return springRequestRepository.findAll().stream()
                .map(springRequestMapper::toDTO)
                .collect(Collectors.toList());
    }

    public SpringRequestDTO getSpringRequestById(Long id) {
        SpringRequest springRequest = springRequestRepository.findById(id).orElseThrow(() -> new RuntimeException("SpringRequest not found"));
        return springRequestMapper.toDTO(springRequest);
    }

    public SpringRequestDTO createSpringRequest(SpringRequestDTO springRequestDTO) {
        SpringRequest springRequest = springRequestMapper.toEntity(springRequestDTO);
        springRequest = springRequestRepository.save(springRequest);
        return springRequestMapper.toDTO(springRequest);
    }

    public SpringRequestDTO updateSpringRequest(Long id, SpringRequestDTO springRequestDTO) {
        SpringRequest existingSpringRequest = springRequestRepository.findById(id).orElseThrow(() -> new RuntimeException("SpringRequest not found"));
        SpringRequest updatedSpringRequest = springRequestMapper.toEntity(springRequestDTO);
        updatedSpringRequest.setId(existingSpringRequest.getId());
        updatedSpringRequest = springRequestRepository.save(updatedSpringRequest);
        return springRequestMapper.toDTO(updatedSpringRequest);
    }

    public void deleteSpringRequest(Long id) {
        springRequestRepository.deleteById(id);
    }
}
