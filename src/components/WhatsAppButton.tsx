import React from "react";
import { MessageCircle } from "lucide-react";
import { sendWpp } from "@/services/wppService";

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    sendWpp({
      mensagem: "Olá! Gostaria de saber mais sobre os imóveis disponíveis."
    });
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-bounce"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle size={28} />
    </button>
  );
};

export default WhatsAppButton;