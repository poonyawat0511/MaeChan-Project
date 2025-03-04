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

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "stock_po_detail")
public class StockPoDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stock_po_detail_id")
    private Long stockPoDetailId;

    // Add relation to StockPo
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "stock_po_id", referencedColumnName = "stock_po_id")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "stockPoId")
    private StockPo stockPoId;

    // Add relation to stock item
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "item_id", referencedColumnName = "item_id")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "itemId")
    private StockItem itemId;

    // Add relation
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "request_list_id", referencedColumnName = "request_list_id")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "requestListId")
    private StockRequestList requestListId;
    
    // Add relation
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "last_warehouse_id", referencedColumnName = "warehouse_id")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "warehouseId")
    private StockWarehouse lastWarehouseId;

    @Column(name = "stock_po_qty")
    private Integer stockPoQty;

    @Column(name = "stock_po_price")
    private Double stockPoPrice;

    @Column(name = "stock_po_ref_price")
    private Double stockPoRefPrice;

    @Column(name = "stock_po_total")
    private Double stockPoTotal;

    @Column(name = "trade_name")
    private String tradeName;

    @Column(name = "remark")
    private String remark;

    @Column(name = "stock_po_item_type_id")
    private Long stockPoItemTypeId;

    @Column(name = "stock_po_item_discount")
    private Double stockPoItemDiscount;

    @Column(name = "stock_po_item_money_discount")
    private Double stockPoItemMoneyDiscount;

    @Column(name = "stock_po_item_unit")
    private String stockPoItemUnit;

    @Column(name = "stock_po_tax")
    private Boolean stockPoTax;

    @Column(name = "stock_po_item_unitcost")
    private Double stockPoItemUnitcost;

    @Column(name = "stock_po_item_owner")
    private String stockPoItemOwner;

    @Column(name = "po_detail_cancel")
    private Boolean poDetailCancel;

    @Column(name = "stock_po_before_discount_price")
    private Double stockPoBeforeDiscountPrice;

    @Column(name = "cancel_reason")
    private String cancelReason;

    @Column(name = "stock_deliver_qty")
    private Integer stockDeliverQty;

    @Column(name = "reference_id")
    private Long referenceId;

    @Column(name = "stock_item_unit_id")
    private Long stockItemUnitId;

    @Column(name = "stock_package_qty")
    private Integer stockPackageQty;

    @Column(name = "stock_po_tax_cost")
    private Double stockPoTaxCost;

    @Column(name = "hos_guid")
    private String hosGuid;

    @Column(name = "stock_po_last_price")
    private Double stockPoLastPrice;

    @Column(name = "supplier_id")
    private Long supplierId;

    @Column(name = "item_drug_account")
    private String itemDrugAccount;

    @Column(name = "stock_co_po_detail_id")
    private Long stockCoPoDetailId;

    @Column(name = "remain_qty")
    private Integer remainQty;

    @Column(name = "item_barcode")
    private String itemBarcode;

    @Column(name = "supplier_item_id")
    private Long supplierItemId;

    @Column(name = "stock_pkg_before_disc_price")
    private Double stockPkgBeforeDiscPrice;

    @Column(name = "stock_po_item_money_disc_tot")
    private Double stockPoItemMoneyDiscTot;

    @Column(name = "check_key")
    private String checkKey;

    @Column(name = "request_tag_no")
    private String requestTagNo;

    @Column(name = "item_avg_cost")
    private Double itemAvgCost;

    @Column(name = "stock_po_item_discount2")
    private Double stockPoItemDiscount2;

    @Column(name = "stock_cost_center_id")
    private Long stockCostCenterId;

    @Column(name = "stock_io_no")
    private String stockIoNo;

    @Column(name = "project_remark")
    private String projectRemark;

    @Column(name = "stock_asset_no")
    private String stockAssetNo;

    @Column(name = "project_no")
    private String projectNo;

    @Column(name = "wbs")
    private String wbs;

    @Column(name = "exchange_item_id")
    private Long exchangeItemId;

    @Column(name = "exchange_item_unit_id")
    private Long exchangeItemUnitId;

    @Column(name = "exchange_qty")
    private Integer exchangeQty;

    @Column(name = "exchange_remain_package_qty")
    private Integer exchangeRemainPackageQty;

    @Column(name = "po_norm_qty")
    private Integer poNormQty;

    @Column(name = "po_norm_stock_item_unit_id")
    private Long poNormStockItemUnitId;

    @Column(name = "sap_pr_no")
    private String sapPrNo;

    @Column(name = "stock_bestow_id")
    private Long stockBestowId;

    @Column(name = "wh_remain_qty")
    private Integer whRemainQty;

    @Column(name = "dep_remain_qty")
    private Integer depRemainQty;

    @Column(name = "other_discount")
    private Double otherDiscount;

    @Column(name = "stock_po_price_before_vat")
    private Double stockPoPriceBeforeVat;

    @Column(name = "stock_po_pc_type_id")
    private Long stockPoPcTypeId;

    @Column(name = "stock_vendor_contract_id")
    private Long stockVendorContractId;

    @Column(name = "is_transfer_unit")
    private Boolean isTransferUnit;

    @Column(name = "back_order_qty")
    private Integer backOrderQty;

    @Column(name = "stock_vendor_contract_item_id")
    private Long stockVendorContractItemId;

    // Add constructor to accept integer argument
    public StockPoDetail(Long stockPoDetailId) {
    this.stockPoDetailId = stockPoDetailId;
    }
}
