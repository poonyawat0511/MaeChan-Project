package com.example.workflow.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
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
            return ResponseEntity.status(401).build();
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
            return ResponseEntity.status(401).build();
        }
    }

    @PostMapping(value = "/signup", consumes = { "multipart/form-data" })
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
    public ResponseEntity<JwtAuthenticationResponse> signin(@RequestBody SigninRequest signinRequest,
            HttpServletResponse response) {
        JwtAuthenticationResponse jwtResponse = authenticationService.signin(signinRequest);

        // Use ResponseCookie so we can include SameSite=None (required for cross-site cookies)
        ResponseCookie jwtCookie = ResponseCookie.from("jwt", jwtResponse.getToken())
                .httpOnly(true)
                .secure(true)       // must be true for SameSite=None and HTTPS
                .sameSite("Lax")   // required for cross-site (frontend <-> api on different origins)
                .path("/")
                .maxAge(24 * 60 * 60)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, jwtCookie.toString());

        ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", jwtResponse.getRefreshToken())
                .httpOnly(true)
                .secure(true)
                .sameSite("Lax")
                .path("/")
                .maxAge(7 * 24 * 60 * 60)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());

        return ResponseEntity.ok(jwtResponse);
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtAuthenticationResponse> refresh(@RequestBody RefreshTokenRequest refreshTokenRequest,
            HttpServletResponse response) {

        JwtAuthenticationResponse jwtResponse = authenticationService.refreshToken(refreshTokenRequest);

        ResponseCookie jwtCookie = ResponseCookie.from("jwt", jwtResponse.getToken())
                .httpOnly(true)
                .secure(true)
                .sameSite("Lax")
                .path("/")
                .maxAge(24 * 60 * 60)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, jwtCookie.toString());

        ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", jwtResponse.getRefreshToken())
                .httpOnly(true)
                .secure(true)
                .sameSite("Lax")
                .path("/")
                .maxAge(7 * 24 * 60 * 60)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());

        return ResponseEntity.ok(jwtResponse);
    }

    @PostMapping("/signout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        // Remove cookies by setting Max-Age=0 and same attributes used when creating them
        ResponseCookie jwtCookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(true)
                .sameSite("Lax")
                .path("/")
                .maxAge(0)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, jwtCookie.toString());

        ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(true)
                .sameSite("Lax")
                .path("/")
                .maxAge(0)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());

        return ResponseEntity.ok().build();
    }
}
