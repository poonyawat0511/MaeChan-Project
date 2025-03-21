export interface StockDepartment {
    departmentId: number;
    departmentName: string;
    oldCode: string;
    statusActive: 'Y' | 'N' | null; // หรือ boolean ถ้ามีการแปลง
    hosGuid: string;
    stockDepartmentTypeId: number;
    departmentBoardName1: string;
    departmentBoardName2: string;
    departmentBoardPosition1: string;
    departmentBoardPosition2: string;
    departmentType: number;
    departmentCode: string;
    storeExpiredItem: 'Y' | 'N' | null;
    stockAuthorizeTypeId: number;
    stockCostCenterId: number;
    noConfirmPay: 'Y' | 'N' | null;
    exclusiveOrder: 'Y' | 'N' | null;
    sapId: number;
    allowAdjust: 'Y' | 'N' | null;
    allowSapMig: 'Y' | 'N' | null;
    allowDonation: 'Y' | 'N' | null;
    allowManualDraw: 'Y' | 'N' | null;
    allowDepTransfer: 'Y' | 'N' | null;
    allowWhTransfer: 'Y' | 'N' | null;
    allowDepRtl: 'Y' | 'N' | null;
    allowDepPos: 'Y' | 'N' | null;
    allowManualRcv: 'Y' | 'N' | null;
    oweStock: 'Y' | 'N' | null;
    accDepartmentId: number;
    autoDailyCalcMrp: 'Y' | 'N' | null;
    lastDailyCalcMrp: string; // ISO Date format e.g. "2025-03-21"
  }
  