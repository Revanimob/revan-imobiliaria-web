
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Shield, Star, CheckCircle } from 'lucide-react';

const Certifications = () => {
  const certifications = [
    {
      title: 'CRECI - Conselho Regional de Corretores de Imóveis',
      number: 'CRECI/SP 12345-J',
      year: '1999',
      status: 'Ativa',
      description: 'Registro oficial que autoriza o exercício da atividade de corretor de imóveis.',
      icon: Shield
    },
    {
      title: 'Certificação ISO 9001:2015',
      number: 'ISO 9001:2015',
      year: '2018',
      status: 'Ativa',
      description: 'Sistema de gestão da qualidade certificado internacionalmente.',
      icon: Award
    },
    {
      title: 'SECOVI - Sindicato das Empresas de Compra, Venda e Locação',
      number: 'SECOVI/SP 789',
      year: '2000',
      status: 'Ativa',
      description: 'Filiação ao principal sindicato do setor imobiliário.',
      icon: CheckCircle
    },
    {
      title: 'Certificação de Excelência em Atendimento',
      number: 'CEA-2023',
      year: '2023',
      status: 'Ativa',
      description: 'Reconhecimento pela qualidade no atendimento ao cliente.',
      icon: Star
    },
    {
      title: 'Certificação Ambiental Green Building',
      number: 'GB-2022',
      year: '2022',
      status: 'Ativa',
      description: 'Compromisso com práticas sustentáveis no mercado imobiliário.',
      icon: Shield
    },
    {
      title: 'Certificação Digital Security',
      number: 'DS-2021',
      year: '2021',
      status: 'Ativa',
      description: 'Garantia de segurança digital e proteção de dados dos clientes.',
      icon: Award
    }
  ];

  const awards = [
    {
      title: 'Melhor Imobiliária da Região',
      year: '2023',
      organization: 'Prêmio Mercado Imobiliário'
    },
    {
      title: 'Excelência em Atendimento ao Cliente',
      year: '2022',
      organization: 'Associação dos Consumidores'
    },
    {
      title: 'Empresa Mais Confiável',
      year: '2021',
      organization: 'Ranking Empresas'
    },
    {
      title: 'Inovação Tecnológica',
      year: '2020',
      organization: 'Tech Awards Imobiliário'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-wine to-wine-dark text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">Nossas Certificações</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              Conheça todas as certificações, registros e prêmios que garantem nossa qualidade e confiabilidade.
            </p>
          </div>
        </section>

        {/* Certificações */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-wine mb-4">Certificações e Registros</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Todas as nossas certificações estão em dia e comprovam nosso comprometimento com a excelência.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => {
                const Icon = cert.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-wine">
                    <CardHeader className="pb-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 bg-wine bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-wine" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge 
                              variant={cert.status === 'Ativa' ? 'default' : 'secondary'}
                              className={cert.status === 'Ativa' ? 'bg-green-500' : ''}
                            >
                              {cert.status}
                            </Badge>
                            <span className="text-sm text-gray-500">{cert.year}</span>
                          </div>
                          <CardTitle className="text-lg text-wine leading-tight">
                            {cert.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-sm font-mono text-gray-600 bg-gray-50 p-2 rounded">
                          {cert.number}
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {cert.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Prêmios */}
        <section className="py-16 bg-beige-light">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-wine mb-4">Prêmios e Reconhecimentos</h2>
              <p className="text-xl text-gray-600">
                Nosso trabalho tem sido reconhecido por diversas organizações.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {awards.map((award, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-wine to-wine-dark rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-wine mb-2">{award.title}</h3>
                    <p className="text-sm text-gray-600 mb-1">{award.organization}</p>
                    <Badge variant="outline" className="text-wine border-wine">
                      {award.year}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Compromisso */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-wine mb-6">Nosso Compromisso</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Todas essas certificações representam nosso compromisso inabalável com a qualidade, 
                transparência e excelência no atendimento. Elas são a garantia de que você está 
                lidando com uma empresa séria, confiável e que segue todas as normas e regulamentações 
                do mercado imobiliário.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Certifications;
