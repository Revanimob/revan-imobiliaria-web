import { Imail } from "@/types/mail";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_PROD}/api/send-mail`;

export async function sendMailService(payload: Imail) {
  console.log(payload);

  const response = await axios.post(`${BASE_URL}`, payload);
  console.log(response);
  return response.data;
}
