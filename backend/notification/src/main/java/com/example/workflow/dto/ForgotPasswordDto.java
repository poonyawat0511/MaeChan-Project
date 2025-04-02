package com.example.workflow.dto;

import lombok.Data;

@Data
public class ForgotPasswordDto {
    private String firstName;
    private String lastName;
    private String email;
    private String newPassword;
    private String confirmPassword;
}
