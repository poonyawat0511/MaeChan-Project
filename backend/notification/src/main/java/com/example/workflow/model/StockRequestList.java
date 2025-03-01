package com.example.workflow.model;

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
@Table(name = "stock_request_list")
public class StockRequestList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "request_list_id")
    private Long requestListId;

    //TODO: Add relation to StockRequest
    @Column(name = "request_id")
    private Long requestId;

    //TODO: Add relation to stock item
    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "request_qty")
    private int requestQty;

    @Column(name = "request_left_qty")
    private int requestLeftQty;

    @Column(name = "request_unit")
    private String requestUnit;

    @Column(name = "request_list_unit_price")
    private Double requestListUnitPrice;

    @Column(name = "request_list_total_price")
    private Double requestListTotalPrice;

    @Column(name = "request_complete")
    private Boolean requestComplete;

    @Column(name = "department_id")
    private Long departmentId;

    @Column(name = "request_date")
    private String requestDate;

    @Column(name = "supplier_id")
    private Long supplierId;

    @Column(name = "remark")
    private String remark;

    @Column(name = "stock_item_unit_id")
    private Long stockItemUnitId;

    @Column(name = "stock_package_qty")
    private int stockPackageQty;

    @Column(name = "hos_guid")
    private String hosGuid;

    @Column(name = "incoming_balance_qty")
    private int incomingBalanceQty;

    @Column(name = "rate_1_month")
    private int rate1Month;

    @Column(name = "stock_item_unit_standard_price")
    private Double stockItemUnitStandardPrice;

    @Column(name = "package_price")
    private Double packagePrice;

    @Column(name = "last_price")
    private Double lastPrice;

    @Column(name = "approve")
    private Boolean approve;

    @Column(name = "use_stock_plan_bdg")
    private Boolean useStockPlanBdg;

    @Column(name = "stock_plan_total_amount")
    private Double stockPlanTotalAmount;

    @Column(name = "stock_plan_remain_amount")
    private Double stockPlanRemainAmount;

    @Column(name = "stock_plan_outgoing_amount")
    private Double stockPlanOutgoingAmount;

    @Column(name = "total_price")
    private Double totalPrice;

    @Column(name = "item_barcode")
    private String itemBarcode;

    @Column(name = "unit_qty")
    private Double unitQty;

    @Column(name = "stock_po_item_type_id")
    private Long stockPoItemTypeId;

    @Column(name = "stock_request_item_discount")
    private Double stockRequestItemDiscount;

    @Column(name = "stock_request_item_money_discount")
    private Double stockRequestItemMoneyDiscount;

    @Column(name = "rate_3_month")
    private Double rate3Month;

    @Column(name = "trade_name")
    private String tradeName;

    @Column(name = "total_plan_qty")
    private int totalPlanQty;

    @Column(name = "total_po_qty")
    private int totalPoQty;

    @Column(name = "plan_remain_qty")
    private Double planRemainQty;

    @Column(name = "forcast_month")
    private Integer forcastMonth;

    @Column(name = "stock_vendor_id")
    private Long stockVendorId;

    @Column(name = "supplier_item_id")
    private Long supplierItemId;

    @Column(name = "stock_dep_request_list_id")
    private Long stockDepRequestListId;

    @Column(name = "stock_po_pc_type_id")
    private Long stockPoPcTypeId;

    @Column(name = "trimester")
    private Integer trimester;

    @Column(name = "trimester_plan_qty")
    private int trimesterPlanQty;

    @Column(name = "trimester_plan_amount")
    private int trimesterPlanAmount;

    @Column(name = "trimester_plan_use_qty")
    private int trimesterPlanUseQty;

    @Column(name = "trimester_plan_use_amount")
    private int trimesterPlanUseAmount;

    @Column(name = "trimester_plan_remain_qty")
    private int trimesterPlanRemainQty;

    @Column(name = "trimester_plan_remain_amount")
    private int trimesterPlanRemainAmount;

    @Column(name = "vat_price")
    private Double vatPrice;

    @Column(name = "total_price_before_vat")
    private Double totalPriceBeforeVat;

    @Column(name = "last_warehouse_id")
    private Long lastWarehouseId;

    @Column(name = "total_plan_amount")
    private Double totalPlanAmount;

    @Column(name = "item_flag")
    private Boolean itemFlag;

    @Column(name = "stock_vendor_contract_id")
    private Long stockVendorContractId;

    @Column(name = "contract_remain_package_qty")
    private int contractRemainPackageQty;
}
