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
public class StockRequestDto {
    private Long id;
    private String requestId;
    private LocalDate requestDate;
    private String requestNo;
    private LocalDate requestReceiveDate;
    private String requestWarehouseId;
    private Boolean requestComplete;
    private LocalDate useDate;
    private Long stockPoId;
    private String hosGuid;
    private Integer budgetYear;
    private String stockSubject;
    private String stockSubjectPerson;
    private String supplierId;
    private String departmentId;
    private String note;
    private Integer transportDay;
    private String budgetId;
    private Integer runNumber;
    private Integer numberYear;
    private Integer numberMonth;
    private String stockRequestDocId;
    private String projectId;
    private Long stockUserApprove; // StockUserApprove
    private LocalDate stockApproveDate;
    private Long stockUser; // StockUser
    private String stockRequestDocumentId;
    private String projectPlanId;
    private Boolean requestAllComplete;
    private String budgetRunNo;
    private Boolean approve;
    private String requestTagNo;
    private String requestTime;
    private String purchaseType;
    private Double stockBudgetTotal;
    private Double stockBudgetUse;
    private Double stockBudgetRemain;
    private Integer trimester;
    private Double vatPercent;
    private String requestReason;
    private Double requestTotalPrice;
    private Integer requestItemCount;
    private Double stockBudgetPrUse;
    private Double stockBudgetPrRemain;
    private String officerList;
    private String stockPoNoList;
    private Long stockBudgetTypeId;
    private String depRequestNoList;
}
