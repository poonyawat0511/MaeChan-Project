import { StockUser } from "./stock-user";
import { StockWarehouse } from "./stock-warehouse";

export interface StockPo {
    id: string;
    stockPoId: string;
    warehouseId: StockWarehouse;
    stockPoNo: string;
    stockPoDate: Date;
    purchaseType: string;
    paidStatusId: string;
    poAmount: number;
    poItemAmount: number;
    bdgYear: number;
    deliverCount: number;
    deliverComplete: boolean;
    poTypeId: string;
    stockPoTax: boolean;
    stockPoVat: number;
    stockPoDiscount: number;
    stockPoDiscountTotal: number;
    deliverCancel: boolean;
    poCancel: boolean;
    cancelReason: string;
    note: string;
    deliveryRefDate: Date;
    offerDate: Date;
    endDate: Date;
    transportDay: number;
    departmentId: string;
    stockUserId: StockUser;
    stockBudgetUse: number
    stockBudgetRemain: number
    stockBudgetPrice: number
    isTemp: boolean
    stockVendorId: number
    stockPaidTypeId: number
    stockPoVatAmount: number
    stockPoRefId: number
    stockVendorDiscTypeId: number
    stockVendorDiscPercent: number
    stockPoBeforeDiscountAmt: number
    stockPoVendorDiscAmt: number
    stockPoBeforeVatAmt: number
    stockPoManualDiscAmt: number
    stockPoAdjBeforeVat: number
    poEstDeliverDate: Date
    poDeliverAmount: number
    deliverStop: boolean
    priceIncVat: boolean
}