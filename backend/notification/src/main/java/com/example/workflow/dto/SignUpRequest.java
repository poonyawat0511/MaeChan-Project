package com.example.workflow.dto;

import org.springframework.web.multipart.MultipartFile;

import com.example.workflow.model.Role;

import lombok.Data;

@Data
public class SignUpRequest {
    private String stockUser;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String lineId;
    private MultipartFile signature;
    private String userHospitalId;
    private Role role;
}
