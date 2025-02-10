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
}
