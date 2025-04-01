package com.example.workflow.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.workflow.dto.ForgotPasswordDto;
import com.example.workflow.service.UserHospitalService;

@RestController
@RequestMapping("/user")
public class PasswordController {

    @Autowired
    private UserHospitalService userHospitalService;

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordDto forgotPasswordDto) {
        String result = userHospitalService.validateAndProcessForgotPassword(forgotPasswordDto);

        switch (result) {
            case "PASSWORDS_DO_NOT_MATCH":
                return new ResponseEntity<>("New password and confirm password do not match.", HttpStatus.BAD_REQUEST);
            case "PASSWORD_TOO_SHORT":
                return new ResponseEntity<>("Password must be at least 8 characters long.", HttpStatus.BAD_REQUEST);
            case "USER_NOT_FOUND":
                return new ResponseEntity<>("First name, last name, or email does not match any user.", HttpStatus.BAD_REQUEST);
            case "SUCCESS":
                return new ResponseEntity<>("Password updated successfully.", HttpStatus.OK);
            default:
                return new ResponseEntity<>("An unknown error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
