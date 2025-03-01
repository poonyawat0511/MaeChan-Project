package com.example.workflow.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
@Table(name = "stock_po")
public class StockPo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "stock_po_id")
    private Long stockPoId;

    //TODO: Add relation
    @Column(name = "warehouse_id")
    private Long warehouseId;

    @Column(name = "stock_po_no")
    private String stockPoNo;

    @Column(name = "stock_po_date")
    private LocalDate stockPoDate;

    @Column(name = "supplier_id")
    private Long supplierId;

    //TODO: Add relation to stock budget
    @Column(name = "budget_id")
    private Long budgetId;

    @Column(name = "item_type")
    private String itemType;

    @Column(name = "purchase_type")
    private String purchaseType;

    @Column(name = "paid_status_id")
    private Long paidStatusId;

    @Column(name = "stock_po_confirm")
    private Boolean stockPoConfirm;

    @Column(name = "po_amount")
    private Double poAmount;

    @Column(name = "po_item_amount")
    private int poItemAmount;

    @Column(name = "bdg_year")
    private Integer bdgYear;

    @Column(name = "supplier_agent_id")
    private Long supplierAgentId;

    @Column(name = "deliver_count")
    private Integer deliverCount;

    @Column(name = "deliver_complete")
    private Boolean deliverComplete;

    @Column(name = "po_type_id")
    private Long poTypeId;

    @Column(name = "stock_po_tax")
    private Boolean stockPoTax;

    @Column(name = "stock_po_vat")
    private Double stockPoVat;

    @Column(name = "stock_po_discount")
    private Double stockPoDiscount;

    @Column(name = "stock_po_discount_total")
    private Double stockPoDiscountTotal;

    @Column(name = "deliver_cancel")
    private Boolean deliverCancel;

    @Column(name = "po_cancel")
    private Boolean poCancel;

    @Column(name = "cancel_reason")
    private String cancelReason;

    @Column(name = "note")
    private String note;

    @Column(name = "reference_id")
    private Long referenceId;

    @Column(name = "delivery_ref_date")
    private LocalDate deliveryRefDate;

    @Column(name = "pr_ref_no")
    private String prRefNo;

    @Column(name = "receive_wo_po")
    private Boolean receiveWoPo;

    @Column(name = "entry_staff")
    private String entryStaff;

    @Column(name = "authorize_staff")
    private String authorizeStaff;

    @Column(name = "entry_datetime")
    private String entryDatetime;

    @Column(name = "authorize_datetime")
    private String authorizeDatetime;

    @Column(name = "hos_guid")
    private String hosGuid;

    @Column(name = "deliver_day")
    private Integer deliverDay;

    @Column(name = "stock_co_po_type_id")
    private Long stockCoPoTypeId;

    @Column(name = "offer_date")
    private LocalDate offerDate;

    @Column(name = "cheque_no")
    private String chequeNo;

    @Column(name = "cheque_date")
    private LocalDate chequeDate;

    @Column(name = "payment_no")
    private String paymentNo;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "stock_po_type")
    private String stockPoType;

    @Column(name = "transport_day")
    private Integer transportDay;

    @Column(name = "department_id")
    private Long departmentId;

    @Column(name = "stock_user_id")
    private Long stockUserId;

    @Column(name = "stock_budget_use")
    private Double stockBudgetUse;

    @Column(name = "stock_budget_remain")
    private Double stockBudgetRemain;

    @Column(name = "stock_budget_price")
    private Double stockBudgetPrice;

    @Column(name = "remark_1")
    private String remark1;

    @Column(name = "remark_2")
    private String remark2;

    @Column(name = "remark_3")
    private String remark3;

    @Column(name = "runnumber")
    private Integer runnumber;

    @Column(name = "number_year")
    private Integer numberYear;

    @Column(name = "number_month")
    private Integer numberMonth;

    @Column(name = "stock_po_document_id")
    private Long stockPoDocumentId;

    @Column(name = "status_appove_data")
    private Boolean statusAppoveData;

    @Column(name = "significant_number")
    private String significantNumber;

    @Column(name = "is_temp")
    private Boolean isTemp;

    @Column(name = "request_tag_no")
    private String requestTagNo;

    @Column(name = "stock_vendor_id")
    private Long stockVendorId;

    @Column(name = "stock_paid_type_id")
    private Long stockPaidTypeId;

    @Column(name = "stock_po_discount_after_vat")
    private Double stockPoDiscountAfterVat;

    @Column(name = "stock_po_vat_amount")
    private Double stockPoVatAmount;

    @Column(name = "po_doc_no")
    private String poDocNo;

    @Column(name = "stock_po_ref_id")
    private Long stockPoRefId;

    @Column(name = "stock_vendor_disc_type_id")
    private Long stockVendorDiscTypeId;

    @Column(name = "stock_vendor_disc_percent")
    private Double stockVendorDiscPercent;

    @Column(name = "paid_status_update_datetime")
    private LocalDateTime paidStatusUpdateDatetime;

    @Column(name = "stock_po_before_discount_amt")
    private Double stockPoBeforeDiscountAmt;

    @Column(name = "stock_po_vendor_disc_amt")
    private Double stockPoVendorDiscAmt;

    @Column(name = "stock_po_before_vat_amt")
    private Double stockPoBeforeVatAmt;

    @Column(name = "po_deliver_recv_date")
    private String poDeliverRecvDate;

    @Column(name = "po_deliver_recv_time")
    private String poDeliverRecvTime;

    @Column(name = "po_deliver_inv_stat_type_id")
    private Long poDeliverInvStatTypeId;

    @Column(name = "po_deliver_gd_stat_type_id")
    private Long poDeliverGdStatTypeId;

    @Column(name = "po_deliver_confirm_type_id")
    private Long poDeliverConfirmTypeId;

    @Column(name = "stock_po_manual_disc_amt")
    private Double stockPoManualDiscAmt;

    @Column(name = "stock_po_adj_before_vat")
    private Double stockPoAdjBeforeVat;

    //TODO: Add relation to StockRequest
    @Column(name = "ref_request_id")
    private Long refRequestId;

    @Column(name = "po_est_date")
    private LocalDate poEstDate;

    @Column(name = "stock_po_priority_type_id")
    private Long stockPoPriorityTypeId;

    @Column(name = "po_est_deliver_date")
    private LocalDate poEstDeliverDate;

    @Column(name = "po_contract_no")
    private String poContractNo;

    @Column(name = "po_deliver_amount")
    private Double poDeliverAmount;

    @Column(name = "deliver_stop")
    private Boolean deliverStop;

    @Column(name = "stock_budget_transfer")
    private Double stockBudgetTransfer;

    @Column(name = "stock_vendor_contract_id")
    private Long stockVendorContractId;

    @Column(name = "deliver_stop_date")
    private String deliverStopDate;

    @Column(name = "po_approval_date")
    private String poApprovalDate;

    @Column(name = "price_inc_vat")
    private Boolean priceIncVat;

    @Column(name = "deliver_no_list")
    private String deliverNoList;

    @Column(name = "egp_project_no")
    private String egpProjectNo;

    @Column(name = "egp_control_no")
    private String egpControlNo;

    @Column(name = "gfmis_po_no")
    private String gfmisPoNo;

    @Column(name = "request_no_list")
    private String requestNoList;

    @Column(name = "stock_budget_type_id")
    private Long stockBudgetTypeId;

    @Column(name = "acc_posted")
    private Boolean accPosted;

    @Column(name = "acc_posted_datetime")
    private String accPostedDatetime;

    @Column(name = "stock_deliver_doc_no_list")
    private String stockDeliverDocNoList;

    @Column(name = "round_total_price")
    private Double roundTotalPrice;

    @Column(name = "use_no_discount")
    private Boolean useNoDiscount;

    @Column(name = "fine_amount")
    private Double fineAmount;

    @Column(name = "stock_po_adj_vat")
    private Double stockPoAdjVat;
}
