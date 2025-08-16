import { Property } from "@/contexts/PropertyContext";
import { SaleForm } from "@/types/sale";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_PROD}/api/sales`;

// 🔹 Criar nova venda
export async function addSaleService(
  payloadSale: SaleForm,
  payloadProperty: Property
) {
  let payload = [payloadSale, payloadProperty];
  const response = await axios.post(`${BASE_URL}`, payload);
  return response.data;
}

// 🔹 Buscar todas as propriedades
export async function getAllSaleService() {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
}

// 🔹 Buscar propriedade por ID
export async function getSaleByIdService(id: number) {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
}

// 🔹 Atualizar propriedade
export async function updateSaleService(
  id: number,
  payload: Partial<SaleForm>
) {
  const response = await axios.put(`${BASE_URL}/${id}`, payload);
  return response.data;
}

// 🔹 Deletar propriedade
export async function deleteSaleService(id: number) {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
}
