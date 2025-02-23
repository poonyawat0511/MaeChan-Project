import { Role } from "./role";

interface StockUser {
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

// Function to format date
export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

// Exporting the interface correctly (not needed for TypeScript interfaces)
export type { StockUser };