package com.example.workflow.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
public class AuthenticationServiceImpl implements AuthenticationService {

    private final StockUserRepository stockUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    private static final String UPLOAD_DIR = "uploads/signatures/";

    public StockUser signup(SignUpRequest signUpRequest) {
        StockUser stockUser = new StockUser();
        stockUser.setLineId(signUpRequest.getLineId());
        stockUser.setUserHospitalId(signUpRequest.getUserHospitalId());
        stockUser.setSignaturePath(UPLOAD_DIR);
        stockUser.setEmail(signUpRequest.getEmail());
        stockUser.setFirstName(signUpRequest.getFirstName());
        stockUser.setLastName(signUpRequest.getLastName());
        stockUser.setRole(signUpRequest.getRole() != null ? signUpRequest.getRole() : Role.USER);
        stockUser.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));

        // Handle signature file upload
        if (signUpRequest.getSignature() != null && !signUpRequest.getSignature().isEmpty()) {
            String filePath = saveFile(signUpRequest.getSignature());
            stockUser.setSignaturePath(filePath);
        }

        return stockUserRepository.save(stockUser);
    }

    public JwtAuthenticationResponse signin(SigninRequest signinRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                signinRequest.getEmail(), signinRequest.getPassword()));

        var stockUser = stockUserRepository.findByEmail(signinRequest.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));
        var jwt = jwtService.generateToken(stockUser);
        var refreshToken = jwtService.generateRefreshToken(new HashMap<>(), stockUser);

        JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
        jwtAuthenticationResponse.setToken(jwt);
        jwtAuthenticationResponse.setRefreshToken(refreshToken);
        return jwtAuthenticationResponse;
    }

    public JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        String userEmail = jwtService.extractUserName(refreshTokenRequest.getToken());
        StockUser stockUser = stockUserRepository.findByEmail(userEmail).orElseThrow();
        if (jwtService.isTokenValid(refreshTokenRequest.getToken(), stockUser)) {
            var jwt = jwtService.generateToken(stockUser);

            JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
            jwtAuthenticationResponse.setToken(jwt);
            jwtAuthenticationResponse.setRefreshToken(refreshTokenRequest.getToken());
            return jwtAuthenticationResponse;
        }
        return null;
    }

    private String saveFile(MultipartFile file) {
        try {
            // Ensure directory exists
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Generate a unique file name
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);

            // Save file
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            return filePath.toString(); // Return stored file path
        } catch (IOException e) {
            throw new RuntimeException("Failed to store signature file", e);
        }
    }
}
