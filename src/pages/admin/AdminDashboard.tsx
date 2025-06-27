
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Home, TrendingUp, Eye } from 'lucide-react';

const AdminDashboard = () => {
  // Mock data - later this would come from your data source
  const stats = {
    totalProperties: 45,
    availableProperties: 32,
    soldThisMonth: 8,
    activeAdmins: 3,
    totalViews: 1247,
    recentActivities: [
      { action: 'Novo imóvel cadastrado', time: '2 horas atrás', user: 'Admin 1' },
      { action: 'Imóvel vendido', time: '4 horas atrás', user: 'Admin 2' },
      { action: 'Admin criado', time: '1 dia atrás', user: 'Super Admin' },
    ]
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Visão geral do sistema administrativo</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Imóveis</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProperties}</div>
              <p className="text-xs text-muted-foreground">Cadastrados no sistema</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Imóveis Disponíveis</CardTitle>
              <Home className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.availableProperties}</div>
              <p className="text-xs text-muted-foreground">Prontos para venda</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vendidos Este Mês</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.soldThisMonth}</div>
              <p className="text-xs text-muted-foreground">+12% vs mês anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Admins Ativos</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.activeAdmins}</div>
              <p className="text-xs text-muted-foreground">Usuários cadastrados</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Atividades Recentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-wine rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-500">por {activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full p-3 text-left bg-wine text-white rounded-lg hover:bg-wine-dark transition-colors">
                <div className="font-medium">Adicionar Novo Imóvel</div>
                <div className="text-sm opacity-90">Cadastrar novo imóvel no sistema</div>
              </button>
              
              <button className="w-full p-3 text-left bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <div className="font-medium">Criar Novo Admin</div>
                <div className="text-sm opacity-90">Adicionar usuário administrador</div>
              </button>
              
              <button className="w-full p-3 text-left bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <div className="font-medium">Ver Relatórios</div>
                <div className="text-sm opacity-90">Acessar estatísticas detalhadas</div>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
