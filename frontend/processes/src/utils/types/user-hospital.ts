import { Officer } from "../types/officer";
import { Role } from "./role";

export interface UserHospital {
  id: number;
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
