export interface StockPurchaseType {
    purchaseType: number;
    purchaseTypeName: string;
    hosGuid: string;
    checkMaxTotal: 'Y' | 'N' | null;
    maxTotal: number;
  }
  