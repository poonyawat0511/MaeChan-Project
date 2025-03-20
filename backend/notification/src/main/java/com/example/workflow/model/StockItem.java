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
@Table(name = "stock_item")
public class StockItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "item_name")
    private String itemName;

    @Column(name = "item_unit")
    private String itemUnit;

    @Column(name = "item_type")
    private Integer itemType;

    @Column(name = "item_use_status")
    private Character itemUseStatus;

    @Column(name = "reorder_level")
    private Integer reorderLevel;

    @Column(name = "reorder_qty")
    private Integer reorderQty;

    @Column(name = "unit_cost")
    private Double unitCost;

    @Column(name = "oldcode")
    private String oldcode;

    @Column(name = "fix_department")
    private Character fixDepartment;

    @Column(name = "stock_item_cost_type_id")
    private Long stockItemCostTypeId;

    @Column(name = "stock_class_id")
    private Long stockClassId;

    @Column(name = "unit_price")
    private Double unitPrice;

    @Column(name = "item_code")
    private String itemCode;

    @Column(name = "stock_item_regdate")
    private LocalDate stockItemRegdate;

    @Column(name = "safety_stock")
    private Integer safetyStock;

    @Column(name = "onhand_qty")
    private Integer onhandQty;
    
    @Column(name = "last_active_date")
    private LocalDate lastActiveDate;

    @Column(name = "last_po_date")
    private LocalDate lastPoDate;

    @Column(name = "item_common_name")
    private String itemCommonName;

    @Column(name = "stock_item_mtr_id")
    private Integer stockItemMtrId;

    @Column(name = "stock_item_acct_id")
    private Integer stockItemAcctId;

    @Column(name = "stock_sub_class_id")
    private Integer stockSubClassId;

    @Column(name = "item_trade_name")
    private String itemTradeName;

    @Column(name = "stock_item_note")
    private String stockItemNote;

    @Column(name = "last_po_price")
    private Double lastPoPrice;

    @Column(name = "stock_item_std_price")
    private Double stockItemStdPrice;

    @Column(name = "stock_item_ref_price")
    private Double stockItemRefPrice;

    @Column(name = "expire_qty")
    private Integer expireQty;

    @Column(name = "supplier_list_text")
    private String supplierListText;

    @Column(name = "vendor_list_text")
    private String vendorListText;

    @Column(name = "po_wait_qty")
    private Integer poWaitQty;

    @Column(name = "last_deliver_date")
    private LocalDate lastDeliverDate;

    @Column(name = "item_min_qty")
    private Integer itemMinQty;

    @Column(name = "item_max_qty")
    private Integer itemMaxQty;

    @Column(name = "last_po_price_1")
    private Double lastPoPrice1;

    @Column(name = "last_stock_vendor_id")
    private Integer lastStockVendorId;

    @Column(name = "stock_item_ed_type_id")
    private Integer stockItemEdTypeId;

    @Column(name = "last_calc_si_map")
    private LocalDateTime lastCalcSiMap;

    @Column(name = "update_datetime")
    private LocalDateTime updateDatetime;

    @Column(name = "drugitems_no_substock")
    private Character drugitemsNoSubstock;

    //blank column below

    @Column(name = "item_standard_price")
    private Double itemStandardPrice;

    @Column(name = "item_unit_qty")
    private Integer itemUnitQty;

    @Column(name = "item_package_name")
    private String itemPackageName;

    @Column(name = "icode")
    private String icode;

    @Column(name = "standard_code")
    private String standardCode;

    @Column(name = "dummy_left_qty")
    private Integer dummyLeftQty;

    @Column(name = "dummy_left_price")
    private Double dummyLeftPrice;

    @Column(name = "item_sub_unit_qty")
    private Integer itemSubUnitQty;

    @Column(name = "old_unit_cost")
    private Double oldUnitCost;

    @Column(name = "newcode")
    private String newcode;

    @Column(name = "default_department_id")
    private Long defaultDepartmentId;

    @Column(name = "barcode_number")
    private String barcodeNumber;

    @Column(name = "hos_guid")
    private String hosGuid;

    @Column(name = "gpo_code")
    private String gpoCode;

    @Column(name = "didstd_code")
    private String didstdCode;

    @Column(name = "avg_month_use_qty")
    private Integer avgMonthUseQty;

    @Column(name = "item_regno")
    private String itemRegno;

    @Column(name = "bdg_nextyear_percent")
    private Double bdgNextyearPercent;

    @Column(name = "item_note")
    private String itemNote;

    @Column(name = "avg_lead_day")
    private Double avgLeadDay;

    @Column(name = "gpo_vmi")
    private Character gpoVmi;

    @Column(name = "balance_qty")
    private Double balanceQty;

    @Column(name = "item_eng")
    private String itemEng;

    @Column(name = "item_trand")
    private String itemTrand;

    @Column(name = "item_type_group")
    private String itemTypeGroup;

    @Column(name = "item_status_control")
    private Character itemStatusControl;

    @Column(name = "item_van_type")
    private Character itemVanType;

    @Column(name = "search_keyword")
    private String searchKeyword;

    @Column(name = "abc")
    private Character abc;

    @Column(name = "ved_code")
    private Character vedCode;

    @Column(name = "pharmacology_group1")
    private Integer pharmacologyGroup1;

    public Integer getPharmacologyGroup1() {
        return pharmacologyGroup1 != null ? pharmacologyGroup1 : 0;
    }

    @Column(name = "pharmacology_group2")
    private Integer pharmacologyGroup2;

    public Integer getPharmacologyGroup2() {
        return pharmacologyGroup2 != null ? pharmacologyGroup2 : 0;
    }

    @Column(name = "pharmacology_group3")
    private Integer pharmacologyGroup3;

    public Integer getPharmacologyGroup3() {
        return pharmacologyGroup3 != null ? pharmacologyGroup3 : 0;
    }

    @Column(name = "vat_percent")
    private Double vatPercent;

    @Column(name = "sap_unit_name")
    private String sapUnitName;

    @Column(name = "sap_item_name")
    private String sapItemName;

    @Column(name = "sap_unit_cost")
    private Double sapUnitCost;

    @Column(name = "sap_active")
    private String sapActive;

    @Column(name = "manufacturer_list_text")
    private String manufacturerListText;

    @Column(name = "use_fixed_avg_cost")
    private Character useFixedAvgCost;

    @Column(name = "fixed_avg_cost")
    private Double fixedAvgCost;

    @Column(name = "stock_mrp_order_type_id")
    private Integer stockMrpOrderTypeId;

    @Column(name = "stock_mrp_lot_size")
    private Integer stockMrpLotSize;

    @Column(name = "apply_vat")
    private Character applyVat;

    @Column(name = "gpsc_code")
    private String gpscCode;

    // Add constructor to accept integer argument
    public StockItem(Long itemId) {
        this.itemId = itemId;
    }
}
