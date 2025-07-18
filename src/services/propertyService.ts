import { Property } from "@/types/property";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_DEV}/property`;

// 🔹 Criar nova propriedade
export async function addPropertyService(payload: Property) {
  const response = await axios.post(`${BASE_URL}/add`, payload);
  return response.data;
}

// 🔹 Buscar todas as propriedades
export async function getAllPropertiesService() {
  const response = await axios.get(`${BASE_URL}/all`);
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
  const response = await axios.put(`${BASE_URL}/update/${id}`, payload);
  return response.data;
}

// 🔹 Deletar propriedade
export async function deletePropertyService(id: string) {
  const response = await axios.delete(`${BASE_URL}/delete/${id}`);
  return response.data;
}
