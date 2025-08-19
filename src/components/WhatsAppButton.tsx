import React, { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { sendWpp } from "@/services/wppService";

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleWhatsAppClick = () => {
    sendWpp({
      mensagem: "Olá! Gostaria de saber mais sobre os imóveis disponíveis."
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Se o footer está visível na tela (pelo menos 100px do footer está visível)
        const footerIsVisible = footerRect.top < windowHeight - 100;
        setIsVisible(!footerIsVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

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