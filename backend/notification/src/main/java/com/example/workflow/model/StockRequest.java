package com.example.workflow.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "stock_request")
public class StockRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private Long requestId;

    @Column(name = "request_date")
    private LocalDate requestDate;

    @Column(name = "request_no")
    private String requestNo;

    @Column(name = "request_receive_date")
    private LocalDate requestReceiveDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "request_warehouse_id", referencedColumnName = "warehouse_id")
    @NotFound(action = NotFoundAction.IGNORE)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "warehouseId")
    private StockWarehouse requestWarehouseId;

    @Column(name = "request_complete")
    private Boolean requestComplete;

    @Column(name = "use_date")
    private LocalDate useDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "stock_po_id", referencedColumnName = "stock_po_id")
    @NotFound(action = NotFoundAction.IGNORE)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "stockPoId")
    private StockPo stockPoId;

    @Column(name = "hos_guid")
    private String hosGuid;

    @Column(name = "bdg_year")
    private Integer budgetYear;

    @Column(name = "stock_subject")
    private String stockSubject;

    @Column(name = "stock_subject_person")
    private String stockSubjectPerson;

    @Column(name = "supplier_id")
    private Long supplierId;

    @Column(name = "department_id")
    private Long departmentId;

    private String note;

    @Column(name = "transport_day")
    private Integer transportDay;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "budget_id", referencedColumnName = "budget_id")
    @NotFound(action = NotFoundAction.IGNORE)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "budgetId")
    private StockBudget budgetId;

    @Column(name = "runnumber")
    private Integer runNumber;

    @Column(name = "number_year")
    private String numberYear;

    @Column(name = "number_month")
    private String numberMonth;

    @Column(name = "stock_request_doc_id")
    private Long stockRequestDocId;

    @Column(name = "project_id")
    private Long projectId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "stock_user_approve_id", referencedColumnName = "id")
    private StockUser stockUserApprove;

    @Column(name = "stock_approve_date")
    private LocalDate stockApproveDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "stock_user_id", referencedColumnName = "id")
    private StockUser stockUser;

    @Column(name = "stock_request_document_id")
    private Long stockRequestDocumentId;

    @Column(name = "project_plan_id")
    private Long projectPlanId;

    @Column(name = "request_all_complete")
    private Boolean requestAllComplete;

    @Column(name = "budget_runno")
    private Integer budgetRunNo;

    private Boolean approve;

    @Column(name = "request_tag_no")
    private String requestTagNo;

    @Column(name = "request_time")
    private LocalTime requestTime;

    @Column(name = "purchase_type")
    private Long purchaseType;

    @Column(name = "stock_budget_total")
    private BigDecimal stockBudgetTotal;

    @Column(name = "stock_budget_use")
    private BigDecimal stockBudgetUse;

    @Column(name = "stock_budget_remain")
    private BigDecimal stockBudgetRemain;

    private Integer trimester;

    @Column(name = "vat_percent")
    private BigDecimal vatPercent;

    @Column(name = "request_reason")
    private String requestReason;

    @Column(name = "request_total_price")
    private BigDecimal requestTotalPrice;

    @Column(name = "request_item_count")
    private Integer requestItemCount;

    @Column(name = "stock_budget_pr_use")
    private BigDecimal stockBudgetPrUse;

    @Column(name = "stock_budget_pr_remain")
    private BigDecimal stockBudgetPrRemain;

    @Column(name = "officer_list")
    private String officerList;

    @Column(name = "stock_po_no_list")
    private String stockPoNoList;

    @Column(name = "stock_budget_type_id")
    private Long stockBudgetTypeId;

    @Column(name = "dep_request_no_list")
    private String depRequestNoList;

    // Add constructor to accept Long argument
    public StockRequest(Long requestId) {
        this.requestId = requestId;
    }
}
