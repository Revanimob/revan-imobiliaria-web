import { whatsappMessage } from "@/types/wpp";

export function sendWpp(payload: whatsappMessage) {
  let message = `${payload.mensagem}`;
  //let phoneNumber = import.meta.env.VITE_NUMBER_WPP_PROD;
  let phoneNumber = "+5521971103344";

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank");
}
