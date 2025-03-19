package com.example.workflow.model;

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

import java.util.Date;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "stock_request_list")
public class StockRequestList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_list_id")
    private Long requestListId;

    // Add relation to StockRequest
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "request_id", referencedColumnName = "request_id")
    @NotFound(action = NotFoundAction.IGNORE)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "requestId")
    private StockRequest requestId;

    // Add relation to stock item
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "item_id", referencedColumnName = "item_id")
    @NotFound(action = NotFoundAction.IGNORE)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "itemId")
    private StockItem itemId;

    @Column(name = "request_qty")
    private Integer requestQty;

    @Column(name = "request_left_qty")
    private Integer requestLeftQty;

    @Column(name = "request_unit")
    private String requestUnit;

    @Column(name = "request_list_unit_price")
    private Double requestListUnitPrice;

    @Column(name = "request_list_total_price")
    private Double requestListTotalPrice;

    @Column(name = "request_complete")
    private Character requestComplete;

    @Column(name = "department_id")
    private Long departmentId;

    @Column(name = "request_date")
    private Date requestDate;

    @Column(name = "supplier_id")
    private Long supplierId;

    @Column(name = "remark")
    private String remark;

    @Column(name = "stock_item_unit_id")
    private Long stockItemUnitId;

    @Column(name = "stock_package_qty")
    private Integer stockPackageQty;

    @Column(name = "hos_guid")
    private String hosGuid;

    @Column(name = "incoming_balance_qty")
    private Integer incomingBalanceQty;

    @Column(name = "rate_1_month")
    private Integer rate1Month;

    @Column(name = "stock_item_unit_standard_price")
    private Double stockItemUnitStandardPrice;

    @Column(name = "package_price")
    private Double packagePrice;

    @Column(name = "last_price")
    private Double lastPrice;

    @Column(name = "approve")
    private Character approve;

    @Column(name = "use_stock_plan_bdg")
    private Character useStockPlanBdg;

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
    private Integer unitQty;

    @Column(name = "stock_po_item_type_id")
    private Long stockPoItemTypeId;

    @Column(name = "stock_request_item_discount")
    private Double stockRequestItemDiscount;

    @Column(name = "stock_request_item_money_discount")
    private Double stockRequestItemMoneyDiscount;

    @Column(name = "rate_3_month")
    private Integer rate3Month;

    @Column(name = "trade_name")
    private String tradeName;

    @Column(name = "total_plan_qty")
    private Integer totalPlanQty;

    @Column(name = "total_po_qty")
    private Integer totalPoQty;

    @Column(name = "plan_remain_qty")
    private Integer planRemainQty;

    @Column(name = "forcast_month")
    private Double forcastMonth;

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
    private Integer trimesterPlanQty;

    @Column(name = "trimester_plan_amount")
    private Double trimesterPlanAmount;

    @Column(name = "trimester_plan_use_qty")
    private Integer trimesterPlanUseQty;

    @Column(name = "trimester_plan_use_amount")
    private Double trimesterPlanUseAmount;

    @Column(name = "trimester_plan_remain_qty")
    private Integer trimesterPlanRemainQty;

    @Column(name = "trimester_plan_remain_amount")
    private Double trimesterPlanRemainAmount;

    @Column(name = "vat_price")
    private Double vatPrice;

    @Column(name = "total_price_before_vat")
    private Double totalPriceBeforeVat;

    @Column(name = "last_warehouse_id")
    private Long lastWarehouseId;

    @Column(name = "total_plan_amount")
    private Double totalPlanAmount;

    @Column(name = "item_flag")
    private Character itemFlag;

    @Column(name = "stock_vendor_contract_id")
    private Long stockVendorContractId;

    @Column(name = "contract_remain_package_qty")
    private Integer contractRemainPackageQty;

    // Add constructor to handle deserialization from number value
    public StockRequestList(Long requestListId) {
        this.requestListId = requestListId;
    }

    //handel null value
    public Double getForcastMonth() {
        return forcastMonth != null ? forcastMonth : 0.0;
    }
}
