import { StepIconClassKey } from "@mui/material";

export interface StockItems {
    id: string;
    itemId: string;
    itemName: string;
    itemUnit: number;
    itemType: number;
    itemUseStatus: boolean;    
    reorderLevel: number;
    reorderQty: number;
    unitCost: number;
    oldcode: string;
    fixDepartment: string;
    stockItemCostTypeId: string;
    stockClassId: string;
    unitPrice: number;
    itemCode: string;
    stockItemRegdate: Date;
    safetyStock: number;
    onhandQty: number;
    lastActiveDate: Date;
    lastPoDate: Date;
    itemCommonName: string;
    stockItemMtrId: string;
    stockItemAcctId: string;
    stockSubClassId: string;
    itemTradeName: string;
    stockItemNote: string;
    lastPoPrice: number;
    stockItemStdPrice: number;
    stockItemRefPrice: number;
    expireQty: number;
    supplierListText: string;
    vendorListText: string;
    poWaitQty: number;
    lastDeliverDate: Date;
    itemMinQty: number;
    itemMaxQty: number;
    lastPoPrice1: number;
    lastStockVendorId: string;
    stockItemEdTypeId: string; 
    lastCalcSiMap: Date;
    updateDatetime: Date;
    drugitemsNoSubstock: boolean;

}