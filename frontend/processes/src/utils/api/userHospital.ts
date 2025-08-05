import { Role } from "@/types/role";
import { axiosInstance } from "./api";

export async function patchUserRole(userId: number, role: Role) {
  const formData = new FormData();
  formData.append("role", role);

  return axiosInstance.patch(`/user-hospital/${userId}/role`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}