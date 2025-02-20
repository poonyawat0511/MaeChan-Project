import { StockItems } from "./stock-items";
import { StockRequest } from "./stock-request";

export interface StockRequestList {
    id: string;
    requestId: StockRequest;
    itemId: StockItems;
    requestQty: number;
    requestLeftQty: number;
    stockItemUnitId: string; 
    rate1Month: number; //type not sure
    stockItemUnitStandardPrice: number;
    packagePrice: number;
    lastPrice: number;
    totalPrice: number;
    tradeName: string;
    totalPlanQty: number;
    totalPoQty: number;
    stockVendorId: string; 
    supplierItemId: string;
    stockPoPcTypeId: string;
    trimester: number; //type not sure
    trimesterPlanQty: number;
    trimesterPlanAmount: number;
    trimesterPlanUseQty: number;
    trimesterPlanUseAmount: number;
    trimesterPlanRemainQty: number;
    trimesterPlanRemainAmount: number;
    vatPrice: number;
    totalPriceBeforeVat: number;
}