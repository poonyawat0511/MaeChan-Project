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
    private Long id;

    @Column(name = "item_id")
    private String itemId;

    @Column(name = "item_name")
    private String itemName;

    @Column(name = "item_unit")
    private String itemUnit;

    @Column(name = "item_type")
    private String itemType;

    @Column(name = "item_use_status")
    private boolean itemUseStatus;

    @Column(name = "reorder_level")
    private int reorderLevel;

    @Column(name = "reorder_qty")
    private int reorderQty;

    @Column(name = "unit_cost")
    private double unitCost;

    @Column(name = "oldcode")
    private String oldcode;

    @Column(name = "fix_department")
    private String fixDepartment;

    @Column(name = "stock_item_cost_type_id")
    private Long stockItemCostTypeId;

    @Column(name = "stock_class_id")
    private Long stockClassId;

    @Column(name = "unit_price")
    private double unitPrice;

    @Column(name = "item_code")
    private String itemCode;

    @Column(name = "stock_item_regdate")
    private LocalDate stockItemRegdate;

    @Column(name = "safety_stock")
    private int safetyStock;

    @Column(name = "onhand_qty")
    private int onhandQty;
    
    @Column(name = "last_active_date")
    private LocalDate lastActiveDate;

    @Column(name = "last_po_date")
    private LocalDate lastPoDate;

    @Column(name = "item_common_name")
    private String itemCommonName;

    @Column(name = "stock_item_mtr_id")
    private Long stockItemMtrId;

    @Column(name = "stock_item_acct_id")
    private Long stockItemAcctId;

    @Column(name = "stock_sub_class_id")
    private Long stockSubClassId;

    @Column(name = "item_trade_name")
    private String itemTradeName;

    @Column(name = "stock_item_note")
    private String stockItemNote;

    @Column(name = "last_po_price")
    private double lastPoPrice;

    @Column(name = "stock_item_std_price")
    private double stockItemStdPrice;

    @Column(name = "stock_item_ref_price")
    private double stockItemRefPrice;

    @Column(name = "expire_qty")
    private int expireQty;

    @Column(name = "supplier_list_text")
    private String supplierListText;

    @Column(name = "vendor_list_text")
    private String vendorListText;

    @Column(name = "po_wait_qty")
    private int poWaitQty;

    @Column(name = "last_deliver_date")
    private LocalDate lastDeliverDate;

    @Column(name = "item_min_qty")
    private int itemMinQty;

    @Column(name = "item_max_qty")
    private int itemMaxQty;

    @Column(name = "last_po_price_1")
    private double lastPoPrice1;

    @Column(name = "last_stock_vendor_id")
    private Long lastStockVendorId;

    @Column(name = "stock_item_ed_type_id")
    private Long stockItemEdTypeId;

    @Column(name = "last_calc_si_map")
    private LocalDateTime lastCalcSiMap;

    @Column(name = "update_datetime")
    private LocalDateTime updateDatetime;

    @Column(name = "drugitems_no_substock")
    private boolean drugitemsNoSubstock;

    //blank column below

    @Column(name = "item_standard_price")
    private double itemStandardPrice;

    @Column(name = "item_unit_qty")
    private int itemUnitQty;

    @Column(name = "item_package_name")
    private String itemPackageName;

    @Column(name = "icode")
    private String icode;

    @Column(name = "standard_code")
    private String standardCode;

    @Column(name = "dummy_left_qty")
    private int dummyLeftQty;

    @Column(name = "dummy_left_price")
    private double dummyLeftPrice;

    @Column(name = "item_sub_unit_qty")
    private int itemSubUnitQty;

    @Column(name = "old_unit_cost")
    private double oldUnitCost;

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
    private int avgMonthUseQty;

    @Column(name = "item_regno")
    private String itemRegno;

    @Column(name = "bdg_nextyear_percent")
    private double bdgNextyearPercent;

    @Column(name = "item_note")
    private String itemNote;

    @Column(name = "avg_lead_day")
    private int avgLeadDay;

    @Column(name = "gpo_vmi")
    private boolean gpoVmi;

    @Column(name = "balance_qty")
    private int balanceQty;

    @Column(name = "item_eng")
    private String itemEng;

    @Column(name = "item_trand")
    private String itemTrand;

    @Column(name = "item_type_group")
    private String itemTypeGroup;

    @Column(name = "item_status_control")
    private String itemStatusControl;

    @Column(name = "item_van_type")
    private String itemVanType;

    @Column(name = "search_keyword")
    private String searchKeyword;

    @Column(name = "abc")
    private String abc;

    @Column(name = "ved_code")
    private String vedCode;

    @Column(name = "pharmacology_group1")
    private String pharmacologyGroup1;

    @Column(name = "pharmacology_group2")
    private String pharmacologyGroup2;

    @Column(name = "pharmacology_group3")
    private String pharmacologyGroup3;

    @Column(name = "vat_percent")
    private double vatPercent;

    @Column(name = "sap_unit_name")
    private String sapUnitName;

    @Column(name = "sap_item_name")
    private String sapItemName;

    @Column(name = "sap_unit_cost")
    private double sapUnitCost;

    @Column(name = "sap_active")
    private boolean sapActive;

    @Column(name = "manufacturer_list_text")
    private String manufacturerListText;

    @Column(name = "use_fixed_avg_cost")
    private boolean useFixedAvgCost;

    @Column(name = "fixed_avg_cost")
    private double fixedAvgCost;

    @Column(name = "stock_mrp_order_type_id")
    private Long stockMrpOrderTypeId;

    @Column(name = "stock_mrp_lot_size")
    private int stockMrpLotSize;

    @Column(name = "apply_vat")
    private boolean applyVat;

    @Column(name = "gpsc_code")
    private String gpscCode;
}
