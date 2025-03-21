import { Officer } from "../types/Officer";
import { Role } from "./role";

export interface UserHospital {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  signaturePath: string;
  stockUserId: Officer;
  lineId: string;
  Active: boolean;
  role: Role;
}
