package com.example.workflow.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.workflow.exception.userHospital.UserHospitalNotFoundException;
import com.example.workflow.model.UserHospital;
import com.example.workflow.repository.UserHospitalRepository;

@Service
public class UserHospitalService {

    @Autowired
    private UserHospitalRepository userHospitalRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public UserHospital createUserHospital(UserHospital userHospital) {
        return userHospitalRepository.save(userHospital);
    }

    public Page<UserHospital> findAllUserHospitals(String search, Pageable pageable) {
        if (search == null || search.isBlank()) {
            return userHospitalRepository.findAll(pageable);
        }
        return userHospitalRepository
                .findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
                        search, search, search, pageable
                );
    }

    public List<UserHospital> findAllUserHospital() {
        return userHospitalRepository.findAll();
    }

    public UserHospital findUserHospitalById(Long userHospitalId) {
        return userHospitalRepository.findById(userHospitalId)
                .orElseThrow(() -> new UserHospitalNotFoundException(userHospitalId));
    }

    public UserHospital updateUserHospital(UserHospital updatedUserHospital) {
        return userHospitalRepository.findById(updatedUserHospital.getId())
                .map(existingUserHospital -> {
                    existingUserHospital.setEmail(updatedUserHospital.getEmail());
                    existingUserHospital.setFirstName(updatedUserHospital.getFirstName());
                    existingUserHospital.setLastName(updatedUserHospital.getLastName());
                    existingUserHospital.setLineId(updatedUserHospital.getLineId());
                    existingUserHospital.setRole(updatedUserHospital.getRole());
                    existingUserHospital.setSignaturePath(updatedUserHospital.getSignaturePath());
    
                    if (updatedUserHospital.getPassword() != null && !updatedUserHospital.getPassword().isEmpty()) {
                        String hashedPassword = passwordEncoder.encode(updatedUserHospital.getPassword());
                        existingUserHospital.setPassword(hashedPassword);
                    }
    
                    return userHospitalRepository.save(existingUserHospital);
                })
                .orElseThrow(() -> new UserHospitalNotFoundException(updatedUserHospital.getId()));
    }

    public void deleteUserHospitalById(Long userHospitalId) {
        if (!userHospitalRepository.existsById(userHospitalId)) {
            throw new UserHospitalNotFoundException(userHospitalId);
        }
        userHospitalRepository.deleteById(userHospitalId);
    }
}
