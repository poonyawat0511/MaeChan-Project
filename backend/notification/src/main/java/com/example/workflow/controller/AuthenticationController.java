package com.example.workflow.controller;

import org.springframework.http.ResponseEntity;
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
import com.example.workflow.model.StockUser;
import com.example.workflow.model.UserHospital;
import com.example.workflow.service.AuthenticationService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping(value = "/signup", consumes = {"multipart/form-data"})
    public ResponseEntity<StockUser> signup(
            @RequestPart("firstName") String firstName,
            @RequestPart("lastName") String lastName,
            @RequestPart("email") String email,
            @RequestPart("lineId") String lineId,
            @RequestPart("userHospitalId") String userHospitalId,
            @RequestPart("password") String password,
            @RequestPart(value = "signature", required = false) MultipartFile signature,
            @RequestPart(value = "role", required = false) String role) {

        Role userRole = (role != null) ? Role.valueOf(role.toUpperCase()) : Role.USER;

        SignUpRequest signUpRequest = new SignUpRequest();
        signUpRequest.setFirstName(firstName);
        signUpRequest.setLastName(lastName);
        signUpRequest.setEmail(email);
        signUpRequest.setPassword(password);
        signUpRequest.setUserHospitalId(userHospitalId);
        signUpRequest.setLineId(lineId);
        signUpRequest.setSignature(signature);
        signUpRequest.setRole(userRole);

        return ResponseEntity.ok(authenticationService.signup(signUpRequest));
    }

    @PostMapping("/signin")
    public ResponseEntity<JwtAuthenticationResponse> signin(@RequestBody SigninRequest signinRequest, HttpServletResponse response) {
        // Authenticate and generate tokens
        JwtAuthenticationResponse jwtResponse = authenticationService.signin(signinRequest);

        // Set JWT token in a cookie
        Cookie jwtCookie = new Cookie("jwt", jwtResponse.getToken());
        jwtCookie.setHttpOnly(true); // Prevent client-side script access
        jwtCookie.setSecure(true); // Use with HTTPS
        jwtCookie.setPath("/"); // Accessible across the entire application
        jwtCookie.setMaxAge(24 * 60 * 60); // 24 hours in seconds
        response.addCookie(jwtCookie);

        // Set refresh token in a cookie (optional)
        Cookie refreshCookie = new Cookie("refreshToken", jwtResponse.getRefreshToken());
        refreshCookie.setHttpOnly(true);
        refreshCookie.setSecure(true);
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(7 * 24 * 60 * 60); // 7 days in seconds
        response.addCookie(refreshCookie);

        // Return the response (optional)
        return ResponseEntity.ok(jwtResponse);
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtAuthenticationResponse> refresh(@RequestBody RefreshTokenRequest refreshTokenRequest, HttpServletResponse response) {
        // Refresh the tokens
        JwtAuthenticationResponse jwtResponse = authenticationService.refreshToken(refreshTokenRequest);

        // Set the new JWT token in a cookie
        Cookie jwtCookie = new Cookie("jwt", jwtResponse.getToken());
        jwtCookie.setHttpOnly(true);
        jwtCookie.setSecure(true);
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(24 * 60 * 60); // 24 hours in seconds
        response.addCookie(jwtCookie);

        // Set the new refresh token in a cookie (optional)
        Cookie refreshCookie = new Cookie("refreshToken", jwtResponse.getRefreshToken());
        refreshCookie.setHttpOnly(true);
        refreshCookie.setSecure(true);
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(7 * 24 * 60 * 60); // 7 days in seconds
        response.addCookie(refreshCookie);

        // Return the response (optional)
        return ResponseEntity.ok(jwtResponse);
    }

    @PostMapping("/signout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        // Clear the JWT cookie
        Cookie jwtCookie = new Cookie("jwt", null);
        jwtCookie.setHttpOnly(true);
        jwtCookie.setSecure(true);
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(0); // Delete the cookie
        response.addCookie(jwtCookie);

        // Clear the refresh token cookie (optional)
        Cookie refreshCookie = new Cookie("refreshToken", null);
        refreshCookie.setHttpOnly(true);
        refreshCookie.setSecure(true);
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(0); // Delete the cookie
        response.addCookie(refreshCookie);

        return ResponseEntity.ok().build();
    }
}
