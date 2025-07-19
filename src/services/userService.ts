import { User } from "@/types/User";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_PROD}/api/users`;

// 🔹 Criar novo usuário admin
export async function addAdminUserService(payload: Partial<User>) {
  const response = await axios.post(`${BASE_URL}/`, payload);
  return response.data;
}
export async function getAllAdminUsersService() {
  const response = await axios.get(`${BASE_URL}/`);
  return response.data;
}

export async function getAdminUserByIdService(id: string) {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
}

export async function updateAdminUserByIdService(
  id: string,
  payload: Partial<User>
) {
  const response = await axios.put(`${BASE_URL}/${id}`, payload);
  return response.data;
}

export async function deleteAdminUserByIdService(id: string) {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
}
