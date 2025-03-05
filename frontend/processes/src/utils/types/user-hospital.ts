import { Role } from "./role";
import { StockUser } from "./stock-user";

export interface UserHospital {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  signaturePath: string;
  stockUserId: StockUser;
  lineId: string;
  role: Role;
}

