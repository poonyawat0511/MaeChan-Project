package com.example.workflow.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

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

    public List<UserHospital> findAllUserHospital() {
        return userHospitalRepository.findAll();
    }

    public UserHospital findUserHospitalById(Long userHospitalId) {
        Optional<UserHospital> userHospital = userHospitalRepository.findById(userHospitalId);
        return userHospital.orElse(null);
    }

    public UserHospital updateUserHospital(UserHospital updatedUserHospital) {
        return userHospitalRepository.findById(updatedUserHospital.getId())
                .map(existingUserHospital -> {
                    existingUserHospital.setEmail(updatedUserHospital.getEmail());
                    existingUserHospital.setFirstName(updatedUserHospital.getLastName());
                    existingUserHospital.setLastName(updatedUserHospital.getLastName());
                    existingUserHospital.setLineId(updatedUserHospital.getLineId());
                    existingUserHospital.setRole(updatedUserHospital.getRole());
                    existingUserHospital.setSignaturePath(updatedUserHospital.getSignaturePath());
                    existingUserHospital.setId(updatedUserHospital.getId());

                    if (updatedUserHospital.getPassword() != null && !updatedUserHospital.getPassword().isEmpty()) {
                        String hashedPassword = passwordEncoder.encode(updatedUserHospital.getPassword());
                        existingUserHospital.setPassword(hashedPassword);
                    }

                    return userHospitalRepository.save(existingUserHospital);
                })
                .orElseThrow(() -> new RuntimeException("UserHospital not found with id: " + updatedUserHospital.getId()));
    }

    public String deleteUserHospitalById(Long userHospitalId) {
        userHospitalRepository.deleteById(userHospitalId);
        return "UserHospital id:" + userHospitalId + " has been deleted";
    }
}
