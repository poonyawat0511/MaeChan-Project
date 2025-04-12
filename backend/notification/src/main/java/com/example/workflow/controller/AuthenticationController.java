package com.example.workflow.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.workflow.dto.JwtAuthenticationResponse;
import com.example.workflow.dto.RefreshTokenRequest;
import com.example.workflow.dto.SignUpRequest;
import com.example.workflow.dto.SigninRequest;
import com.example.workflow.model.Role;
import com.example.workflow.model.UserHospital;
import com.example.workflow.service.AuthenticationService;
import com.example.workflow.service.JWTService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Validated
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final JWTService jwtService;

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getUserInfo(
            @CookieValue(name = "jwt", required = false) String token) {

        if (token == null || token.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            Map<String, Object> response = new HashMap<>();
            response.put("email", jwtService.extractUserName(token));
            response.put("role", jwtService.extractRole(token));
            response.put("firstName", jwtService.extractFirstName(token));
            response.put("lastName", jwtService.extractLastName(token));
            response.put("id", jwtService.extractStockUserId(token));

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping(value = "/signup", consumes = {"multipart/form-data"})
    public ResponseEntity<UserHospital> signup(
            @Valid @RequestPart("firstName") String firstName,
            @Valid @RequestPart("lastName") String lastName,
            @Valid @RequestPart("email") String email,
            @Valid @RequestPart("lineId") String lineId,
            @Valid @RequestPart("officerId") String officerId,
            @Valid @RequestPart("password") String password,
            @RequestPart(value = "signature", required = false) MultipartFile signature,
            @RequestPart(value = "role", required = false) String role) {

        Role userRole = (role != null) ? Role.valueOf(role.toUpperCase()) : Role.USER;

        SignUpRequest signUpRequest = new SignUpRequest();
        signUpRequest.setFirstName(firstName);
        signUpRequest.setLastName(lastName);
        signUpRequest.setEmail(email);
        signUpRequest.setPassword(password);
        signUpRequest.setOfficerId(Long.valueOf(officerId));
        signUpRequest.setLineId(lineId);
        signUpRequest.setSignature(signature);
        signUpRequest.setRole(userRole);

        return ResponseEntity.ok(authenticationService.signup(signUpRequest));
    }

    @PostMapping("/signin")
    public ResponseEntity<JwtAuthenticationResponse> signin(@RequestBody SigninRequest signinRequest, HttpServletResponse response) {
        JwtAuthenticationResponse jwtResponse = authenticationService.signin(signinRequest);
    
        String jwtCookie = String.format(
            "jwt=%s; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=%d; Domain=.osathi.site",
            jwtResponse.getToken(), 24 * 60 * 60
        );
        response.addHeader("Set-Cookie", jwtCookie);
    
        String refreshCookie = String.format(
            "refreshToken=%s; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=%d; Domain=.osathi.site",
            jwtResponse.getRefreshToken(), 7 * 24 * 60 * 60
        );
        response.addHeader("Set-Cookie", refreshCookie);
    
        return ResponseEntity.ok(jwtResponse);
    }
    

    @PostMapping("/refresh")
    public ResponseEntity<JwtAuthenticationResponse> refresh(@RequestBody RefreshTokenRequest refreshTokenRequest, HttpServletResponse response) {
        JwtAuthenticationResponse jwtResponse = authenticationService.refreshToken(refreshTokenRequest);
    
        response.addHeader("Set-Cookie", String.format(
            "jwt=%s; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=%d; Domain=.osathi.site",
            jwtResponse.getToken(), 24 * 60 * 60
        ));
    
        response.addHeader("Set-Cookie", String.format(
            "refreshToken=%s; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=%d; Domain=.osathi.site",
            jwtResponse.getRefreshToken(), 7 * 24 * 60 * 60
        ));
    
        return ResponseEntity.ok(jwtResponse);
    }
    

    @PostMapping("/signout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        response.addHeader("Set-Cookie", "jwt=; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=0; Domain=.osathi.site");
        response.addHeader("Set-Cookie", "refreshToken=; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=0; Domain=.osathi.site");
        return ResponseEntity.ok().build();
    }
    
}
