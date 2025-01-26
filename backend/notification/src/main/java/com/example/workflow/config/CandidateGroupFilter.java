package com.example.workflow.config;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CandidateGroupFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String candidateGroup = request.getParameter("candidateGroup");

        if (candidateGroup != null) {
            // ดึงข้อมูล Authentication ปัจจุบัน
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication != null && authentication.isAuthenticated()) {
                // ตรวจสอบว่าผู้ใช้มี Authority ตรงกับ candidateGroup หรือไม่
                boolean hasAuthority = authentication.getAuthorities().stream()
                        .anyMatch(authority -> authority.getAuthority().equalsIgnoreCase(candidateGroup));

                if (!hasAuthority) {
                    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    response.getWriter().write("Access Denied: Insufficient Permissions for Candidate Group");
                    return;
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}

