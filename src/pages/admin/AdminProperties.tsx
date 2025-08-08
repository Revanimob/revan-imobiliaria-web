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
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

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
const [page, setPage] = useState(1);
const pageSize = 10;
const totalPages = Math.max(1, Math.ceil(properties.length / pageSize));
const startIndex = (page - 1) * pageSize;
const currentItems = properties.slice(startIndex, startIndex + pageSize);

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

  // Ajusta página quando a quantidade muda
  useEffect(() => {
    const tp = Math.max(1, Math.ceil(properties.length / pageSize));
    if (page > tp) setPage(tp);
  }, [properties.length, pageSize, page]);

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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <Card>
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl font-bold">
                    {properties.length}
                  </p>
                </div>
                <Home className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-wine" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">
                    Disponíveis
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl font-bold text-green-600">
                    {properties.filter((p) => p.status === "disponivel").length}
                  </p>
                </div>
                <Home className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">
                    Vendidos
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl font-bold text-red-600">
                    {properties.filter((p) => p.status === "vendido").length}
                  </p>
                </div>
                <Home className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">
                    Alugados
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl font-bold text-blue-600">
                    {properties.filter((p) => p.status === "alugado").length}
                  </p>
                </div>
                <Home className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Properties Table/Cards */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Lista de Imóveis ({properties.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-2 md:p-6">
            {/* Desktop/Tablet Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 text-sm font-medium">Imóvel</th>
                    <th className="text-left p-3 text-sm font-medium">Tipo</th>
                    <th className="text-left p-3 text-sm font-medium">Preço</th>
                    <th className="text-left p-3 text-sm font-medium">Status</th>
                    <th className="text-left p-3 text-sm font-medium hidden lg:table-cell">Localização</th>
                    <th className="text-left p-3 text-sm font-medium">Área</th>
                    <th className="text-left p-3 text-sm font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((property) => (
                    <tr key={property.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="p-3">
                        <div>
                          <p className="font-medium text-sm truncate max-w-[200px]">{property.title}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {property.bedrooms} qtos • {property.bathrooms} bans
                          </p>
                        </div>
                      </td>
                      <td className="p-3 text-sm">{getTypeLabel(property.type)}</td>
                      <td className="p-3 font-medium text-sm">R$ {property.priceValue.toLocaleString("pt-BR")}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(property.status)}`}>
                          {getStatusLabel(property.status)}
                        </span>
                      </td>
                      <td className="p-3 text-gray-600 dark:text-gray-400 text-sm hidden lg:table-cell max-w-[150px] truncate">
                        {property.location}
                      </td>
                      <td className="p-3 text-sm">{property.areaValue}m²</td>
                      <td className="p-3">
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(property)} className="h-8 w-8">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(property.id)} className="h-8 w-8">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
              {currentItems.map((property) => (
                <Card key={property.id} className="border border-gray-200 dark:border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{property.title}</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {getTypeLabel(property.type)} • {property.bedrooms} qtos • {property.bathrooms} bans
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ml-2 ${getStatusBadgeColor(property.status)}`}>
                        {getStatusLabel(property.status)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Preço:</span>
                        <p className="font-medium">R$ {property.priceValue.toLocaleString("pt-BR")}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Área:</span>
                        <p className="font-medium">{property.areaValue}m²</p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <span className="text-gray-600 dark:text-gray-400 text-xs">Localização:</span>
                      <p className="text-sm truncate">{property.location}</p>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(property)} className="h-8">
                        <Edit2 className="w-3 h-3 mr-1" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => openDeleteDialog(property.id)} className="h-8 text-red-600 border-red-200 hover:bg-red-50">
                        <Trash2 className="w-3 h-3 mr-1" />
                        Excluir
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      className={page === 1 ? "pointer-events-none opacity-50" : ""}
                      onClick={(e) => {
                        e.preventDefault();
                        if (page > 1) setPage(page - 1);
                      }}
                    />
                  </PaginationItem>

                  {(() => {
                    const items: React.ReactNode[] = [];
                    const total = totalPages;
                    const current = page;
                    const pushPage = (p: number) =>
                      items.push(
                        <PaginationItem key={p}>
                          <PaginationLink
                            href="#"
                            isActive={current === p}
                            onClick={(e) => {
                              e.preventDefault();
                              setPage(p);
                            }}
                          >
                            {p}
                          </PaginationLink>
                        </PaginationItem>
                      );

                    if (total <= 7) {
                      for (let i = 1; i <= total; i++) pushPage(i);
                    } else {
                      pushPage(1);
                      if (current > 3)
                        items.push(
                          <PaginationItem key="e1">
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      const start = Math.max(2, current - 1);
                      const end = Math.min(total - 1, current + 1);
                      for (let i = start; i <= end; i++) pushPage(i);
                      if (current < total - 2)
                        items.push(
                          <PaginationItem key="e2">
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      pushPage(total);
                    }
                    return items;
                  })()}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                      onClick={(e) => {
                        e.preventDefault();
                        if (page < totalPages) setPage(page + 1);
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>

          </CardContent>
        </Card>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-[95vw] md:max-w-2xl max-h-[95vh] overflow-y-auto">
            <DialogHeader className="pb-4">
              <DialogTitle className="text-lg md:text-xl">
                {editingProperty ? "Editar Imóvel" : "Novo Imóvel"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
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
