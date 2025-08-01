import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import { Imail } from "@/types/mail";
import { sendMailService } from "@/services/sendEmail";
import { toast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const quickLinks = [
    { label: "Imóveis para Venda", href: "#" },
    { label: "Imóveis para Locação", href: "#" },
    { label: "Lançamentos", href: "#" },
    { label: "Financiamento", href: "#" },
    { label: "Avaliação Gratuita", href: "#" },
  ];

  const services = [
    { label: "Compra e Venda", href: "#" },
    { label: "Locação", href: "#" },
    { label: "Administração Predial", href: "#" },
    { label: "Consultoria", href: "#" },
    { label: "Gestão de Investimentos", href: "#" },
  ];

  const regions = [
    { label: "Copacabana", href: "#" },
    { label: "Ipanema", href: "#" },
    { label: "Barra da Tijuca", href: "#" },
    { label: "Leblon", href: "#" },
    { label: "Centro", href: "#" },
  ];

  const handleMail = async () => {
    if (!email) return toast({ title: "Digite um e-mail válido." });
    try {
      setLoading(true);
      sendMailService({ message: `Novo cadastro de e-mail: ${email}` });
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

  return (
    <footer className="bg-wine text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">REVAN</h3>
                <p className="text-sm opacity-90">IMOBILIÁRIA</p>
              </div>
            </div>
            <p className="text-white opacity-90 leading-relaxed">
              Há 25 anos conectando pessoas aos melhores imóveis com ética,
              transparência e excelência no atendimento.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 opacity-80" />
                <span className="text-sm opacity-90">
                  Av. Atlântica, 1500 - Copacabana, RJ
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
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white opacity-90 hover:opacity-100 hover:underline transition-all duration-200 text-sm"
                  >
                    {link.label}
                  </a>
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
                  <a
                    href={service.href}
                    className="text-white opacity-90 hover:opacity-100 hover:underline transition-all duration-200 text-sm"
                  >
                    {service.label}
                  </a>
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
              <div className="flex space-x-3">
                {[
                  { icon: Facebook, href: "#" },
                  {
                    icon: Instagram,
                    href: "https://www.instagram.com/revanimoveis/?utm_source=ig_web_button_share_sheet",
                  },
                  { icon: Linkedin, href: "#" },
                  { icon: Youtube, href: "#" },
                ].map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
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
              <a
                key={index}
                href={region.href}
                className="text-white opacity-90 hover:opacity-100 hover:underline transition-all duration-200 text-sm"
              >
                {region.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-wine-dark border-t border-white border-opacity-20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm opacity-90">
              © 2024 REVAN Imobiliária. Todos os direitos reservados.
            </div>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="opacity-90 hover:opacity-100 hover:underline"
              >
                Política de Privacidade
              </a>
              <a
                href="#"
                className="opacity-90 hover:opacity-100 hover:underline"
              >
                Termos de Uso
              </a>
              <a
                href="#"
                className="opacity-90 hover:opacity-100 hover:underline"
              >
                LGPD
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
