import { Property } from "@/types/property";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_DEV}/api/properties`;

// 🔹 Criar nova propriedade
export async function addPropertyService(payload: Partial<Property>) {
  const response = await axios.post(`${BASE_URL}`, payload);
  return response.data;
}

// 🔹 Buscar todas as propriedades
export async function getAllPropertiesService() {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
}

// 🔹 Buscar propriedade por ID
export async function getPropertyByIdService(id: string) {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
}

// 🔹 Atualizar propriedade
export async function updatePropertyService(
  id: string,
  payload: Partial<Property>
) {
  const response = await axios.put(`${BASE_URL}/${id}`, payload);
  return response.data;
}

// 🔹 Deletar propriedade
export async function deletePropertyService(id: string) {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
}
