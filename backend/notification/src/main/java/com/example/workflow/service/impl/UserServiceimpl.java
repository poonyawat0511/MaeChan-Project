package com.example.workflow.service.impl;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.workflow.repository.UserHospitalRepository;
import com.example.workflow.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceimpl implements UserService {

    private final UserHospitalRepository userHospitalRepository;

    @Override
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) {

                return userHospitalRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("userHospital not found"));
            }
        };
    }
}
