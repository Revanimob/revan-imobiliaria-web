import React from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import StatCard from "@/components/admin/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Home,
  TrendingUp,
  Eye,
  MessageSquare,
  Clock,
  Plus,
  BarChart3,
  UserPlus,
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // const stats = [
  //   {
  //     title: 'Total de Imóveis',
  //     value: 45,
  //     description: 'Cadastrados no sistema',
  //     icon: Home,
  //     color: 'wine' as const,
  //     trend: { value: 12, isPositive: true }
  //   },
  //   {
  //     title: 'Imóveis Disponíveis',
  //     value: 32,
  //     description: 'Prontos para venda',
  //     icon: Home,
  //     color: 'green' as const,
  //     trend: { value: 8, isPositive: true }
  //   },
  //   {
  //     title: 'Vendidos Este Mês',
  //     value: 8,
  //     description: 'vs mês anterior',
  //     icon: TrendingUp,
  //     color: 'blue' as const,
  //     trend: { value: 15, isPositive: true }
  //   },
  //   {
  //     title: 'Admins Ativos',
  //     value: 3,
  //     description: 'Usuários cadastrados',
  //     icon: Users,
  //     color: 'purple' as const
  //   },
  //   {
  //     title: 'Visualizações',
  //     value: '1.2K',
  //     description: 'Este mês',
  //     icon: Eye,
  //     color: 'orange' as const,
  //     trend: { value: 23, isPositive: true }
  //   },
  //   {
  //     title: 'Mensagens',
  //     value: 12,
  //     description: 'Não lidas',
  //     icon: MessageSquare,
  //     color: 'blue' as const
  //   }
  // ];

  // const recentActivities = [
  //   { action: 'Novo imóvel cadastrado', time: '2 horas atrás', user: 'Admin 1', type: 'create' },
  //   { action: 'Imóvel vendido', time: '4 horas atrás', user: 'Admin 2', type: 'sale' },
  //   { action: 'Admin criado', time: '1 dia atrás', user: 'Super Admin', type: 'user' },
  //   { action: 'Configuração alterada', time: '2 dias atrás', user: 'Admin 1', type: 'settings' },
  // ];

  const quickActions = [
    {
      title: "Adicionar Novo Imóvel",
      description: "Cadastrar novo imóvel no sistema",
      color: "bg-wine hover:bg-wine-dark",
      icon: Home,
      onClick: () => navigate("/admin/add-property"),
    },
    {
      title: "Criar Novo Usuário",
      description: "Adicionar usuário",
      color: "bg-blue-600 hover:bg-blue-700",
      icon: Users,
      onClick: () => navigate("/admin/add-admin"),
    },
    {
      title: "Ver Relatórios",
      description: "Acessar estatísticas detalhadas",
      color: "bg-green-600 hover:bg-green-700",
      icon: TrendingUp,
      onClick: () => navigate("/admin/reports-view"),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 lg:space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Visão geral do sistema administrativo
            </p>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Última atualização: {new Date().toLocaleString("pt-BR")}
          </div>
        </div>

        {/* Quick Action Buttons - Mobile Priority */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:hidden">
          <Button
            onClick={() => navigate("/admin/add-property")}
            className="bg-wine hover:bg-wine-dark p-4 h-auto flex flex-col items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span className="text-sm">Add Imóvel</span>
          </Button>
          <Button
            onClick={() => navigate("/admin/add-admin")}
            className="bg-blue-600 hover:bg-blue-700 p-4 h-auto flex flex-col items-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            <span className="text-sm">Novo ADM</span>
          </Button>
          <Button
            onClick={() => navigate("/admin/reports-view")}
            className="bg-green-600 hover:bg-green-700 p-4 h-auto flex flex-col items-center gap-2"
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-sm">Relatórios</span>
          </Button>
        </div>

        {/* Stats Grid */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div> */}

        {/* Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Recent Activities */}
          {/* <div className="xl:col-span-2">
            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Atividades Recentes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.type === 'create' ? 'bg-green-500' :
                      activity.type === 'sale' ? 'bg-blue-500' :
                      activity.type === 'user' ? 'bg-purple-500' : 'bg-orange-500'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white truncate">{activity.action}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">por {activity.user} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div> */}

          {/* Quick Actions - Desktop */}
          <div className="hidden lg:block">
            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className={`w-full p-4 text-left text-white rounded-lg ${action.color} transition-all duration-200 hover:scale-105 hover:shadow-lg group`}
                  >
                    <div className="flex items-center gap-3">
                      <action.icon className="w-5 h-5 shrink-0" />
                      <div className="min-w-0">
                        <div className="font-medium truncate">
                          {action.title}
                        </div>
                        <div className="text-sm opacity-90 truncate">
                          {action.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
