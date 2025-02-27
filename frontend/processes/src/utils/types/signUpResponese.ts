import { Role } from "./role";

export interface signUpResponse {
  stockUserId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  signature: string;
  userHospitalId: string;
  lineId: string;
  role: Role;
}
