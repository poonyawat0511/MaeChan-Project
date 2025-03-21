package com.example.workflow.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.workflow.model.Officer;
import com.example.workflow.repository.OfficerRepository;

@Service
public class OfficerService {

    @Autowired
    OfficerRepository officerRepository;

    public Officer createOfficer(Officer officer) {
        return officerRepository.save(officer);
    }

    public List<Officer> findAllOfficer() {
        return officerRepository.findAll();
    }

    public Officer findOfficerById(Long id) {
        Optional<Officer> officer = officerRepository.findById(id);
        return officer.orElse(null);
    }

    public Officer updateOfficer(Officer updatedOfficer) {
        return officerRepository.findById(updatedOfficer.getOfficerId())
                .map(existingOfficer -> {
                    existingOfficer.setOfficerId(updatedOfficer.getOfficerId());
                    existingOfficer.setOfficerName(updatedOfficer.getOfficerName());
                    return officerRepository.save(existingOfficer);
                })
                .orElseThrow(() -> new RuntimeException("Officer not found with id: " + updatedOfficer.getOfficerId()));
    }

    public String deleteOfficerById(Long id) {
        officerRepository.deleteById(id);
        return "Officer id:" + id + " has been deleted";
    }
}
