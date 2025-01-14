package com.example.workflow.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Column;
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
@Table(name = "purchase_requests")
public class PurchaseRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer rowNumber; // ลำดับ
    private String documentNumber; // เลขที่เอกสาร
    private String mainInventory; // งานคลัง
    private Integer requestType; // ประเภทคำขอ (1-3)
    private String item; // ของที่ซื้อ
    private Integer itemCount; // จำนวนชิ้น
    private BigDecimal itemPrice; // ราคาต่อชิ้น
    private BigDecimal sumPrice; // รวม
    private BigDecimal budgetReceived; // งบที่ได้รับ
    private BigDecimal budgetUsed; // งบที่ใช้ไป
    private BigDecimal budgetLeft; // งบที่เหลือ
    private String buyingMethod; // การซื้อ (เฉพาะเจาะจง)
    private Integer budgetType; // ประเภทงบ (1-4)
    private String requester; // ผู้ขอ

    @Column(name = "create_date")
    private LocalDate createDate;     // วันที่สร้าง

    @Column(name = "due_date")
    private LocalDate dueDate; // วันที่ครบกำหนด

    private String inspector; // ผู้ตรวจสอบ
    private Boolean inspectStatus; // สถานะการตรวจสอบ
    private String approver; // ผู้อนุมัติ
    private Boolean approvedStatus; // สถานะการอนุมัติ

    @Column(name = "approved_date")
    private LocalDate approvedDate; // วันที่อนุมัติ

    private String buyingDocStatus; // สถานะใบขอซื้อหลังอนุมัติแล้ว
    private String buyingDocNumber; // เลขใบขอซื้อ
}
