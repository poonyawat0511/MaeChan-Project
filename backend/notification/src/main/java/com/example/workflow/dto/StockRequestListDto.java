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
    private Integer requestQty;
    private Integer requestLeftQty;
    private String requestUnit;
    private Double requestListUnitPrice;
    private Double requestListTotalPrice;
    private Character requestComplete;
    private Long departmentId;
    private Date requestDate;
    private Long supplierId;
    private String remark;
    private Long stockItemUnitId;
    private Integer stockPackageQty;
    private String hosGuid;
    private Integer incomingBalanceQty;
    private Integer rate1Month;
    private Double stockItemUnitStandardPrice;
    private Double packagePrice;
    private Double lastPrice;
    private Character approve;
    private Character useStockPlanBdg;
    private Double stockPlanTotalAmount;
    private Double stockPlanRemainAmount;
    private Double stockPlanOutgoingAmount;
    private Double totalPrice;
    private String itemBarcode;
    private Integer unitQty;
    private Long stockPoItemTypeId;
    private Double stockRequestItemDiscount;
    private Double stockRequestItemMoneyDiscount;
    private Integer rate3Month;
    private String tradeName;
    private Integer totalPlanQty;
    private Integer totalPoQty;
    private Integer planRemainQty;
    private double forcastMonth;
    private Long stockVendorId;
    private Long supplierItemId;
    private Long stockDepRequestListId;
    private Long stockPoPcTypeId;
    private Integer trimester;
    private Integer trimesterPlanQty;
    private double trimesterPlanAmount;
    private Integer trimesterPlanUseQty;
    private double trimesterPlanUseAmount;
    private Integer trimesterPlanRemainQty;
    private double trimesterPlanRemainAmount;
    private Double vatPrice;
    private Double totalPriceBeforeVat;
    private Long lastWarehouseId;
    private Double totalPlanAmount;
    private Character itemFlag;
    private Long stockVendorContractId;
    private Integer contractRemainPackageQty;
}
