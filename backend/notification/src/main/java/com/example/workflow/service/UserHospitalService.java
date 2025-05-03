package com.example.workflow.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.workflow.exception.forgotPassword.FPPasswordNotMatch;
import com.example.workflow.exception.forgotPassword.FPPasswordTooShort;
import com.example.workflow.exception.forgotPassword.FPUserHospitalNotFound;
import com.example.workflow.exception.userHospital.UserHospitalAlreadyExistsException;
import com.example.workflow.exception.userHospital.UserHospitalNotFoundException;
import com.example.workflow.model.Role;
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

    public Page<UserHospital> findAllUserHospitals(String search, Pageable pageable) {
        if (search == null || search.isBlank()) {
            return userHospitalRepository.findAll(pageable);
        }
        return userHospitalRepository
                .findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
                        search, search, search, pageable);
    }

    public List<UserHospital> findAllUserHospital() {
        return userHospitalRepository.findAll();
    }

    public UserHospital findUserHospitalById(Long userHospitalId) {
        return userHospitalRepository.findById(userHospitalId)
                .orElseThrow(() -> new UserHospitalNotFoundException(userHospitalId));
    }

    public UserHospital updateUserHospital(UserHospital updatedUserHospital) {
        Long id = updatedUserHospital.getId();

        Optional<UserHospital> duplicateEmail = userHospitalRepository.findByEmail(updatedUserHospital.getEmail());
        if (duplicateEmail.isPresent() && !duplicateEmail.get().getId().equals(id)) {
            throw new UserHospitalAlreadyExistsException(updatedUserHospital.getEmail());
        }

        return userHospitalRepository.findById(id)
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
                .orElseThrow(() -> new UserHospitalNotFoundException(id));
    }

    public void deleteUserHospitalById(Long userHospitalId) {
        UserHospital user = userHospitalRepository.findById(userHospitalId)
                .orElseThrow(() -> new UserHospitalNotFoundException(userHospitalId));

        // 🚫 Prevent deletion of the main admin account
        if ("admin@gmail.com".equalsIgnoreCase(user.getEmail())) {
            throw new RuntimeException("ไม่สามารถลบบัญชีผู้ดูแลระบบหลักได้");
        }

        userHospitalRepository.deleteById(userHospitalId);
    }

    public UserHospital validateAndProcessForgotPassword(ForgotPasswordDto forgotPasswordDto) {
        // Check if passwords match
        if (!forgotPasswordDto.getNewPassword().equals(forgotPasswordDto.getConfirmPassword())) {
            throw new FPPasswordNotMatch();
        }

        // Check if password meets minimum length requirement
        if (forgotPasswordDto.getNewPassword().length() < 8) {
            throw new FPPasswordTooShort();
        }

        UserHospital userHospital = userHospitalRepository.findByFirstNameAndLastNameAndEmail(
                forgotPasswordDto.getFirstName(),
                forgotPasswordDto.getLastName(),
                forgotPasswordDto.getEmail());

        if (userHospital == null) {
            throw new FPUserHospitalNotFound();
        }

        // Encrypt the new password before saving
        String hashedPassword = passwordEncoder.encode(forgotPasswordDto.getNewPassword());
        userHospital.setPassword(hashedPassword);
        return userHospitalRepository.save(userHospital);
    }

    public UserHospital changeUserRole(Long userId, String newRole) {
        String currentEmail = getAuthenticatedEmail();
        UserHospital currentUser = userHospitalRepository.findByEmail(currentEmail)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));

        UserHospital user = userHospitalRepository.findById(userId)
                .orElseThrow(() -> new UserHospitalNotFoundException(userId));

        // 🚫 Prevent changing the role of the original admin
        if ("admin@gmail.com".equalsIgnoreCase(user.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't Change Role Supper Admin !!!!");
        }

        // 🚫 Prevent self-demotion
        if (currentUser.getId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't Chanage Role While loggin !!!");
        }

        try {
            Role roleEnum = Role.valueOf(newRole.toUpperCase());
            user.setRole(roleEnum);
        } catch (IllegalArgumentException ex) {
            throw new RuntimeException("Invalid role: " + newRole);
        }

        return userHospitalRepository.save(user);
    }

    private String getAuthenticatedEmail() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername(); // email จาก JWT
        } else {
            return principal.toString();
        }
    }

}
