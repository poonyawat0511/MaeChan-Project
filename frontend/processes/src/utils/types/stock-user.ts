import { Role } from "./role";

export interface StockUser {
  id: string;
  stockUserName: string;
  firstName: string,
  lastName: string,
  email: string,
  password:string,
  role: Role[],
}
