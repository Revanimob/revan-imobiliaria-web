import { Ilogin } from "@/types/login";
import axios from "axios";

export async function LoginService(payload: Ilogin) {
  const response = await axios.post(
    `${import.meta.env.VITE_DEV}/auth/login`,
    payload
  );
  return response.data;
}
