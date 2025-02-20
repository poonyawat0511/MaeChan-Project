import { StockItems } from "./stock-items";
import { StockPo } from "./stock-po";
import { StockRequestList } from "./stock-request-list";

export interface StockPoDetail {
    id: string;
    stockPoDetailId: string;
    stockPoId: StockPo;
    itemId: StockItems;
    stockPoQty: number;
    stockPoPrice: number;
    stockPoTotal: number;
    stockPoItemTypeId: number;
    stockPoTax: boolean;
    poDetailCancel: boolean;
    stockPoBeforeDiscountPrice: number;
    stockItemUnitId: string;
    stockPackageQty: number;
    stockPoTaxCost: number;
    stockPoLastPrice: number;
    requestListId: StockRequestList;
    supplierItemId: string;
    stockPkgBeforeDiscPrice: number;
    stockPoItemMoneyDiscTot: number;
    itemAvgCost: number;
    stockPoItemDiscount2: number;
    stockCostCenterId: number;
    poNormQty: number;
    poNormStockItemUnitId: string;
    whRemainQty: number;
    depRemainQty: number;
    stockPoPriceBeforeVat: number;
    stockPoPcTypeId: string;
    backOrderQty: number;
}