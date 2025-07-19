import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit2, Trash2, User, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  deleteAdminUserByIdService,
  getAllAdminUsersService,
  updateAdminUserByIdService,
} from "@/services/userService";

interface AdminUser {
  phone: string;
  id: string;
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "USER" | "ADMIN";
  createdAt: string;
  status: "active" | "inactive";
}

const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "admin" as AdminUser["role"],
    status: "active" as "active" | "inactive",
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersFromServer = await getAllAdminUsersService();
        console.log(usersFromServer);
        setUsers(usersFromServer);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        toast({ title: "Erro ao carregar usuários", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const saveUsers = (newUsers: AdminUser[]) => {
    setUsers(newUsers);
    localStorage.setItem("admin_users", JSON.stringify(newUsers));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingUser) {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        status: formData.status,
      };

      await updateAdminUserByIdService(editingUser.id, payload);
      toast({ title: "Usuário atualizado com sucesso!" });
    } else {
      // Create new user
      const newUser: AdminUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        phone: formData.phone,
        createdAt: new Date().toISOString(),
        status: "active",
      };
      saveUsers([...users, newUser]);
      toast({ title: "Usuário criado com sucesso!" });
    }

    resetForm();
  };

  const handleEdit = (user: AdminUser) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone ?? "",
      password: "", // nunca editar senha diretamente
      role: user.role.toLowerCase() as AdminUser["role"],
      status: user.status,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (userId: string) => {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        await deleteAdminUserByIdService(userId);
        toast({ title: "Usuário excluído com sucesso!" });

        const updated = await getAllAdminUsersService();
        setUsers(updated);
      } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        toast({
          title: "Erro ao excluir usuário",
          variant: "destructive",
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "ADMIN",
      status: "active",
    });
    setEditingUser(null);
    setIsModalOpen(false);
  };

  const getRoleLabel = (role: AdminUser["role"]) => {
    const labels = {
      SUPER_ADMIN: "Super Admin",
      ADMIN: "Administrador",
      USER: "Moderador",
    };
    return labels[role];
  };

  const getRoleBadgeColor = (role: AdminUser["role"]) => {
    const colors = {
      super_admin: "bg-red-100 text-red-800",
      admin: "bg-blue-100 text-blue-800",
      moderator: "bg-green-100 text-green-800",
    };
    return colors[role];
  };
  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 text-gray-600 dark:text-gray-300 animate-spin" />
        </div>
      </AdminLayout>
    );
  }
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Usuários
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gerencie os usuários com acesso administrativo
            </p>
          </div>
          <Button
            onClick={() => navigate("/admin/add-admin")}
            className="bg-wine hover:bg-wine-dark shrink-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Usuário
          </Button>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Usuários ({users.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 md:p-4 text-sm md:text-base">
                      Usuário
                    </th>
                    <th className="text-left p-2 md:p-4 text-sm md:text-base hidden sm:table-cell">
                      E-mail
                    </th>
                    <th className="text-left p-2 md:p-4 text-sm md:text-base">
                      Função
                    </th>
                    <th className="text-left p-2 md:p-4 text-sm md:text-base hidden md:table-cell">
                      Status
                    </th>
                    <th className="text-left p-2 md:p-4 text-sm md:text-base hidden lg:table-cell">
                      Criado em
                    </th>
                    <th className="text-left p-2 md:p-4 text-sm md:text-base">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="p-2 md:p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 md:w-8 md:h-8 bg-wine rounded-full flex items-center justify-center">
                            <User className="w-3 h-3 md:w-4 md:h-4 text-white" />
                          </div>
                          <span className="font-medium text-sm md:text-base">
                            {user.name}
                          </span>
                        </div>
                      </td>
                      <td className="p-2 md:p-4 text-gray-600 dark:text-gray-400 hidden sm:table-cell text-sm md:text-base">
                        {user.email}
                      </td>
                      <td className="p-2 md:p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                            user.role
                          )}`}
                        >
                          {getRoleLabel(user.role)}
                        </span>
                      </td>
                      <td className="p-2 md:p-4 hidden md:table-cell">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Ativo
                        </span>
                      </td>
                      <td className="p-2 md:p-4 text-gray-600 dark:text-gray-400 hidden lg:table-cell text-sm">
                        {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="p-2 md:p-4">
                        <div className="flex space-x-1 md:space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(user)}
                            className="h-8 w-8"
                          >
                            <Edit2 className="w-3 h-3 md:w-4 md:h-4" />
                          </Button>
                          {user.role !== "SUPER_ADMIN" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(user.id)}
                              className="h-8 w-8"
                            >
                              <Trash2 className="w-3 h-3 md:w-4 md:h-4 text-red-600" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Add/Edit User Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingUser ? "Editar Usuário" : "Novo Usuário"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Nome do usuário"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="email@exemplo.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="(DDD) 91234-5678"
                  required
                />
              </div>

              {!editingUser && (
                <div>
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="Senha do usuário"
                    required
                  />
                </div>
              )}

              <div>
                <Label htmlFor="role">Nível de Acesso</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value: AdminUser["role"]) =>
                    setFormData({ ...formData, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="moderator">Moderador</SelectItem>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "active" | "inactive") =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-wine hover:bg-wine-dark"
                >
                  {editingUser ? "Atualizar" : "Criar"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
