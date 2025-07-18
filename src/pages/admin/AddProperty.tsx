import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Home, Upload, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Property } from "@/types/property";
import { addPropertyService } from "@/services/propertyService";

const AddProperty = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState<Partial<Property>>({
    title: "",
    description: "",
    price: 0,
    type: "apartamento",
    status: "disponivel",
    address: "",
    neighborhood: "",
    city: "",
    zipCode: "",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    garage: 0,
    images: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newProperty: Property = {
        ...(formData as Property),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await addPropertyService(newProperty);

      toast({ title: "Imóvel cadastrado com sucesso!" });
      navigate("/admin/properties");
    } catch (error: any) {
      console.error("Erro ao cadastrar imóvel:", error);
      toast({
        title: "Erro ao cadastrar imóvel",
        description:
          error?.response?.data?.error ||
          "Verifique os dados e tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/properties")}
            className="shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Cadastrar Novo Imóvel
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Preencha os dados do imóvel
            </p>
          </div>
        </div>

        {/* Form */}
        <Card className="max-w-4xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="w-5 h-5 text-wine" />
              Informações do Imóvel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="title">Título do Imóvel *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Ex: Casa moderna em condomínio fechado"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="type">Tipo de Imóvel *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: Property["type"]) =>
                      setFormData({ ...formData, type: value })
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casa">🏠 Casa</SelectItem>
                      <SelectItem value="apartamento">
                        🏢 Apartamento
                      </SelectItem>
                      <SelectItem value="terreno">🌍 Terreno</SelectItem>
                      <SelectItem value="comercial">🏪 Comercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: Property["status"]) =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="disponivel">✅ Disponível</SelectItem>
                      <SelectItem value="reservado">⏳ Reservado</SelectItem>
                      <SelectItem value="vendido">❌ Vendido</SelectItem>
                      <SelectItem value="alugado">🔄 Alugado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="price">Preço (R$) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: Number(e.target.value),
                      })
                    }
                    placeholder="450000"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="area">Área (m²) *</Label>
                  <Input
                    id="area"
                    type="number"
                    value={formData.area}
                    onChange={(e) =>
                      setFormData({ ...formData, area: Number(e.target.value) })
                    }
                    placeholder="120"
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Property Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="bedrooms">Quartos</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bedrooms: Number(e.target.value),
                      })
                    }
                    placeholder="3"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="bathrooms">Banheiros</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bathrooms: Number(e.target.value),
                      })
                    }
                    placeholder="2"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="garage">Garagem</Label>
                  <Input
                    id="garage"
                    type="number"
                    value={formData.garage}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        garage: Number(e.target.value),
                      })
                    }
                    placeholder="2"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="zipCode">CEP</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) =>
                      setFormData({ ...formData, zipCode: e.target.value })
                    }
                    placeholder="00000-000"
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-wine" />
                  <Label className="text-base font-semibold">Localização</Label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Endereço Completo *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      placeholder="Rua das Flores, 123"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="neighborhood">Bairro *</Label>
                    <Input
                      id="neighborhood"
                      value={formData.neighborhood}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          neighborhood: e.target.value,
                        })
                      }
                      placeholder="Centro"
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="city">Cidade *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    placeholder="São Paulo"
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Descrição Detalhada *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Descreva as principais características do imóvel, diferenciais, acabamentos, etc..."
                  rows={4}
                  required
                  className="mt-1"
                />
              </div>

              {/* Images Upload Placeholder */}

              <div>
                <Label>Foto do Imóvel</Label>
                <Input
                  id="image"
                  value={formData.images}
                  onChange={(e) =>
                    setFormData({ ...formData, images: e.target.value })
                  }
                  placeholder=""
                  className="mt-1"
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/properties")}
                  className="flex-1 sm:flex-none"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-wine hover:bg-wine-dark"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Salvar Imóvel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AddProperty;
