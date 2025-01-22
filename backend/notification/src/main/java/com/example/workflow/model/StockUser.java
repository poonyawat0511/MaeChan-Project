package com.example.workflow.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "stock_user")  // ตั้งชื่อตารางในฐานข้อมูล
public class StockUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long stockUserId; // Primary key (auto-generated)

    private String stockUserName; // ชื่อผู้ใช้
}
