package com.example.workflow.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.workflow.model.UserHospital;

import com.example.workflow.dto.ForgotPasswordDto;
import com.example.workflow.service.UserHospitalService;

@RestController
@RequestMapping("/forgot-password")
public class PasswordController {

    @Autowired
    private UserHospitalService userHospitalService;

    @PostMapping
    public ResponseEntity<UserHospital> forgotPassword(@RequestBody ForgotPasswordDto forgotPasswordDto) {
        UserHospital result = userHospitalService.validateAndProcessForgotPassword(forgotPasswordDto);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
