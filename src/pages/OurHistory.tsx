import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Award, Users, Building } from "lucide-react";

const OurHistory = () => {
  const milestones = [
    {
      year: "1999",
      title: "Fundação da REVAN",
      description:
        "Início de nossa jornada no mercado imobiliário com foco em excelência e confiança.",
      icon: Building,
    },
    {
      year: "2005",
      title: "Expansão dos Serviços",
      description:
        "Ampliação do portfólio com serviços de consultoria e gestão predial.",
      icon: Users,
    },
    {
      year: "2010",
      title: "Reconhecimento do Mercado",
      description:
        "Primeira certificação como imobiliária de referência na região.",
      icon: Award,
    },
    {
      year: "2015",
      title: "Era Digital",
      description:
        "Modernização dos processos e criação da plataforma digital para clientes.",
      icon: Calendar,
    },
    {
      year: "2020",
      title: "Inovação e Crescimento",
      description:
        "Implementação de tecnologias inovadoras e expansão para novos mercados.",
      icon: Building,
    },
    {
      year: "2024",
      title: "25 Anos de Sucesso",
      description:
        "Celebramos 25 anos de história, com mais de 5.000 imóveis vendidos e milhares de famílias realizadas.",
      icon: Award,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-wine to-wine-dark text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">Nossa História</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              São anos construindo sonhos e realizando histórias. Conheça a
              trajetória que nos trouxe até aqui.
            </p>
          </div>
        </section>

        {/* História */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-wine mb-4">
                  Uma Jornada de Conquistas
                </h2>
                <p className="text-xl text-gray-600">
                  Desde 1999, a REVAN Imobiliária tem sido sinônimo de
                  confiança, qualidade e excelência no mercado imobiliário.
                </p>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700 mb-12">
                <p>
                  A REVAN Imobiliária nasceu do sonho de seus fundadores em
                  criar uma empresa que fosse além de simplesmente vender
                  imóveis. Nossa missão sempre foi construir relacionamentos
                  duradouros e ajudar pessoas a realizarem o sonho da casa
                  própria.
                </p>
                <p>
                  Enfrentamos desafios, celebramos conquistas e, principalmente,
                  aprendemos que cada cliente é único e merece atenção especial.
                  Esta filosofia nos levou a ser reconhecidos como uma das
                  imobiliárias mais confiáveis da região.
                </p>
                <p>
                  Hoje, com uma equipe de profissionais altamente qualificados e
                  processos modernos, continuamos evoluindo para oferecer sempre
                  o melhor serviço aos nossos clientes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 bg-beige-light">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-wine text-center mb-12">
              Marcos da Nossa História
            </h2>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {milestones.map((milestone, index) => {
                  const Icon = milestone.icon;
                  return (
                    <Card
                      key={index}
                      className="border-l-4 border-l-wine hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-wine rounded-full flex items-center justify-center">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="text-2xl font-bold text-wine">
                                {milestone.year}
                              </span>
                              <h3 className="text-xl font-semibold text-gray-900">
                                {milestone.title}
                              </h3>
                            </div>
                            <p className="text-gray-600">
                              {milestone.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Números */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-wine text-center mb-12">
              Nossos Números
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { number: "25+", label: "Anos de Experiência" },
                { number: "5.000+", label: "Imóveis Vendidos" },
                { number: "10.000+", label: "Clientes Satisfeitos" },
                { number: "50+", label: "Profissionais Especializados" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-wine mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OurHistory;
