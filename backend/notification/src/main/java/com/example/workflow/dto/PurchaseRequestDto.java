package com.example.workflow.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseRequestDto {
    private Long id;
    private Integer rowNumber; // เพิ่มฟิลด์ rowNumber
    private String documentNumber;
    private String mainInventory;
    private Integer requestType;
    private String item;
    private Integer itemCount;
    private Double itemPrice;
    private Double sumPrice;
    private Double budgetReceived;
    private Double budgetUsed;
    private Double budgetLeft;
    private String buyingMethod;
    private Integer budgetType;
    private String requester;
    private LocalDate createDate;
    private LocalDate dueDate;
    private String inspector;
    private Boolean inspectStatus;
    private String approver;
    private Boolean approvedStatus;
    private LocalDate approvedDate;
    private String buyingDocStatus;
    private String buyingDocNumber;
}
