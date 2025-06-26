
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, MapPin, Award, Calendar } from 'lucide-react';

const TeamProfiles = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Maria Silva',
      position: 'Diretora Geral',
      experience: '15 anos',
      creci: 'CRECI 12345-F',
      specialties: ['Vendas Residenciais', 'Consultoria', 'Gestão'],
      phone: '(11) 99999-0001',
      email: 'maria.silva@revan.com.br',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b412?w=300&h=300&fit=crop&crop=face',
      bio: 'Formada em Administração com especialização em Mercado Imobiliário. Lidera nossa equipe com excelência há mais de 10 anos.',
      achievements: ['Melhor Vendedora 2023', 'Certificação Internacional', '500+ Imóveis Vendidos']
    },
    {
      id: 2,
      name: 'João Santos',
      position: 'Gerente de Vendas',
      experience: '12 anos',
      creci: 'CRECI 67890-F',
      specialties: ['Imóveis Comerciais', 'Investimentos', 'Locação'],
      phone: '(11) 99999-0002',
      email: 'joao.santos@revan.com.br',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      bio: 'Especialista em imóveis comerciais com vasta experiência no mercado corporativo. Foco em grandes negociações.',
      achievements: ['Gerente do Ano 2022', 'Especialização em Mercado Comercial', '300+ Contratos Fechados']
    },
    {
      id: 3,
      name: 'Ana Costa',
      position: 'Consultora Senior',
      experience: '8 anos',
      creci: 'CRECI 11111-F',
      specialties: ['Imóveis Residenciais', 'Primeiro Imóvel', 'Financiamento'],
      phone: '(11) 99999-0003',
      email: 'ana.costa@revan.com.br',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      bio: 'Especializada em ajudar clientes na conquista do primeiro imóvel. Conhecimento profundo em financiamentos.',
      achievements: ['Top 10 Vendedores', 'Certificação FIPE', '200+ Famílias Realizadas']
    },
    {
      id: 4,
      name: 'Carlos Oliveira',
      position: 'Corretor Especialista',
      experience: '10 anos',
      creci: 'CRECI 22222-F',
      specialties: ['Imóveis de Luxo', 'Consultoria VIP', 'Investimentos'],
      phone: '(11) 99999-0004',
      email: 'carlos.oliveira@revan.com.br',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      bio: 'Focado no segmento de imóveis de alto padrão. Atendimento personalizado para clientes VIP.',
      achievements: ['Especialista em Luxo', 'Maior Ticket Médio', '50+ Imóveis Premium']
    },
    {
      id: 5,
      name: 'Fernanda Lima',
      position: 'Consultora de Locação',
      experience: '6 anos',
      creci: 'CRECI 33333-F',
      specialties: ['Locação Residencial', 'Administração Predial', 'Contratos'],
      phone: '(11) 99999-0005',
      email: 'fernanda.lima@revan.com.br',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face',
      bio: 'Especialista em locação com foco em relacionamento duradouro entre proprietários e inquilinos.',
      achievements: ['Expert em Locação', 'Taxa Zero Inadimplência', '150+ Contratos Ativos']
    },
    {
      id: 6,
      name: 'Roberto Mendes',
      position: 'Analista de Mercado',
      experience: '7 anos',
      creci: 'CRECI 44444-F',
      specialties: ['Avaliação de Imóveis', 'Análise de Mercado', 'Consultoria'],
      phone: '(11) 99999-0006',
      email: 'roberto.mendes@revan.com.br',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=300&h=300&fit=crop&crop=face',
      bio: 'Responsável pelas análises de mercado e avaliações. Conhecimento técnico aprofundado em precificação.',
      achievements: ['Certificação IBAPE', 'Analista Sênior', '1000+ Avaliações']
    }
  ];

  const handleContact = (member: any) => {
    alert(`Entrando em contato com ${member.name}. Em breve, você será direcionado para o WhatsApp ou e-mail.`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-wine to-wine-dark text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">Nossa Equipe</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              Conheça os profissionais especializados que farão toda a diferença na sua experiência imobiliária.
            </p>
          </div>
        </section>

        {/* Team Members */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-wine mb-4">Profissionais Qualificados</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Cada membro da nossa equipe possui vasta experiência e certificações para oferecer o melhor atendimento.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <Card key={member.id} className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-wine">
                  <CardContent className="p-6">
                    {/* Foto e Info Básica */}
                    <div className="text-center mb-6">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h3 className="text-xl font-bold text-wine mb-1">{member.name}</h3>
                      <p className="text-gray-600 font-medium">{member.position}</p>
                      <div className="flex items-center justify-center space-x-2 mt-2">
                        <Badge variant="outline" className="text-wine border-wine">
                          {member.experience}
                        </Badge>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          {member.creci}
                        </Badge>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                      {member.bio}
                    </p>

                    {/* Especialidades */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-wine mb-2">Especialidades:</h4>
                      <div className="flex flex-wrap gap-1">
                        {member.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Conquistas */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-wine mb-2">Principais Conquistas:</h4>
                      <ul className="space-y-1">
                        {member.achievements.map((achievement, index) => (
                          <li key={index} className="text-xs text-gray-600 flex items-center">
                            <Award className="w-3 h-3 mr-1 text-wine" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Contato */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2 text-wine" />
                        {member.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2 text-wine" />
                        {member.email}
                      </div>
                    </div>

                    {/* Botão de Contato */}
                    <Button 
                      className="w-full bg-wine hover:bg-wine-dark text-white"
                      onClick={() => handleContact(member)}
                    >
                      Falar com {member.name.split(' ')[0]}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TeamProfiles;
