import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Home, Calendar } from "lucide-react";

const AboutUs = () => {
  const stats = [
    { icon: Home, value: "10.000+", label: "Imóveis Vendidos" },
    { icon: Users, value: "5.000+", label: "Clientes Satisfeitos" },
    { icon: Award, value: "25", label: "Anos de Experiência" },
    { icon: Calendar, value: "100+", label: "Negócios por Mês" },
  ];

  const team = [
    {
      name: "Roberto Silva",
      role: "Diretor Geral",
      experience: "25 anos",
      specialty: "Investimentos de Alto Padrão",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face",
    },
    {
      name: "Ana Paula Costa",
      role: "Gerente de Vendas",
      experience: "15 anos",
      specialty: "Residencial e Comercial",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    },
    {
      name: "Carlos Eduardo",
      role: "Consultor Senior",
      experience: "18 anos",
      specialty: "Lançamentos e Plantas",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    },
    {
      name: "Marina Oliveira",
      role: "Especialista em Locação",
      experience: "12 anos",
      specialty: "Administração Predial",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    },
  ];

  return (
    <section id="sobre" className="py-16 bg-beige-light">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-wine mb-4">Sobre a REVAN</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Há mais de duas décadas conectando pessoas aos melhores imóveis com
            ética, transparência e excelência no atendimento
          </p>
        </div>

        {/* Company Story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-wine mb-6">
              Nossa História
            </h3>
            <div className="space-y-4 text-gray-700">
              <p>
                Fundada em 1999, a REVAN nasceu com o propósito de revolucionar
                o mercado imobiliário através de um atendimento personalizado e
                soluções inovadoras.
              </p>
              <p>
                Onde o endereço certo encontra você, construímos uma reputação
                sólida baseada na confiança, transparência e resultados
                excepcionais para nossos clientes.
              </p>
              <p>
                Hoje, somos referência no mercado imobiliário, oferecendo desde
                imóveis residenciais até oportunidades de investimento de alto
                padrão.
              </p>
            </div>
            <div className="mt-6">
              <Button className="bg-wine hover:bg-wine-dark text-white mr-4">
                Nossa História Completa
              </Button>
              <Button
                variant="outline"
                className="border-wine text-wine hover:bg-wine hover:text-white"
              >
                Certificações
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop"
              alt="Escritório REVAN"
              className="rounded-xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-wine text-white p-6 rounded-xl">
              <div className="text-3xl font-bold">25+</div>
              <div className="text-sm">Anos de Experiência</div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="mx-auto w-12 h-12 bg-wine bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-wine" />
                  </div>
                  <div className="text-3xl font-bold text-wine mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Team */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-wine text-center mb-12">
            Nossa Equipe
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="text-center overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-wine text-white">
                      {member.experience}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg text-wine mb-1">
                    {member.name}
                  </h4>
                  <p className="text-wine text-sm mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4">
                    {member.specialty}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-wine text-wine hover:bg-wine hover:text-white w-full"
                  >
                    Ver Perfil
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center p-8 border-t-4 border-t-wine">
            <CardContent className="p-0">
              <h4 className="text-xl font-bold text-wine mb-4">Missão</h4>
              <p className="text-gray-700">
                Conectar pessoas aos melhores imóveis, oferecendo soluções
                personalizadas e um atendimento de excelência que supere
                expectativas.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center p-8 border-t-4 border-t-wine">
            <CardContent className="p-0">
              <h4 className="text-xl font-bold text-wine mb-4">Visão</h4>
              <p className="text-gray-700">
                Ser a imobiliária de referência no mercado, reconhecida pela
                inovação, ética e pelos resultados excepcionais entregues aos
                clientes.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center p-8 border-t-4 border-t-wine">
            <CardContent className="p-0">
              <h4 className="text-xl font-bold text-wine mb-4">Valores</h4>
              <p className="text-gray-700">
                Transparência, ética, inovação, excelência no atendimento e
                compromisso com a satisfação total de nossos clientes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
