import { axiosInstance } from "./api";
import { Role } from "@/utils/types/role";

export async function patchUserRole(userId: number, role: Role) {
  const formData = new FormData();
  formData.append("role", role);

  return axiosInstance.patch(`/user-hospital/${userId}/role`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}