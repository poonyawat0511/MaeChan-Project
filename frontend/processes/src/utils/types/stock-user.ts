import { Role } from "./role";

export interface StockUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  signature: string;
  hospitalId: string;
  lineId: string;
  role: Role[];
}
