import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Plus, Edit2, Trash2, Eye, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  addPropertyService,
  deletePropertyService,
  getAllPropertiesService,
  updatePropertyService,
} from "@/services/propertyService";
import { Loader2 } from "lucide-react";
import { Property } from "@/contexts/PropertyContext";
import { NumericFormat } from "react-number-format";
import ConfirmDialog from "@/components/dialog/cancelDialog";

const AdminProperties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState<Partial<Property>>({
    title: "",
    price: "",
    priceValue: 0,
    location: "",
    bedrooms: 0,
    bathrooms: 0,
    area: "",
    areaValue: 0,
    type: "apartamento",
    image: "",
    badge: "",
    isNew: true,
    operation: "comprar",
    status: "disponivel",
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<number | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await getAllPropertiesService();
        setProperties(response);
        localStorage.setItem("admin_properties", JSON.stringify(response));
      } catch (error) {
        console.error("Erro ao buscar propriedades:", error);
        toast({
          title: "Erro ao carregar imóveis",
          description: "Verifique sua conexão ou tente novamente mais tarde.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const saveProperties = (newProperties: Property[]) => {
    setProperties(newProperties);
    localStorage.setItem("admin_properties", JSON.stringify(newProperties));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProperty) {
        await updatePropertyService(editingProperty.id, formData);
        toast({ title: "Imóvel atualizado com sucesso!" });
      } else {
        await addPropertyService(formData as Property);
        toast({ title: "Imóvel cadastrado com sucesso!" });
      }

      // Recarrega os imóveis após criar/atualizar
      const updated = await getAllPropertiesService();
      saveProperties(updated);
      resetForm();
    } catch (error) {
      console.error("Erro ao salvar imóvel:", error);
      toast({
        title: "Erro ao salvar imóvel",
        description: "Verifique os dados e tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setFormData(property);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!propertyToDelete) return;

    try {
      await deletePropertyService(propertyToDelete);
      const updated = await getAllPropertiesService();
      saveProperties(updated);
      toast({ title: "Imóvel excluído com sucesso!" });
    } catch (error) {
      console.error("Erro ao excluir imóvel:", error);
      toast({
        title: "Erro ao excluir imóvel",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setPropertyToDelete(null);
    }
  };

  const openDeleteDialog = (propertyId: number) => {
    setPropertyToDelete(propertyId);
    setDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      title: "",
      price: "0",
      priceValue: 0,
      location: "",
      bedrooms: 0,
      bathrooms: 0,
      area: "0",
      areaValue: 0,
      type: "apartamento",
      image: "",
      badge: "",
      isNew: false,
      operation: "comprar",
      status: "disponivel",
    });
    setEditingProperty(null);
    setIsModalOpen(false);
  };

  const getStatusBadgeColor = (status: Property["status"]) => {
    const colors = {
      disponivel: "bg-green-100 text-green-800",
      vendido: "bg-red-100 text-red-800",
      alugado: "bg-blue-100 text-blue-800",
      reservado: "bg-yellow-100 text-yellow-800",
    };
    return colors[status];
  };

  const getStatusLabel = (status: Property["status"]) => {
    const labels = {
      disponivel: "Disponível",
      vendido: "Vendido",
      alugado: "Alugado",
      reservado: "Reservado",
    };
    return labels[status];
  };

  const getTypeLabel = (type: Property["type"]) => {
    const labels = {
      casa: "Casa",
      apartamento: "Apartamento",
      terreno: "Terreno",
      comercial: "Comercial",
    };
    return labels[type];
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
          <Loader2 className="w-8 h-8 text-gray-600 dark:text-gray-300 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 px-4 sm:px-6 md:px-8 lg:px-10 py-6 max-w-full overflow-x-hidden">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Gestão de Imóveis
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gerencie todos os imóveis cadastrados no sistema
            </p>
          </div>
          <Button
            onClick={() => navigate("/admin/add-property")}
            className="w-full sm:w-auto bg-wine hover:bg-wine-dark"
          >
            <Plus className="w-4 h-4 mr-2" />
            ADD IMÓVEIS
          </Button>
        </div>

        {/* Properties Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="max-w-full overflow-x-auto">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total
                  </p>
                  <p className="text-xl md:text-2xl font-bold">
                    {properties.length}
                  </p>
                </div>
                <Home className="h-6 w-6 md:h-8 md:w-8 text-wine" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Disponíveis
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-green-600">
                    {properties.filter((p) => p.status === "disponivel").length}
                  </p>
                </div>
                <Home className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Vendidos
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-red-600">
                    {properties.filter((p) => p.status === "vendido").length}
                  </p>
                </div>
                <Home className="h-6 w-6 md:h-8 md:w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Alugados
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-blue-600">
                    {properties.filter((p) => p.status === "alugado").length}
                  </p>
                </div>
                <Home className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Properties Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Imóveis ({properties.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 md:p-4 text-sm md:text-base">
                      Imóvel
                    </th>
                    <th className="text-left p-2 md:p-4 text-sm md:text-base hidden sm:table-cell">
                      Tipo
                    </th>
                    <th className="text-left p-2 md:p-4 text-sm md:text-base">
                      Preço
                    </th>
                    <th className="text-left p-2 md:p-4 text-sm md:text-base hidden md:table-cell">
                      Status
                    </th>
                    <th className="text-left p-2 md:p-4 text-sm md:text-base hidden lg:table-cell">
                      Localização
                    </th>
                    <th className="text-left p-2 md:p-4 text-sm md:text-base hidden sm:table-cell">
                      Área
                    </th>
                    <th className="text-left p-2 md:p-4 text-sm md:text-base">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((property) => (
                    <tr
                      key={property.id}
                      className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="p-2 md:p-4">
                        <div>
                          <p className="font-medium text-sm md:text-base truncate">
                            {property.title}
                          </p>
                          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                            {property.bedrooms} qtos • {property.bathrooms} bans
                          </p>
                        </div>
                      </td>
                      <td className="p-2 md:p-4 hidden sm:table-cell text-sm md:text-base">
                        {getTypeLabel(property.type)}
                      </td>
                      <td className="p-2 md:p-4 font-medium text-sm md:text-base">
                        R$ {property.priceValue.toLocaleString("pt-BR")}
                      </td>
                      <td className="p-2 md:p-4 hidden md:table-cell">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                            property.status
                          )}`}
                        >
                          {getStatusLabel(property.status)}
                        </span>
                      </td>
                      <td className="p-2 md:p-4 text-gray-600 dark:text-gray-400 hidden lg:table-cell text-sm">
                        {property.location}
                      </td>
                      <td className="p-2 md:p-4 hidden sm:table-cell text-sm md:text-base">
                        {property.areaValue}m²
                      </td>
                      <td className="p-2 md:p-4">
                        <div className="flex space-x-1 md:space-x-2">
                          {/* <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Eye className="w-3 h-3 md:w-4 md:h-4" />
                          </Button> */}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(property)}
                            className="h-8 w-8"
                          >
                            <Edit2 className="w-3 h-3 md:w-4 md:h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDeleteDialog(property.id)}
                            className="h-8 w-8"
                          >
                            <Trash2 className="w-3 h-3 md:w-4 md:h-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProperty ? "Editar Imóvel" : "Novo Imóvel"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="title">Título do Imóvel</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Casa de alto padrão"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="operation">Operação</Label>
                  <Select
                    value={formData.operation}
                    onValueChange={(value: Property["operation"]) =>
                      setFormData({ ...formData, operation: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comprar">Comprar</SelectItem>
                      <SelectItem value="alugar">Alugar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="type">Tipo</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: Property["type"]) =>
                      setFormData({ ...formData, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartamento">Apartamento</SelectItem>
                      <SelectItem value="casa">Casa</SelectItem>
                      <SelectItem value="terreno">Terreno</SelectItem>
                      <SelectItem value="comercial">Comercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: Property["status"]) =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="disponivel">Disponível</SelectItem>
                      <SelectItem value="vendido">Vendido</SelectItem>
                      <SelectItem value="alugado">Alugado</SelectItem>
                      <SelectItem value="reservado">Reservado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div>
                    <Label htmlFor="priceValue">Preço (R$)</Label>
                    <NumericFormat
                      id="priceValue"
                      value={formData.priceValue}
                      onValueChange={(values) =>
                        setFormData({
                          ...formData,
                          priceValue: Number(values.value),
                        })
                      }
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="R$ "
                      allowNegative={false}
                      placeholder="Ex: R$ 350.000"
                      required
                      className="mt-1 w-full border rounded px-3 py-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="areaValue">Área (m²)</Label>
                  <NumericFormat
                    id="areaValue"
                    value={formData.areaValue}
                    onValueChange={(values) =>
                      setFormData({
                        ...formData,
                        areaValue: Number(values.value),
                      })
                    }
                    suffix=" m²"
                    thousandSeparator="."
                    decimalSeparator=","
                    allowNegative={false}
                    placeholder="Ex: 120"
                    required
                    className="mt-1 w-full border rounded px-3 py-2"
                  />
                </div>

                <div>
                  <Label htmlFor="bedrooms">Quartos</Label>
                  <NumericFormat
                    id="bedrooms"
                    value={formData.bedrooms}
                    onValueChange={(values) =>
                      setFormData({
                        ...formData,
                        bedrooms: Number(values.value),
                      })
                    }
                    allowNegative={false}
                    decimalScale={0}
                    placeholder="Ex: 3"
                    required
                    className="mt-1 w-full border rounded px-3 py-2"
                  />
                </div>

                <div>
                  <Label htmlFor="bathrooms">Banheiros</Label>
                  <NumericFormat
                    id="bathrooms"
                    value={formData.bathrooms}
                    onValueChange={(values) =>
                      setFormData({
                        ...formData,
                        bathrooms: Number(values.value),
                      })
                    }
                    allowNegative={false}
                    decimalScale={0}
                    placeholder="Ex: 2"
                    required
                    className="mt-1 w-full border rounded px-3 py-2"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="location">Localização</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="Rua Exemplo, Bairro, Cidade"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="image">Link da Imagem da Casa</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="Link da imagem da casa"
                    required
                  />
                </div>
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
                  disabled={isSubmitting}
                  className="flex-1 bg-wine hover:bg-wine-dark text-white flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Salvando...
                    </>
                  ) : editingProperty ? (
                    <>
                      <Home className="w-4 h-4" />
                      Atualizar
                    </>
                  ) : (
                    "Cadastrar"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <ConfirmDialog
          isOpen={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={confirmDelete}
          title="Excluir imóvel"
          description="Essa ação é irreversível. Deseja realmente excluir este imóvel?"
          confirmText="Excluir"
          cancelText="Cancelar"
        />
      </div>
    </AdminLayout>
  );
};

export default AdminProperties;
