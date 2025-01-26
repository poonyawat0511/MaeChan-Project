package com.example.workflow.dto;

import com.example.workflow.model.Role;

import lombok.Data;

@Data
public class SignUpRequest {
    private String stockUser;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Role role;
}
