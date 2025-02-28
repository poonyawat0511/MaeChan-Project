package com.example.workflow.service;

import com.example.workflow.dto.JwtAuthenticationResponse;
import com.example.workflow.dto.RefreshTokenRequest;
import com.example.workflow.dto.SignUpRequest;
import com.example.workflow.dto.SigninRequest;
import com.example.workflow.model.UserHospital;

public interface AuthenticationService {
    UserHospital signup(SignUpRequest signUpRequest);

    JwtAuthenticationResponse signin(SigninRequest signinRequest);

    JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
}
