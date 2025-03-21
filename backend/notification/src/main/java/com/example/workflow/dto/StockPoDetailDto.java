package com.example.workflow.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.example.workflow.model.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StockPoDetailDto {
    private Long stockPoDetailId;
    private StockPo stockPoId;
    private StockItem itemId;
    private StockRequestList requestListId;
    private StockWarehouse lastWarehouseId;
    private Integer stockPoQty;
    private Double stockPoPrice;
    private Double stockPoRefPrice;
    private Double stockPoTotal;
    private String tradeName;
    private String remark;
    private Long stockPoItemTypeId;
    private Double stockPoItemDiscount;
    private Double stockPoItemMoneyDiscount;
    private String stockPoItemUnit;
    private Character stockPoTax;
    private Double stockPoItemUnitcost;
    private String stockPoItemOwner;
    private Character poDetailCancel;
    private Double stockPoBeforeDiscountPrice;
    private String cancelReason;
    private Integer stockDeliverQty;
    private Long referenceId;
    private Long stockItemUnitId;
    private Integer stockPackageQty;
    private Double stockPoTaxCost;
    private String hosGuid;
    private Double stockPoLastPrice;
    private Long supplierId;
    private String itemDrugAccount;
    private Long stockCoPoDetailId;
    private Integer remainQty;
    private String itemBarcode;
    private Long supplierItemId;
    private Double stockPkgBeforeDiscPrice;
    private Double stockPoItemMoneyDiscTot;
    private String checkKey;
    private String requestTagNo;
    private Double itemAvgCost;
    private Double stockPoItemDiscount2;
    private Long stockCostCenterId;
    private String stockIoNo;
    private String projectRemark;
    private String stockAssetNo;
    private String projectNo;
    private String wbs;
    private Long exchangeItemId;
    private Long exchangeItemUnitId;
    private Integer exchangeQty;
    private Integer exchangeRemainPackageQty;
    private Integer poNormQty;
    private Long poNormStockItemUnitId;
    private String sapPrNo;
    private Long stockBestowId;
    private Integer whRemainQty;
    private Integer depRemainQty;
    private Double otherDiscount;
    private Double stockPoPriceBeforeVat;
    private Long stockPoPcTypeId;
    private Long stockVendorContractId;
    private Character isTransferUnit;
    private Integer backOrderQty;
    private Long stockVendorContractItemId;
}
