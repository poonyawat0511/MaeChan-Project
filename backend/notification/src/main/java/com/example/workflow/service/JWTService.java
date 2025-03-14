package com.example.workflow.service;

import java.util.Map;

import org.springframework.security.core.userdetails.UserDetails;

public interface JWTService {

    String extractUserName(String token);

    String generateToken(UserDetails userDetails);

    boolean isTokenValid(String token, UserDetails userDetails);

    String generateRefreshToken(Map<String , Object> extraClaim ,UserDetails userDetails);

    String extractRole(String token);

    Long extractStockUserId(String token);
    
    String extractFirstName(String token);

    String extractLastName(String token);
}
