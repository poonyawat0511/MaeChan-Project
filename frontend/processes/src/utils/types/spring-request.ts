import { StockRequest } from "./stock-request";
import { UserHospital } from "./user-hospital";

export interface SpringRequest {
  id: number;
  stockRequest: StockRequest;
  camundaTaskId: string;
  userApprove: UserHospital;
  approverApproveStatus: boolean;
  userDirector: UserHospital;
  directorApproveStatus: boolean;
  directorApproveDate: string; // ISO Date string e.g., "2025-03-21"
  allCompleteStatus: boolean;
}
