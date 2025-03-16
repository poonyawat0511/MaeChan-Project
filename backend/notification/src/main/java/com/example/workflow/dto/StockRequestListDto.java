package com.example.workflow.dto;

import java.util.Date;

import com.example.workflow.model.StockItem;
import com.example.workflow.model.StockRequest;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StockRequestListDto {
    private Long requestListId;
    private StockRequest requestId;
    private StockItem itemId;
    private int requestQty;
    private int requestLeftQty;
    private String requestUnit;
    private Double requestListUnitPrice;
    private Double requestListTotalPrice;
    private Boolean requestComplete;
    private Long departmentId;
    private Date requestDate;
    private Long supplierId;
    private String remark;
    private Long stockItemUnitId;
    private int stockPackageQty;
    private String hosGuid;
    private int incomingBalanceQty;
    private int rate1Month;
    private Double stockItemUnitStandardPrice;
    private Double packagePrice;
    private Double lastPrice;
    private Boolean approve;
    private Boolean useStockPlanBdg;
    private Double stockPlanTotalAmount;
    private Double stockPlanRemainAmount;
    private Double stockPlanOutgoingAmount;
    private Double totalPrice;
    private String itemBarcode;
    private int unitQty;
    private Long stockPoItemTypeId;
    private Double stockRequestItemDiscount;
    private Double stockRequestItemMoneyDiscount;
    private int rate3Month;
    private String tradeName;
    private int totalPlanQty;
    private int totalPoQty;
    private int planRemainQty;
    private double forcastMonth;
    private Long stockVendorId;
    private Long supplierItemId;
    private Long stockDepRequestListId;
    private Long stockPoPcTypeId;
    private int trimester;
    private int trimesterPlanQty;
    private double trimesterPlanAmount;
    private int trimesterPlanUseQty;
    private double trimesterPlanUseAmount;
    private int trimesterPlanRemainQty;
    private double trimesterPlanRemainAmount;
    private Double vatPrice;
    private Double totalPriceBeforeVat;
    private Long lastWarehouseId;
    private Double totalPlanAmount;
    private Boolean itemFlag;
    private Long stockVendorContractId;
    private int contractRemainPackageQty;
}
