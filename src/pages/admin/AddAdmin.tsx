import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, UserPlus, Shield, Mail, Phone, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addAdminUserService } from "@/services/userService";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: "admin" | "super_admin" | "moderator";
};

const AddAdmin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "admin",
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (data.password !== data.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      });
      return;
    }

    try {
      await addAdminUserService({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: data.role.toUpperCase() as "SUPER_ADMIN" | "USER" | "ADMIN",
        status: "active",
      });

      toast({ title: "Administrador cadastrado com sucesso!" });
      navigate("/admin/users");
    } catch (error: any) {
      toast({
        title: "Erro ao cadastrar",
        description:
          error?.response?.data?.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  const getRoleDescription = (role: FormValues["role"]) => {
    const descriptions = {
      super_admin: "Acesso total ao sistema",
      admin: "Pode gerenciar imóveis, relatórios e usuários moderadores",
      moderator: "Pode gerenciar imóveis e visualizar relatórios básicos",
    };
    return descriptions[role];
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/users")}
            className="shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Cadastrar Novo Administrador
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Preencha os dados do novo usuário
            </p>
          </div>
        </div>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-wine" />
              Informações do Administrador
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-wine" />
                  <Label className="text-base font-semibold">
                    Dados Pessoais
                  </Label>
                </div>

                <div>
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    {...register("name", { required: true })}
                    placeholder="João Silva Santos"
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
                        {...register("email", { required: true })}
                        placeholder="joao@empresa.com"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="phone"
                        {...register("phone")}
                        placeholder="(11) 99999-9999"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-wine" />
                  <Label className="text-base font-semibold">
                    Segurança e Permissões
                  </Label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="password">Senha *</Label>
                    <Input
                      id="password"
                      type="password"
                      {...register("password", { required: true })}
                      placeholder="••••••••"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      {...register("confirmPassword", { required: true })}
                      placeholder="••••••••"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="role">Nível de Acesso *</Label>
                  <Select
                    value={watch("role")}
                    onValueChange={(value) =>
                      setValue("role", value as FormValues["role"])
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="moderator">USER</SelectItem>
                      <SelectItem value="admin">SUPER_ADMIN</SelectItem>
                      <SelectItem value="super_admin">ADMIN</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500 mt-1">
                    {getRoleDescription(watch("role"))}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/users")}
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
