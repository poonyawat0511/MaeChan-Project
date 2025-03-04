package com.example.workflow.dto;

import com.example.workflow.model.StockUser;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserHospitalDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String lineId;
    private String signature;
    private StockUser stockUserId;
    private String role;
}
