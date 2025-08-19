import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Home,
  Search,
  DollarSign,
  FileText,
  User,
  Calendar,
} from "lucide-react";
import ServiceContactModal from "./ServiceContactModal";
import { sendWpp } from "@/services/wppService";

const Services = () => {
  const [selectedService, setSelectedService] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const services = [
    {
      icon: Search,
      title: "Compra de Imóveis",
      description:
        "Encontre o imóvel perfeito com nossa equipe especializada. Acompanhamento completo desde a busca até a escrituração.",
      features: [
        "Avaliação gratuita",
        "Marketing digital",
        "Fotos profissionais",
        "Acompanhamento jurídico",
      ],
    },
    // {
    //   icon: Home,
    //   title: "Venda de Imóveis",
    //   description:
    //     "Venda seu imóvel rapidamente e pelo melhor preço. Marketing digital e estratégias de vendas eficazes.",
    //   features: [
    //     "Avaliação gratuita",
    //     "Marketing digital",
    //     "Fotos profissionais",
    //     "Acompanhamento jurídico",
    //   ],
    // },
    {
      icon: FileText,
      title: "Locação",
      description:
        "Serviços completos de locação para proprietários e inquilinos. Gestão de contratos e administração predial.",
      features: [
        "Análise de inquilinos",
        "Contratos seguros",
        "Administração predial",
        "Suporte jurídico",
      ],
    },
    {
      icon: DollarSign,
      title: "Financiamento",
      description:
        "Facilitamos seu crédito imobiliário com as melhores condições do mercado. Parcerias com principais bancos.",
      features: [
        "Simulação online",
        "Pré-aprovação",
        "Melhores taxas",
        "Acompanhamento total",
      ],
    },
    {
      icon: FileText,
      title: "Consultoria",
      description:
        "Consultoria especializada em investimentos imobiliários. Análise de mercado e oportunidades de investimento.",
      features: [
        "Análise de mercado",
        "Estratégias de investimento",
        "Relatórios detalhados",
        "Acompanhamento contínuo",
      ],
    },
    {
      icon: Home,
      title: "Anunciar seu Imóvel",
      description:
        "Oferecemos consultoria especializada para quem deseja anunciar imóveis. Nossa equipe analisa o mercado, identifica oportunidades e garante que seu anúncio seja visto pelas pessoas certas.",
      features: [
        "Análise de mercado",
        "Estratégias de investimento",
        "Relatórios detalhados",
        "Acompanhamento contínuo",
      ],
    },
    {
      icon: Calendar,
      title: "Gestão Predial",
      description:
        "Administração completa de condomínios e propriedades. Manutenção, zeladoria e gestão financeira.",
      features: [
        "Administração condominial",
        "Manutenção preventiva",
        "Gestão financeira",
        "Relatórios mensais",
      ],
    },
  ];

  const handleSaibaMais = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setIsModalOpen(true);
  };

  const handleSendMessage = () => {
    const message = "Olá, gostaria de um auxílio de especialista da Revan";
    sendWpp({ mensagem: message });
  };

  return (
    <>
      <section id="servicos" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-wine mb-4">
              Nossos Serviços
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos soluções completas no mercado imobiliário com
              excelência
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-wine"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto w-16 h-16 bg-wine bg-opacity-10 rounded-full flex items-center justify-center mb-4 group-hover:bg-wine group-hover:bg-opacity-20 transition-colors">
                      <Icon className="w-8 h-8 text-wine" />
                    </div>
                    <CardTitle className="text-xl text-wine">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="text-sm text-gray-700 flex items-center justify-center"
                        >
                          <div className="w-2 h-2 bg-wine rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant="outline"
                      className="border-wine text-wine hover:bg-wine hover:text-white w-full"
                      onClick={() => handleSaibaMais(service.title)}
                    >
                      Saiba Mais
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-wine to-wine-dark rounded-2xl p-8 md:p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Precisa de Ajuda?</h3>
            <p className="text-xl mb-6 opacity-90">
              Nossa equipe de especialistas está pronta para atender você
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-wine hover:bg-beige px-8"
                onClick={handleSendMessage}
              >
                Fale Conosco
              </Button>
              {/* <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-wine px-8"
              >
                Agendar Consulta
              </Button> */}
            </div>
          </div>
        </div>
      </section>

      <ServiceContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={selectedService}
      />
    </>
  );
};

export default Services;
