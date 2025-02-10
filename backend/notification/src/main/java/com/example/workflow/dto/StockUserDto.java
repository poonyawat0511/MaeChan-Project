package com.example.workflow.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StockUserDto {

    private Long stockUserId;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String lineId;
    private String signature;
    private String userHospitalId;
    private String role;
}
