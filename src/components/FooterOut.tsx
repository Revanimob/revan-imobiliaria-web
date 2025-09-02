import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import { sendMailService } from "@/services/sendEmail";
import { toast } from "@/hooks/use-toast";
import RevanSemFundo from "@/assets/RevanSemFundo.png";
import badge from "@/assets/badge.png";
import { useNavigate, useLocation } from "react-router-dom";

const FooterOut = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [targetSection, setTargetSection] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const quickLinks = [
    { label: "Compra", section: "imoveis" },
    { label: "Aluguel", section: "imoveis" },
    { label: "Lançamentos", section: "imoveis" },
  ];

  const services = [
    { label: "Compra e Venda", section: "servicos" },
    { label: "Locação", section: "servicos" },
    { label: "Administração Predial", section: "servicos" },
    { label: "Consultoria", section: "servicos" },
  ];

  const regions = [
    { label: "Copacabana" },
    { label: "Ipanema" },
    { label: "Barra da Tijuca" },
    { label: "Leblon" },
    { label: "Centro" },
    { label: "Campo Grande" },
    { label: "Santa Cruz" },
    { label: "Santissimo" },
    { label: "Cosmos" },
    { label: "Paciência" },
    { label: "Guaratiba" },
  ];

  // scroll quando navegar para home
  useEffect(() => {
    if (targetSection && location.pathname === "/") {
      const element = document.getElementById(targetSection);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setTargetSection(null);
    }
  }, [location.pathname, targetSection]);

  const handleMail = async () => {
    if (!email) return toast({ title: "Digite um e-mail válido." });
    try {
      setLoading(true);
      await sendMailService({ message: `Novo cadastro de e-mail: ${email}` });
      toast({ title: "E-mail enviado com sucesso!" });
      setEmail("");
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro!",
        description: "Erro ao enviar e-mail.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `/#${sectionId}`);
      }
    } else {
      setTargetSection(sectionId);
      navigate("/");
    }
  };

  useEffect(() => {
    if (targetSection && location.pathname === "/") {
      const interval = setInterval(() => {
        const element = document.getElementById(targetSection);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.replaceState(null, "", `/#${targetSection}`);
          setTargetSection(null);
          clearInterval(interval);
        }
      }, 50); // tenta a cada 50ms até encontrar o elemento
      return () => clearInterval(interval);
    }
  }, [location.pathname, targetSection]);

  return (
    <footer className="bg-wine text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <img
                src={RevanSemFundo}
                alt="Logo Revan"
                className="w-28 h-auto object-contain"
              />
              <div>
                <h3 className="text-2xl font-bold">REVAN</h3>
                <p className="text-sm opacity-90">Consultoria Imobiliária</p>
              </div>
            </div>
            <p className="text-white opacity-90 leading-relaxed">
              Conectando pessoas aos melhores imóveis com ética, transparência e
              excelência no atendimento.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 opacity-80" />
                <span className="text-sm opacity-90">
                  Estrada do Mendanha 789 sala 418 - RJ
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 opacity-80" />
                <span className="text-sm opacity-90">(21)97110-3344</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 opacity-80" />
                <span className="text-sm opacity-90">revanimob@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <img src={badge} className="w-5 h-5" />
                <span className="text-sm opacity-90">
                  Creci Juridico: 12246
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.section)}
                    className="text-white opacity-90 hover:opacity-100 hover:underline transition-all duration-200 text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Serviços</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(service.section)}
                    className="text-white opacity-90 hover:opacity-100 hover:underline transition-all duration-200 text-sm"
                  >
                    {service.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Newsletter</h4>
            <p className="text-white opacity-90 text-sm mb-4">
              Receba as melhores oportunidades do mercado imobiliário
            </p>
            <div className="space-y-3 mb-6">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu e-mail"
                className="bg-white bg-opacity-20 border-white border-opacity-30 text-white placeholder:text-white placeholder:opacity-70"
              />
              <Button
                className="w-full bg-white text-wine hover:bg-beige hover:text-wine"
                onClick={handleMail}
                disabled={loading}
              >
                {loading ? "Enviando..." : "Inscrever-se"}
              </Button>
            </div>

            {/* Social Media */}
            <div>
              <h5 className="font-semibold mb-3">Siga-nos</h5>
              <div className="flex space-x-3 mb-4">
                {[Facebook, Instagram, Linkedin, Youtube].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              <div className="mt-4">
                <button
                  onClick={() => navigate("/login")}
                  className="inline-block text-xs opacity-70 hover:opacity-90 underline transition-opacity duration-200 bg-transparent border-none cursor-pointer"
                >
                  Acesso Administrativo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Regions */}
        <Separator className="my-8 bg-white bg-opacity-20" />
        <div>
          <h4 className="text-lg font-semibold mb-4">Regiões Atendidas</h4>
          <div className="flex flex-wrap gap-4">
            {regions.map((region, index) => (
              <span
                key={index}
                className="text-white opacity-90 hover:opacity-100 hover:underline transition-all duration-200 text-sm"
              >
                {region.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-wine-dark border-t border-white border-opacity-20">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm opacity-90">
            © 2024 REVAN Imobiliária. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterOut;
