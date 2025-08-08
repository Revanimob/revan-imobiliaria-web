import React from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Home, TrendingUp, BarChart3, UserPlus } from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Adicionar Novo Imóvel",
      description: "Cadastrar novo imóvel no sistema",
      color: "bg-gradient-to-r from-rose-600 to-rose-500 hover:brightness-110",
      icon: Home,
      onClick: () => navigate("/admin/add-property"),
    },
    {
      title: "Criar Novo Usuário",
      description: "Adicionar usuário",
      color: "bg-gradient-to-r from-blue-600 to-blue-500 hover:brightness-110",
      icon: Users,
      onClick: () => navigate("/admin/add-admin"),
    },
    {
      title: "Ver Relatórios",
      description: "Acessar estatísticas detalhadas",
      color:
        "bg-gradient-to-r from-green-600 to-green-500 hover:brightness-110",
      icon: TrendingUp,
      onClick: () => navigate("/admin/reports-view"),
      // onClick: () =>
      //   toast("Em breve essa funcionalidade estará disponivel ..."),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 lg:space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              📊 Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Visão geral do sistema administrativo
            </p>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 italic">
            Última atualização: {new Date().toLocaleString("pt-BR")}
          </div>
        </div>

        {/* Ações rápidas para mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:hidden">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              onClick={action.onClick}
              className={`${action.color} p-4 h-auto flex flex-col items-center gap-2 rounded-xl shadow-md transition-all hover:scale-[1.03] text-white`}
            >
              <action.icon className="w-5 h-5" />
              <span className="text-xs font-medium text-white text-center">
                {action.title.replace("Adicionar ", "").replace("Criar ", "")}
              </span>
            </Button>
          ))}
        </div>

        {/* Conteúdo centralizado no desktop */}
        <div className="flex justify-center">
          <div className="w-full max-w-5xl space-y-6">
            {/* Título visível apenas no desktop */}
            <h2 className="hidden lg:block text-xl font-semibold text-gray-800 dark:text-white mb-2 text-center">
              ⚡ Ações Rápidas
            </h2>

            {/* Ações rápidas - desktop */}
            <div className="hidden lg:block">
              <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/80 border border-gray-200/60 dark:border-gray-700/50 rounded-2xl shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold lg:hidden">
                    ⚡ Ações Rápidas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={action.onClick}
                      className={`w-full p-4 flex items-center gap-4 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg group ${action.color} text-white`}
                    >
                      <action.icon className="w-5 h-5 shrink-0 opacity-90 group-hover:opacity-100 transition-opacity" />
                      <div className="text-left">
                        <div className="font-semibold">{action.title}</div>
                        <div className="text-sm opacity-90">
                          {action.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Bloco de boas-vindas */}
            <Card className="rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Bem-vindo ao Painel Administrativo 👋
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Selecione uma ação rápida no painel lateral ou use os atalhos
                acima.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
