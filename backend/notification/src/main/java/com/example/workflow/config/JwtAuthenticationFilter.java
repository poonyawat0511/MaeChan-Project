package com.example.workflow.config;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.workflow.service.JWTService;
import com.example.workflow.service.UserService;

import io.jsonwebtoken.ExpiredJwtException;
import io.micrometer.common.util.StringUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JWTService jwtService;
    private final UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        String jwt = null;
        String userEmail = null;

        try {
            // Check for JWT in the Authorization header
            if (StringUtils.isNotEmpty(authHeader) && authHeader.startsWith("Bearer ")) {
                jwt = authHeader.substring(7); // Extract the token
            } else {
                // Check for JWT in cookies
                jwt = getJwtFromCookie(request);
            }

            // If no JWT is found, continue the filter chain
            if (StringUtils.isEmpty(jwt)) {
                filterChain.doFilter(request, response);
                return;
            }

            // Extract user email from the JWT
            userEmail = jwtService.extractUserName(jwt);

            // If email is not empty and no user is already authenticated
            if (StringUtils.isNotEmpty(userEmail) && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userService.userDetailsService().loadUserByUsername(userEmail);

                // Validate token and user
                if (userDetails != null && jwtService.isTokenValid(jwt, userDetails)) {
                    SecurityContext securityContext = SecurityContextHolder.createEmptyContext();

                    UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities()
                    );

                    token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    securityContext.setAuthentication(token);
                    SecurityContextHolder.setContext(securityContext);
                }
            }

            filterChain.doFilter(request, response);

        } catch (ExpiredJwtException e) {
            // 🛑 Handle expired token: Remove cookie and return 401 Unauthorized
            deleteJwtCookie(response);
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token expired. Please log in again.");
        }
    }

    /**
     * Extracts the JWT token from the "jwt" cookie.
     */
    private String getJwtFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwt".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    /**
     * Deletes the "jwt" cookie when the token expires.
     */
    private void deleteJwtCookie(HttpServletResponse response) {
        Cookie expiredCookie = new Cookie("jwt", null);
        expiredCookie.setHttpOnly(true);
        expiredCookie.setSecure(true);
        expiredCookie.setPath("/");
        expiredCookie.setMaxAge(-1); // Immediately delete
        response.addCookie(expiredCookie);
    }
}
