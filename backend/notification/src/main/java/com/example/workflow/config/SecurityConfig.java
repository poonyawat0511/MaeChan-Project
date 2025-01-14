package com.example.workflow.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SecurityConfig implements WebMvcConfigurer {

    // Configuring HTTP security with a SecurityFilterChain
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors() // Enable CORS
            .and()
            .authorizeHttpRequests() // Updated to use 'authorizeHttpRequests'
                .requestMatchers("/engine-rest/**").permitAll() // Allow access to Camunda REST API without authentication
                .requestMatchers("/camunda/**").permitAll() // Allow access to Camunda UI without authentication
                .anyRequest().permitAll() // Allow all other requests without authentication
            .and()
            .csrf().disable(); // Disable CSRF protection if needed (for non-browser clients)

        return http.build();
    }

    // Configure CORS mappings
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Allow all paths
            .allowedOrigins("http://localhost:3000", "http://localhost:8081" ,"http://192.168.0.109:3000")  // Allowed origins
            .allowedMethods("GET", "POST", "PUT","PATCH","DELETE")  // Allowed HTTP methods
            .allowedHeaders("*")  // Allow all headers
            .allowCredentials(true);  // Allow credentials (cookies)
    }
}
