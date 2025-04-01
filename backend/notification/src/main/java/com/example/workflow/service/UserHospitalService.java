package com.example.workflow.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.workflow.model.UserHospital;
import com.example.workflow.repository.UserHospitalRepository;
import com.example.workflow.dto.ForgotPasswordDto;

@Service
public class UserHospitalService {

    @Autowired
    private UserHospitalRepository userHospitalRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public UserHospital createUserHospital(UserHospital userHospital) {
        return userHospitalRepository.save(userHospital);
    }

    public Page<UserHospital> findAllUserHospitals(Pageable pageable){
        return userHospitalRepository.findAll(pageable);
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
                    existingUserHospital.setFirstName(updatedUserHospital.getFirstName());
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

    public String validateAndProcessForgotPassword(ForgotPasswordDto forgotPasswordDto) {
        // Check if passwords match
        if (!forgotPasswordDto.getNewPassword().equals(forgotPasswordDto.getConfirmPassword())) {
            return "PASSWORDS_DO_NOT_MATCH";
        }

        // Check if password meets minimum length requirement
        if (forgotPasswordDto.getNewPassword().length() < 8) {
            return "PASSWORD_TOO_SHORT";
        }

        UserHospital userHospital = userHospitalRepository.findByFirstNameAndLastNameAndEmail(
            forgotPasswordDto.getFirstName(),
            forgotPasswordDto.getLastName(),
            forgotPasswordDto.getEmail()
        );

        if (userHospital == null) {
            return "USER_NOT_FOUND";
        }

        // Encrypt the new password before saving
        String hashedPassword = passwordEncoder.encode(forgotPasswordDto.getNewPassword());
        userHospital.setPassword(hashedPassword);
        userHospitalRepository.save(userHospital);
        return "SUCCESS";
    }
}
