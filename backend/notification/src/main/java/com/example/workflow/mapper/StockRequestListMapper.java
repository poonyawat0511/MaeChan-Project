package com.example.workflow.mapper;

import com.example.workflow.dto.StockRequestListDto;
import com.example.workflow.model.StockRequestList;
import org.springframework.stereotype.Component;

@Component
public class StockRequestListMapper {

    public StockRequestListDto toDto(StockRequestList stockRequestList) {
        return new StockRequestListDto(
            stockRequestList.getRequestListId(),
            stockRequestList.getRequestId(),
            stockRequestList.getItemId(),
            stockRequestList.getRequestQty(),
            stockRequestList.getRequestLeftQty(),
            stockRequestList.getRequestUnit(),
            stockRequestList.getRequestListUnitPrice(),
            stockRequestList.getRequestListTotalPrice(),
            stockRequestList.getRequestComplete(),
            stockRequestList.getDepartmentId(),
            stockRequestList.getRequestDate(),
            stockRequestList.getSupplierId(),
            stockRequestList.getRemark(),
            stockRequestList.getStockItemUnitId(),
            stockRequestList.getStockPackageQty(),
            stockRequestList.getHosGuid(),
            stockRequestList.getIncomingBalanceQty(),
            stockRequestList.getRate1Month(),
            stockRequestList.getStockItemUnitStandardPrice(),
            stockRequestList.getPackagePrice(),
            stockRequestList.getLastPrice(),
            stockRequestList.getApprove(),
            stockRequestList.getUseStockPlanBdg(),
            stockRequestList.getStockPlanTotalAmount(),
            stockRequestList.getStockPlanRemainAmount(),
            stockRequestList.getStockPlanOutgoingAmount(),
            stockRequestList.getTotalPrice(),
            stockRequestList.getItemBarcode(),
            stockRequestList.getUnitQty(),
            stockRequestList.getStockPoItemTypeId(),
            stockRequestList.getStockRequestItemDiscount(),
            stockRequestList.getStockRequestItemMoneyDiscount(),
            stockRequestList.getRate3Month(),
            stockRequestList.getTradeName(),
            stockRequestList.getTotalPlanQty(),
            stockRequestList.getTotalPoQty(),
            stockRequestList.getPlanRemainQty(),
            stockRequestList.getForcastMonth(),
            stockRequestList.getStockVendorId(),
            stockRequestList.getSupplierItemId(),
            stockRequestList.getStockDepRequestListId(),
            stockRequestList.getStockPoPcTypeId(),
            stockRequestList.getTrimester(),
            stockRequestList.getTrimesterPlanQty(),
            stockRequestList.getTrimesterPlanAmount(),
            stockRequestList.getTrimesterPlanUseQty(),
            stockRequestList.getTrimesterPlanUseAmount(),
            stockRequestList.getTrimesterPlanRemainQty(),
            stockRequestList.getTrimesterPlanRemainAmount(),
            stockRequestList.getVatPrice(),
            stockRequestList.getTotalPriceBeforeVat(),
            stockRequestList.getLastWarehouseId(),
            stockRequestList.getTotalPlanAmount(),
            stockRequestList.getItemFlag(),
            stockRequestList.getStockVendorContractId(),
            stockRequestList.getContractRemainPackageQty()
        );
    }

    public StockRequestList toEntity(StockRequestListDto stockRequestListDto) {
        StockRequestList stockRequestList = new StockRequestList();
        stockRequestList.setRequestListId(stockRequestListDto.getRequestListId());
        stockRequestList.setRequestId(stockRequestListDto.getRequestId());
        stockRequestList.setItemId(stockRequestListDto.getItemId());
        stockRequestList.setRequestQty(stockRequestListDto.getRequestQty());
        stockRequestList.setRequestLeftQty(stockRequestListDto.getRequestLeftQty());
        stockRequestList.setRequestUnit(stockRequestListDto.getRequestUnit());
        stockRequestList.setRequestListUnitPrice(stockRequestListDto.getRequestListUnitPrice());
        stockRequestList.setRequestListTotalPrice(stockRequestListDto.getRequestListTotalPrice());
        stockRequestList.setRequestComplete(stockRequestListDto.getRequestComplete());
        stockRequestList.setDepartmentId(stockRequestListDto.getDepartmentId());
        stockRequestList.setRequestDate(stockRequestListDto.getRequestDate());
        stockRequestList.setSupplierId(stockRequestListDto.getSupplierId());
        stockRequestList.setRemark(stockRequestListDto.getRemark());
        stockRequestList.setStockItemUnitId(stockRequestListDto.getStockItemUnitId());
        stockRequestList.setStockPackageQty(stockRequestListDto.getStockPackageQty());
        stockRequestList.setHosGuid(stockRequestListDto.getHosGuid());
        stockRequestList.setIncomingBalanceQty(stockRequestListDto.getIncomingBalanceQty());
        stockRequestList.setRate1Month(stockRequestListDto.getRate1Month());
        stockRequestList.setStockItemUnitStandardPrice(stockRequestListDto.getStockItemUnitStandardPrice());
        stockRequestList.setPackagePrice(stockRequestListDto.getPackagePrice());
        stockRequestList.setLastPrice(stockRequestListDto.getLastPrice());
        stockRequestList.setApprove(stockRequestListDto.getApprove());
        stockRequestList.setUseStockPlanBdg(stockRequestListDto.getUseStockPlanBdg());
        stockRequestList.setStockPlanTotalAmount(stockRequestListDto.getStockPlanTotalAmount());
        stockRequestList.setStockPlanRemainAmount(stockRequestListDto.getStockPlanRemainAmount());
        stockRequestList.setStockPlanOutgoingAmount(stockRequestListDto.getStockPlanOutgoingAmount());
        stockRequestList.setTotalPrice(stockRequestListDto.getTotalPrice());
        stockRequestList.setItemBarcode(stockRequestListDto.getItemBarcode());
        stockRequestList.setUnitQty(stockRequestListDto.getUnitQty());
        stockRequestList.setStockPoItemTypeId(stockRequestListDto.getStockPoItemTypeId());
        stockRequestList.setStockRequestItemDiscount(stockRequestListDto.getStockRequestItemDiscount());
        stockRequestList.setStockRequestItemMoneyDiscount(stockRequestListDto.getStockRequestItemMoneyDiscount());
        stockRequestList.setRate3Month(stockRequestListDto.getRate3Month());
        stockRequestList.setTradeName(stockRequestListDto.getTradeName());
        stockRequestList.setTotalPlanQty(stockRequestListDto.getTotalPlanQty());
        stockRequestList.setTotalPoQty(stockRequestListDto.getTotalPoQty());
        stockRequestList.setPlanRemainQty(stockRequestListDto.getPlanRemainQty());
        stockRequestList.setForcastMonth(stockRequestListDto.getForcastMonth());
        stockRequestList.setStockVendorId(stockRequestListDto.getStockVendorId());
        stockRequestList.setSupplierItemId(stockRequestListDto.getSupplierItemId());
        stockRequestList.setStockDepRequestListId(stockRequestListDto.getStockDepRequestListId());
        stockRequestList.setStockPoPcTypeId(stockRequestListDto.getStockPoPcTypeId());
        stockRequestList.setTrimester(stockRequestListDto.getTrimester());
        stockRequestList.setTrimesterPlanQty(stockRequestListDto.getTrimesterPlanQty());
        stockRequestList.setTrimesterPlanAmount(stockRequestListDto.getTrimesterPlanAmount());
        stockRequestList.setTrimesterPlanUseQty(stockRequestListDto.getTrimesterPlanUseQty());
        stockRequestList.setTrimesterPlanUseAmount(stockRequestListDto.getTrimesterPlanUseAmount());
        stockRequestList.setTrimesterPlanRemainQty(stockRequestListDto.getTrimesterPlanRemainQty());
        stockRequestList.setTrimesterPlanRemainAmount(stockRequestListDto.getTrimesterPlanRemainAmount());
        stockRequestList.setVatPrice(stockRequestListDto.getVatPrice());
        stockRequestList.setTotalPriceBeforeVat(stockRequestListDto.getTotalPriceBeforeVat());
        stockRequestList.setLastWarehouseId(stockRequestListDto.getLastWarehouseId());
        stockRequestList.setTotalPlanAmount(stockRequestListDto.getTotalPlanAmount());
        stockRequestList.setItemFlag(stockRequestListDto.getItemFlag());
        stockRequestList.setStockVendorContractId(stockRequestListDto.getStockVendorContractId());
        stockRequestList.setContractRemainPackageQty(stockRequestListDto.getContractRemainPackageQty());
        return stockRequestList;
    }
}
