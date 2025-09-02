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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  Home,
  HandCoins,
  CalendarIcon,
  Upload,
  X,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import saleFormSchema, { SaleFormData } from "@/components/schema/saleSchema";
import { addSaleService } from "@/services/saleService";
import { SaleForm } from "@/types/sale";
import { convertToBase64, getImageSrc } from "@/util/util";
import { uploadToImgBB } from "@/services/imgBBService";

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
    mainImage: "",
    secondImage: "",
    thirdImage: "",
    fourthImage: "",
    badge: "",
    isNew: true,
    operation: "comprar",
    status: "disponivel",
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<number | null>(null);
  const [saleModalOpen, setSaleModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(properties.length / pageSize));
  const startIndex = (page - 1) * pageSize;
  const currentItems = properties.slice(startIndex, startIndex + pageSize);

  const { toast } = useToast();

  const saleForm = useForm<SaleFormData>({
    resolver: zodResolver(saleFormSchema),
    defaultValues: {
      clientName: "",
      realtorName: "",
      paymentMethod: "",
    },
  });

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
    setFormData({
      ...property,
      mainImage: property.mainImage || "",
      secondImage: property.secondImage || "",
      thirdImage: property.thirdImage || "",
      fourthImage: property.fourthImage || "",
    });
    setIsModalOpen(true);
  };

  // Função para lidar com upload da imagem principal

  const handleMainImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];

    const url = await uploadToImgBB(file);
    if (url) {
      // aqui você salva no formData ou manda para o backend
      setFormData((prev) => ({ ...prev, mainImage: url }));
    }
  };

  // Função para lidar com upload das imagens secundárias
  const handleSecondaryImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "second" | "third" | "fourth"
  ) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];

    const url = await uploadToImgBB(file);
    if (url) {
      setFormData((prev) => ({ ...prev, [`${type}Image`]: url }));
    }
  };

  // Função para remover imagem
  const removeImage = (type: "main" | "second" | "third" | "fourth") => {
    if (type === "main") {
      setFormData({ ...formData, mainImage: "" });
    } else if (type === "second") {
      setFormData({ ...formData, secondImage: "" });
    } else if (type === "third") {
      setFormData({ ...formData, thirdImage: "" });
    } else if (type === "fourth") {
      setFormData({ ...formData, fourthImage: "" });
    }
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

  const openSaleModal = (property: Property) => {
    setSelectedProperty(property);
    setSaleModalOpen(true);
    saleForm.reset();
  };

  const handleSaleSubmit = async (data: SaleFormData) => {
    try {
      await addSaleService(data as SaleForm, selectedProperty);

      toast({
        title: "Venda registrada com sucesso!",
        description: `Venda do imóvel "${selectedProperty?.title}" foi registrada.`,
      });

      setSaleModalOpen(false);
      setSelectedProperty(null);
      saleForm.reset();
      navigate("/admin/properties");
    } catch (error) {
      console.error("Erro ao registrar venda:", error);
      toast({
        title: "Erro ao registrar venda",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
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
      mainImage: "",
      secondImage: "",
      thirdImage: "",
      fourthImage: "",
      badge: "",
      isNew: false,
      qtdstock: 1,
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
            <CardTitle className="text-lg md:text-xl">
              Lista de Imóveis ({properties.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 md:p-6">
            {/* Desktop/Tablet Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 text-sm font-medium">
                      Imóvel
                    </th>
                    <th className="text-left p-3 text-sm font-medium">Tipo</th>
                    <th className="text-left p-3 text-sm font-medium">Preço</th>
                    <th className="text-left p-3 text-sm font-medium">
                      Status
                    </th>
                    <th className="text-left p-3 text-sm font-medium hidden lg:table-cell">
                      Localização
                    </th>
                    <th className="text-left p-3 text-sm font-medium hidden lg:table-cell">Área</th>
                    <th className="text-left p-3 text-sm font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((property) => (
                    <tr
                      key={property.id}
                      className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="p-3">
                        <div>
                          <p className="font-medium text-sm truncate max-w-[200px]">
                            {property.title}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {property.bedrooms} qtos • {property.bathrooms} bans
                          </p>
                        </div>
                      </td>
                      <td className="p-3 text-sm">
                        {getTypeLabel(property.type)}
                      </td>
                      <td className="p-3 font-medium text-sm">
                        {property.price}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                            property.status
                          )}`}
                        >
                          {getStatusLabel(property.status)}
                        </span>
                      </td>
                      <td className="p-3 text-gray-600 dark:text-gray-400 text-sm hidden lg:table-cell max-w-[150px] truncate">
                        {property.location}
                      </td>
                      <td className="p-3 text-sm hidden lg:table-cell">{property.areaValue}m²</td>
                      <td className="p-3">
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(property)}
                            className="h-8 w-8"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            // onClick={() =>
                            //   toast({
                            //     title:
                            //       "Em breve essa funcionalidade estará pronta",
                            //   })
                            // }
                            onClick={() => openSaleModal(property)}
                            className="h-8 w-8"
                            disabled={property.status === "vendido"}
                          >
                            <HandCoins className="w-4 h-4 text-green-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDeleteDialog(property.id)}
                            className="h-8 w-8"
                          >
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
                <Card
                  key={property.id}
                  className="border border-gray-200 dark:border-gray-700"
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">
                          {property.title}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {getTypeLabel(property.type)} • {property.bedrooms}{" "}
                          qtos • {property.bathrooms} bans
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ml-2 ${getStatusBadgeColor(
                          property.status
                        )}`}
                      >
                        {getStatusLabel(property.status)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">
                          Preço:
                        </span>
                        <p className="font-medium">{property.price}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">
                          Área:
                        </span>
                        <p className="font-medium">{property.areaValue}m²</p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <span className="text-gray-600 dark:text-gray-400 text-xs">
                        Localização:
                      </span>
                      <p className="text-sm truncate">{property.location}</p>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(property)}
                        className="h-8"
                      >
                        <Edit2 className="w-3 h-3 mr-1" />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openSaleModal(property)}
                        className="h-8 text-green-600 border-green-200 hover:bg-green-50"
                        disabled={property.status === "vendido"}
                      >
                        <HandCoins className="w-3 h-3 mr-1" />
                        Venda
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openDeleteDialog(property.id)}
                        className="h-8 text-red-600 border-red-200 hover:bg-red-50"
                      >
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
                      className={
                        page === 1 ? "pointer-events-none opacity-50" : ""
                      }
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
                      className={
                        page === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
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

        {/* Sale Registration Modal */}
        <Dialog open={saleModalOpen} onOpenChange={setSaleModalOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <HandCoins className="w-5 h-5 text-green-600" />
                Registrar Venda
              </DialogTitle>
            </DialogHeader>

            {selectedProperty && (
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium text-sm">
                  {selectedProperty.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {selectedProperty.location} • R${" "}
                  {selectedProperty.priceValue.toLocaleString("pt-BR")}
                </p>
              </div>
            )}

            <Form {...saleForm}>
              <form
                onSubmit={saleForm.handleSubmit(handleSaleSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={saleForm.control}
                    name="negotiationDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Data da Negociação</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "dd/MM/yyyy")
                                ) : (
                                  <span>Selecione uma data</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date()}
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={saleForm.control}
                    name="deliveryDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Data de Entrega</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "dd/MM/yyyy")
                                ) : (
                                  <span>Selecione uma data</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={saleForm.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Cliente</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o nome completo do cliente"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={saleForm.control}
                  name="realtorName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Corretor/Imobiliária</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o nome do corretor ou imobiliária"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={saleForm.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Forma de Pagamento</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a forma de pagamento" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="a-vista">À Vista</SelectItem>
                          <SelectItem value="financiamento">
                            Financiamento Bancário
                          </SelectItem>
                          <SelectItem value="fgts">FGTS</SelectItem>
                          <SelectItem value="parcelado">Parcelado</SelectItem>
                          <SelectItem value="permuta">Permuta</SelectItem>
                          <SelectItem value="outros">Outros</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSaleModalOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Registrar Venda
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Edit Property Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-2xl lg:max-w-4xl max-h-[95vh] overflow-y-auto p-3 sm:p-4 md:p-6">
            <DialogHeader className="pb-2 md:pb-4">
              <DialogTitle className="text-base sm:text-lg md:text-xl">
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
                    <Label htmlFor="priceValue">Preço da Tela (R$)</Label>
                    <Input
                      id="price"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      placeholder="Ex: R$ 350.000"
                      required
                      className="mt-1 w-full border rounded px-3 py-2"
                    />
                  </div>
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
                  <div>
                    <Label htmlFor="qtdstock">Quantidade em Estoque</Label>
                    <NumericFormat
                      id="qtdstock"
                      value={formData.qtdstock}
                      onValueChange={(values) =>
                        setFormData({
                          ...formData,
                          qtdstock: Number(values.value),
                        })
                      }
                      allowNegative={false}
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

                <div>
                  <Label htmlFor="Selo">Selo</Label>
                  <Input
                    id="badge"
                    value={formData.badge}
                    onChange={(e) =>
                      setFormData({ ...formData, badge: e.target.value })
                    }
                    placeholder="Em construção , finalizado ..."
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isNew"
                    checked={formData.isNew}
                    onChange={(e) =>
                      setFormData({ ...formData, isNew: e.target.checked })
                    }
                    className="w-4 h-4 text-wine border-gray-300 rounded focus:ring-wine focus:ring-2"
                  />
                  <Label htmlFor="isNew" className="text-sm font-medium">
                    Marcar como "Novo"
                  </Label>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="description">Descrição da Casa</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    placeholder="Faça uma breve descrição da casa"
                    className="mt-1"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label>Upload de Imagens</Label>
                  <div className="mt-2 space-y-4">
                    {/* Imagem Principal */}
                    <div>
                      <Label className="text-sm font-medium">
                        Imagem Principal *
                      </Label>
                      <div className="mt-1 flex items-center gap-3">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleMainImageUpload}
                          className="flex-1"
                        />
                        {formData.mainImage && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeImage("main")}
                            className="shrink-0"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      {formData.mainImage && (
                        <div className="mt-2">
                          <img
                            src={formData.mainImage}
                            alt="Preview principal"
                            className="w-20 h-20 object-cover rounded border"
                          />
                        </div>
                      )}
                    </div>

                    {/* Imagens Secundárias */}
                    <div>
                      <Label className="text-sm font-medium">
                        Imagens Secundárias (máx. 3)
                      </Label>
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                          {
                            image: formData.secondImage,
                            type: "second" as const,
                            label: "Segunda",
                          },
                          {
                            image: formData.thirdImage,
                            type: "third" as const,
                            label: "Terceira",
                          },
                          {
                            image: formData.fourthImage,
                            type: "fourth" as const,
                            label: "Quarta",
                          },
                        ].map(({ image, type, label }, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleSecondaryImageUpload(e, type)
                                }
                                className="flex-1"
                              />
                              {image && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeImage(type)}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                            {image && (
                              <img
                                src={image}
                                alt={`Preview ${label}`}
                                className="w-full h-20 object-cover rounded border"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="md:col-span-2">
                  <Label htmlFor="image">URL da Imagem (Opcional)</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="https://exemplo.com/foto.jpg"
                  />
                </div> */}
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
