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

    private Long stockUserId;  // Primary key
    private String stockUserName;  // ชื่อผู้ใช้
}
