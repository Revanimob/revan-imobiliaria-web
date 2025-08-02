import React, { useState } from "react";
import { NumericFormat } from "react-number-format";

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
import { ArrowLeft, Home, Loader2, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addPropertyService } from "@/services/propertyService";
import { Property } from "@/contexts/PropertyContext";
import gifCasas from "@/assets/gifCasas.gif";

const AddProperty = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newProperty: Property = {
        ...(formData as Property),
        id: 0,
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
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
        <div className="flex flex-col md:flex-row max-w-7xl gap-3 mx-auto items-start justify-center">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="w-5 h-5 text-wine" />
                Informações do Imóvel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
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
                        <SelectValue placeholder="Selecione" />
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
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="disponivel">
                          ✅ Disponível
                        </SelectItem>
                        <SelectItem value="reservado">⏳ Reservado</SelectItem>
                        <SelectItem value="vendido">❌ Vendido</SelectItem>
                        <SelectItem value="alugado">🔄 Alugado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="operation">Operação *</Label>
                    <Select
                      value={formData.operation}
                      onValueChange={(value: Property["operation"]) =>
                        setFormData({ ...formData, operation: value })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="comprar">Comprar</SelectItem>
                        <SelectItem value="alugar">Alugar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="price">Preço (R$)</Label>
                    <NumericFormat
                      value={formData.price}
                      onValueChange={(values) =>
                        setFormData({ ...formData, price: values.value })
                      }
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="R$ "
                      placeholder="R$ 450.000"
                      required
                      className="mt-1 w-full border rounded px-3 py-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="priceValue">Preço Numérico</Label>
                    <NumericFormat
                      id="priceValue"
                      value={formData.priceValue}
                      onValueChange={(values) =>
                        setFormData({
                          ...formData,
                          priceValue: Number(values.value),
                        })
                      }
                      thousandSeparator={false}
                      allowNegative={false}
                      allowLeadingZeros={false}
                      placeholder="450000"
                      required
                      className="mt-1 w-full border rounded px-3 py-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="area">Área (Ex: 120m²)</Label>
                    <NumericFormat
                      id="area"
                      value={formData.area}
                      onValueChange={(values) =>
                        setFormData({ ...formData, area: values.value })
                      }
                      suffix=" m²"
                      thousandSeparator="."
                      decimalSeparator=","
                      allowNegative={false}
                      placeholder="120"
                      required
                      className="mt-1 w-full border rounded px-3 py-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="areaValue">Área Numérica</Label>
                    <NumericFormat
                      id="areaValue"
                      value={formData.areaValue}
                      onValueChange={(values) =>
                        setFormData({
                          ...formData,
                          areaValue: Number(values.value),
                        })
                      }
                      allowNegative={false}
                      thousandSeparator={false}
                      placeholder="120"
                      required
                      className="mt-1 w-full border rounded px-3 py-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="bedrooms">Quartos</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          bedrooms: parseInt(e.target.value),
                        })
                      }
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
                          bathrooms: parseInt(e.target.value),
                        })
                      }
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="badge">Selo(novo,redução,destaque..)</Label>
                    <Input
                      id="badge"
                      value={formData.badge}
                      onChange={(e) =>
                        setFormData({ ...formData, badge: e.target.value })
                      }
                      placeholder="Novo / Redução / Destaque"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="image">Imagem</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      placeholder="https://exemplo.com/foto.jpg"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Localização</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      placeholder="Zona Sul - Próximo ao metrô"
                      className="mt-1"
                    />
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <input
                      id="isNew"
                      type="checkbox"
                      checked={formData.isNew}
                      onChange={(e) =>
                        setFormData({ ...formData, isNew: e.target.checked })
                      }
                    />
                    <Label htmlFor="isNew">Imóvel novo?</Label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={(formData as any).description || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      } as any)
                    }
                    placeholder="Descrição detalhada do imóvel"
                    rows={4}
                    className="mt-1"
                  />
                </div>

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
                    disabled={isSubmitting}
                    className="flex-1 bg-wine hover:bg-wine-dark"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Home className="w-4 h-4 mr-2" />
                        Salvar Imóvel
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="hidden md:block w-[450px]">
            <img
              src={gifCasas}
              alt="Gif ilustrativo"
              className="w-full h-[500px] rounded-lg object-cover shadow"
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddProperty;
