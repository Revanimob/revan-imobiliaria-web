
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Download, BarChart3, TrendingUp, Calendar, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ReportsView = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [selectedType, setSelectedType] = useState('all');

  // Mock data - in real app this would come from API
  const reportData = {
    totalProperties: 45,
    soldProperties: 12,
    rentedProperties: 8,
    availableProperties: 25,
    totalRevenue: 2850000,
    averagePrice: 485000,
    topNeighborhoods: [
      { name: 'Centro', count: 8, percentage: 32 },
      { name: 'Jardim Europa', count: 6, percentage: 24 },
      { name: 'Vila Madalena', count: 5, percentage: 20 },
      { name: 'Moema', count: 4, percentage: 16 },
      { name: 'Outros', count: 2, percentage: 8 }
    ],
    monthlyData: [
      { month: 'Jan', sales: 12, views: 450, revenue: 580000 },
      { month: 'Fev', sales: 18, views: 520, revenue: 890000 },
      { month: 'Mar', sales: 15, views: 380, revenue: 720000 },
      { month: 'Abr', sales: 22, views: 680, revenue: 1100000 },
      { month: 'Mai', sales: 28, views: 750, revenue: 1350000 },
      { month: 'Jun', sales: 25, views: 640, revenue: 1200000 }
    ]
  };

  const handleExportData = (format: 'pdf' | 'excel') => {
    toast({ 
      title: `Exportando relatório em ${format.toUpperCase()}`, 
      description: "O download iniciará em breve..." 
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const StatCard = ({ title, value, subtitle, trend, color = "wine" }: any) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
            <p className={`text-3xl font-bold text-${color}`}>{value}</p>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
          {trend && (
            <div className={`flex items-center text-sm ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className={`w-4 h-4 mr-1 ${trend.positive ? '' : 'rotate-180'}`} />
              {trend.value}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/admin/reports')}
              className="shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Relatórios Detalhados</h1>
              <p className="text-gray-600 dark:text-gray-400">Análise completa de métricas e indicadores</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              variant="outline"
              onClick={() => handleExportData('excel')}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Excel
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleExportData('pdf')}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              PDF
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">Filtros:</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">Últimos 7 dias</SelectItem>
                      <SelectItem value="30">Últimos 30 dias</SelectItem>
                      <SelectItem value="90">Últimos 3 meses</SelectItem>
                      <SelectItem value="365">Último ano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="casa">Casas</SelectItem>
                    <SelectItem value="apartamento">Apartamentos</SelectItem>
                    <SelectItem value="terreno">Terrenos</SelectItem>
                    <SelectItem value="comercial">Comerciais</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total de Imóveis" 
            value={reportData.totalProperties}
            trend={{ positive: true, value: 12 }}
          />
          <StatCard 
            title="Imóveis Vendidos" 
            value={reportData.soldProperties}
            subtitle="Este período"
            trend={{ positive: true, value: 25 }}
            color="green-600"
          />
          <StatCard 
            title="Receita Total" 
            value={formatCurrency(reportData.totalRevenue)}
            trend={{ positive: true, value: 18 }}
            color="blue-600"
          />
          <StatCard 
            title="Ticket Médio" 
            value={formatCurrency(reportData.averagePrice)}
            trend={{ positive: false, value: 5 }}
            color="purple-600"
          />
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Monthly Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-wine" />
                Performance Mensal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.monthlyData.map((item, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="font-medium">{item.month}</div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Vendas</div>
                      <div className="font-semibold text-wine">{item.sales}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Views</div>
                      <div className="font-semibold text-blue-600">{item.views}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Receita</div>
                      <div className="font-semibold text-green-600">
                        {formatCurrency(item.revenue)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Neighborhoods */}
          <Card>
            <CardHeader>
              <CardTitle>Top Bairros por Vendas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.topNeighborhoods.map((neighborhood, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-wine text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="font-medium">{neighborhood.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{neighborhood.count} vendas</div>
                      <div className="text-sm text-gray-500">{neighborhood.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Property Status Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Visão Geral dos Imóveis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{reportData.availableProperties}</div>
                <div className="text-sm text-green-700 dark:text-green-400">Disponíveis</div>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{reportData.rentedProperties}</div>
                <div className="text-sm text-blue-700 dark:text-blue-400">Alugados</div>
              </div>
              <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{reportData.soldProperties}</div>
                <div className="text-sm text-red-700 dark:text-red-400">Vendidos</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {reportData.totalProperties - reportData.availableProperties - reportData.rentedProperties - reportData.soldProperties}
                </div>
                <div className="text-sm text-yellow-700 dark:text-yellow-400">Reservados</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ReportsView;
