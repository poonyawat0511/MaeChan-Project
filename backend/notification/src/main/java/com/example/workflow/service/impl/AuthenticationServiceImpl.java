package com.example.workflow.service.impl;

import java.util.HashMap;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.workflow.dto.JwtAuthenticationResponse;
import com.example.workflow.dto.RefreshTokenRequest;
import com.example.workflow.dto.SignUpRequest;
import com.example.workflow.dto.SigninRequest;
import com.example.workflow.model.Role;
import com.example.workflow.model.StockUser;
import com.example.workflow.repository.StockUserRepository;
import com.example.workflow.service.AuthenticationService;
import com.example.workflow.service.JWTService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService{
    
    private  final StockUserRepository stockUserRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JWTService jwtService;

    public StockUser signup(SignUpRequest signUpRequest){
        StockUser stockUser = new StockUser();

        stockUser.setStockUserName(signUpRequest.getStockUser());
        stockUser.setEmail(signUpRequest.getEmail());
        stockUser.setFirstName(signUpRequest.getFirstName());
        stockUser.setLastName(signUpRequest.getLastName());
        stockUser.setRole(signUpRequest.getRole() != null ? signUpRequest.getRole() : Role.USER);
        stockUser.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));

        return stockUserRepository.save(stockUser);

    }

    public JwtAuthenticationResponse signin(SigninRequest signinRequest){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signinRequest.getEmail(), signinRequest.getPassword()));

        var stockUser = stockUserRepository.findByEmail(signinRequest.getEmail()).orElseThrow(()-> new IllegalArgumentException("Invalid email or password."));
        var jwt = jwtService.generateToken(stockUser);
        var refreshToken = jwtService.generateRefreshToken(new HashMap<>(),stockUser);

        JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();

        jwtAuthenticationResponse.setToken(jwt);
        jwtAuthenticationResponse.setRefreshToken(refreshToken);
        return jwtAuthenticationResponse;
    }

    public JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest){
        String userEmail = jwtService.extractUserName(refreshTokenRequest.getToken());
        StockUser stockUser = stockUserRepository.findByEmail(userEmail).orElseThrow();
        if(jwtService.isTokenValid(refreshTokenRequest.getToken(),stockUser)){
            var jwt = jwtService.generateToken(stockUser);

            JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();

            jwtAuthenticationResponse.setToken(jwt);
            jwtAuthenticationResponse.setRefreshToken(refreshTokenRequest.getToken());
            return jwtAuthenticationResponse;
        }
        return null;
    }
}
