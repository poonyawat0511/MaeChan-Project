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
import com.example.workflow.model.UserHospital;
import com.example.workflow.repository.UserHospitalRepository;
import com.example.workflow.service.AuthenticationService;
import com.example.workflow.service.JWTService;
import com.example.workflow.repository.StockUserRepository;
import com.example.workflow.model.StockUser;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserHospitalRepository userHospitalRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;
    private final StockUserRepository stockUserRepository;

    private static final String UPLOAD_DIR = "uploads/signatures/";

    public UserHospital signup(SignUpRequest signUpRequest) {
        UserHospital userHospital = new UserHospital();
        userHospital.setLineId(signUpRequest.getLineId());
        userHospital.setStockUserId(signUpRequest.getStockUserId());
        userHospital.setSignaturePath(UPLOAD_DIR);
        userHospital.setEmail(signUpRequest.getEmail());
        userHospital.setFirstName(signUpRequest.getFirstName());
        userHospital.setLastName(signUpRequest.getLastName());
        userHospital.setRole(signUpRequest.getRole() != null ? signUpRequest.getRole() : Role.USER);
        userHospital.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));

        // Handle signature file upload
        if (signUpRequest.getSignature() != null && !signUpRequest.getSignature().isEmpty()) {
            String filePath = saveFile(signUpRequest.getSignature());
            userHospital.setSignaturePath(filePath);
        }

        //get StockUser from firstName and lastName
        //and update to UserHospital
        StockUser user = stockUserRepository.findByFirstNameAndLastName(signUpRequest.getFirstName(), signUpRequest.getLastName())
                .orElse(null);
        if(user == null){
            System.out.println("Can't find stockUser ID from firstName and lastName");
            return null;
        }else{
            userHospital.setStockUserId(user.getId());
            System.out.println("match " + userHospital.getFirstName() + " "+ userHospital.getLastName() + "with StockUser ID : " + userHospital.getStockUserId());
            return userHospitalRepository.save(userHospital);
        }
    }

    public JwtAuthenticationResponse signin(SigninRequest signinRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                signinRequest.getEmail(), signinRequest.getPassword()));

        var userHospital = userHospitalRepository.findByEmail(signinRequest.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));
        var jwt = jwtService.generateToken(userHospital);
        var refreshToken = jwtService.generateRefreshToken(new HashMap<>(), userHospital);

        JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
        jwtAuthenticationResponse.setToken(jwt);
        jwtAuthenticationResponse.setRefreshToken(refreshToken);
        return jwtAuthenticationResponse;
    }

    public JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        String userEmail = jwtService.extractUserName(refreshTokenRequest.getToken());
        UserHospital userHospital = userHospitalRepository.findByEmail(userEmail).orElseThrow();
        if (jwtService.isTokenValid(refreshTokenRequest.getToken(), userHospital)) {
            var jwt = jwtService.generateToken(userHospital);

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
