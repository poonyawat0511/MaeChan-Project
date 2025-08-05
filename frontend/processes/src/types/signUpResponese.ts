import { Role } from "./role";
export interface signUpResponse {
  userHospitalId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  signature: string;
  officerId: number;
  lineId: string;
  role: Role;
}
