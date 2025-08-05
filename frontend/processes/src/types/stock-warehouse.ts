export interface StockWarehouse {
  warehouseId: number;
  warehouseName: string;
  warehouseOfficerPoName: string;
  warehouseOfficerPoPosition: string;
  warehouseOfficerDirectorName: string;
  warehouseOfficerDirectorPosition: string;
  warehouseOfficerChairmanName: string;
  warehouseOfficerChairmanPosition: string;
  warehouseOfficerBoardName1: string;
  warehouseOfficerBoardPosition1: string;
  warehouseOfficerBoardName2: string;
  warehouseOfficerBoardPosition2: string;
  oldCode: string;
  hosGuid: string;
  warehouseResponsibleOfficer: string;
  warehouseLocation: string;
  warehouseActive: 'Y' | 'N' | null; // Java 'Character' mapped to boolean flag
  warehouseCode: string;
  warehouseWritePoName: string;
  warehouseWritePoPosition: string;
  warehouseIssueName: string;
  warehouseIssuePosition: string;
  warehousePrefact: string;
  warehouseDefault: 'Y' | 'N' | null; // Java 'Character' mapped to boolean flag
  documentPrefix: string;
  deliverDocumentPrefix: string;
}
