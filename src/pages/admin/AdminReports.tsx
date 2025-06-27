
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, Home } from 'lucide-react';

const AdminReports = () => {
  // Mock data for demonstration
  const monthlyData = [
    { month: 'Jan', vendas: 12, visualizacoes: 450 },
    { month: 'Fev', vendas: 18, visualizacoes: 520 },
    { month: 'Mar', vendas: 15, visualizacoes: 380 },
    { month: 'Abr', vendas: 22, visualizacoes: 680 },
    { month: 'Mai', vendas: 28, visualizacoes: 750 },
    { month: 'Jun', vendas: 25, visualizacoes: 640 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
          <p className="text-gray-600">Estatísticas e métricas do sistema</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vendas do Mês</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">25</div>
              <p className="text-xs text-muted-foreground">+15% vs mês anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">640</div>
              <p className="text-xs text-muted-foreground">-5% vs mês anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">3.9%</div>
              <p className="text-xs text-muted-foreground">+0.8% vs mês anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
              <Home className="h-4 w-4 text-wine" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-wine">R$ 485k</div>
              <p className="text-xs text-muted-foreground">+12% vs mês anterior</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Vendas Mensais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.month}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-wine h-2 rounded-full" 
                          style={{width: `${(item.vendas / 30) * 100}%`}}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{item.vendas}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Bairros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { bairro: 'Centro', vendas: 8, percentual: 32 },
                  { bairro: 'Jardim Europa', vendas: 6, percentual: 24 },
                  { bairro: 'Vila Madalena', vendas: 5, percentual: 20 },
                  { bairro: 'Moema', vendas: 4, percentual: 16 },
                  { bairro: 'Outros', vendas: 2, percentual: 8 },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.bairro}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{width: `${item.percentual}%`}}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{item.vendas}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                'Imóvel "Casa em Moema" foi visualizado 15 vezes hoje',
                'Nova consulta recebida para apartamento no Centro',
                'Imóvel "Apartamento Jardim Europa" foi marcado como vendido',
                'Admin João adicionou novo imóvel no sistema',
                'Backup automático dos dados realizado com sucesso'
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-wine rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm">{activity}</p>
                    <p className="text-xs text-gray-500">Há {index + 1} horas</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminReports;
