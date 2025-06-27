
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Mail, 
  MailOpen, 
  Star,
  Archive,
  Trash2,
  Reply,
  Phone,
  Calendar
} from 'lucide-react';

const AdminMessages = () => {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const messages = [
    {
      id: 1,
      name: 'Maria Silva',
      email: 'maria.silva@email.com',
      phone: '(21) 99999-9999',
      subject: 'Interesse em imóvel - Copacabana',
      preview: 'Gostaria de mais informações sobre o apartamento de 3 quartos...',
      content: 'Olá! Gostaria de mais informações sobre o apartamento de 3 quartos em Copacabana que vi no site. Podemos agendar uma visita? Tenho interesse em conhecer o imóvel o mais breve possível.',
      date: '2024-01-15T10:30:00',
      isRead: false,
      isStarred: true,
      type: 'interesse',
      property: 'Apartamento 3Q - Copacabana'
    },
    {
      id: 2,
      name: 'João Santos',
      email: 'joao.santos@email.com',
      phone: '(21) 88888-8888',
      subject: 'Dúvida sobre financiamento',
      preview: 'Preciso esclarecer algumas dúvidas sobre as opções de financiamento...',
      content: 'Boa tarde! Estou interessado em comprar um imóvel e gostaria de esclarecer algumas dúvidas sobre as opções de financiamento disponíveis. Vocês trabalham com qual banco?',
      date: '2024-01-15T09:15:00',
      isRead: true,
      isStarred: false,
      type: 'financiamento',
      property: null
    },
    {
      id: 3,
      name: 'Ana Costa',
      email: 'ana.costa@email.com',
      phone: '(21) 77777-7777',
      subject: 'Agendamento de visita',
      preview: 'Gostaria de agendar uma visita para o imóvel em Ipanema...',
      content: 'Olá! Gostaria de agendar uma visita para o imóvel em Ipanema. Estou disponível durante a semana pela manhã. Qual seria o melhor horário?',
      date: '2024-01-14T16:45:00',
      isRead: false,
      isStarred: false,
      type: 'agendamento',
      property: 'Casa 4Q - Ipanema'
    },
    {
      id: 4,
      name: 'Carlos Oliveira',
      email: 'carlos.oliveira@email.com',
      phone: '(21) 66666-6666',
      subject: 'Avaliação de imóvel',
      preview: 'Preciso de uma avaliação para meu apartamento na Barra...',
      content: 'Bom dia! Preciso de uma avaliação profissional para meu apartamento na Barra da Tijuca, pois pretendo vendê-lo. Vocês fazem esse tipo de serviço?',
      date: '2024-01-14T14:20:00',
      isRead: true,
      isStarred: true,
      type: 'avaliacao',
      property: null
    }
  ];

  const filteredMessages = messages.filter(message =>
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'interesse': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'financiamento': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'agendamento': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'avaliacao': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'interesse': return 'Interesse';
      case 'financiamento': return 'Financiamento';
      case 'agendamento': return 'Agendamento';
      case 'avaliacao': return 'Avaliação';
      default: return 'Geral';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Ontem';
    } else if (days < 7) {
      return `${days} dias atrás`;
    } else {
      return date.toLocaleDateString('pt-BR');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mensagens</h1>
            <p className="text-gray-600 dark:text-gray-400">Gerencie contatos e solicitações dos clientes</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="px-3 py-1">
              {messages.filter(m => !m.isRead).length} não lidas
            </Badge>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="glass-effect">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar mensagens..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="sm:w-auto">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Messages Layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="glass-effect">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Mensagens ({filteredMessages.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[600px] overflow-y-auto">
                  {filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      onClick={() => setSelectedMessage(message.id)}
                      className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                        selectedMessage === message.id ? 'bg-wine/5 dark:bg-wine/10 border-l-4 border-l-wine' : ''
                      } ${!message.isRead ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {message.isRead ? (
                            <MailOpen className="w-4 h-4 text-gray-400" />
                          ) : (
                            <Mail className="w-4 h-4 text-blue-500" />
                          )}
                          {message.isStarred && (
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          )}
                        </div>
                        <span className="text-xs text-gray-500">{formatDate(message.date)}</span>
                      </div>
                      
                      <div className="mb-2">
                        <h4 className={`font-medium text-sm ${!message.isRead ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                          {message.name}
                        </h4>
                        <p className="text-xs text-gray-500">{message.email}</p>
                      </div>
                      
                      <div className="mb-2">
                        <h5 className={`text-sm ${!message.isRead ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                          {message.subject}
                        </h5>
                        <p className="text-xs text-gray-500 line-clamp-2">{message.preview}</p>
                      </div>
                      
                      <Badge className={`text-xs ${getTypeColor(message.type)}`}>
                        {getTypeLabel(message.type)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <Card className="glass-effect">
                <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-wine rounded-full flex items-center justify-center text-white font-semibold">
                          {messages.find(m => m.id === selectedMessage)?.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {messages.find(m => m.id === selectedMessage)?.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {messages.find(m => m.id === selectedMessage)?.email}
                          </p>
                        </div>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {messages.find(m => m.id === selectedMessage)?.subject}
                      </h2>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(messages.find(m => m.id === selectedMessage)?.date || '')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {messages.find(m => m.id === selectedMessage)?.phone}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Star className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Archive className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="mb-6">
                    {messages.find(m => m.id === selectedMessage)?.property && (
                      <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                          Imóvel de interesse: {messages.find(m => m.id === selectedMessage)?.property}
                        </p>
                      </div>
                    )}
                    
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {messages.find(m => m.id === selectedMessage)?.content}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="flex-1">
                      <Reply className="w-4 h-4 mr-2" />
                      Responder
                    </Button>
                    <Button variant="outline">
                      <Phone className="w-4 h-4 mr-2" />
                      Ligar
                    </Button>
                    <Button variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      Agendar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="glass-effect">
                <CardContent className="p-12 text-center">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Selecione uma mensagem
                  </h3>
                  <p className="text-gray-500">
                    Escolha uma mensagem da lista para visualizar o conteúdo completo
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminMessages;
