
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, UserPlus, Shield, Mail, Phone, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'super_admin' | 'admin' | 'moderator';
  createdAt: string;
  status: 'active' | 'inactive';
}

const AddAdmin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'admin' as AdminUser['role']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({ 
        title: "Erro", 
        description: "As senhas não coincidem",
        variant: "destructive"
      });
      return;
    }

    // Get existing users
    const existingUsers = JSON.parse(localStorage.getItem('admin_users') || '[]');
    
    // Create new user
    const newUser: AdminUser = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    
    // Save to localStorage
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('admin_users', JSON.stringify(updatedUsers));
    
    toast({ title: "Administrador cadastrado com sucesso!" });
    navigate('/admin/users');
  };

  const getRoleDescription = (role: AdminUser['role']) => {
    const descriptions = {
      super_admin: 'Acesso total ao sistema, pode gerenciar todos os usuários e configurações',
      admin: 'Pode gerenciar imóveis, relatórios e usuários moderadores',
      moderator: 'Pode gerenciar imóveis e visualizar relatórios básicos'
    };
    return descriptions[role];
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/admin/users')}
            className="shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Cadastrar Novo Administrador</h1>
            <p className="text-gray-600 dark:text-gray-400">Preencha os dados do novo usuário</p>
          </div>
        </div>

        {/* Form */}
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-wine" />
              Informações do Administrador
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-wine" />
                  <Label className="text-base font-semibold">Dados Pessoais</Label>
                </div>
                
                <div>
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="João Silva Santos"
                    required
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="joao@empresa.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="(11) 99999-9999"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-wine" />
                  <Label className="text-base font-semibold">Segurança e Permissões</Label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="password">Senha *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="••••••••"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      placeholder="••••••••"
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="role">Nível de Acesso *</Label>
                  <Select 
                    value={formData.role} 
                    onValueChange={(value: AdminUser['role']) => setFormData({...formData, role: value})}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="moderator">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Moderador
                        </div>
                      </SelectItem>
                      <SelectItem value="admin">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          Administrador
                        </div>
                      </SelectItem>
                      <SelectItem value="super_admin">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          Super Admin
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500 mt-1">
                    {getRoleDescription(formData.role)}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/admin/users')}
                  className="flex-1 sm:flex-none"
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-wine hover:bg-wine-dark"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Cadastrar Administrador
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AddAdmin;
