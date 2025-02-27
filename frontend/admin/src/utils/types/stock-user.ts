import { Role } from "./role";

export interface StockUser {
  stockUserId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  signaturePath: string;
  userHospitalId: string;
  lineId: string;
  role: Role[];
}
