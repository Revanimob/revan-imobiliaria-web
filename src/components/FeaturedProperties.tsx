import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Calendar,
  Home as HomeIcon,
  Image as ImageIcon,
  Phone,
  Eye,
  Loader2,
} from "lucide-react";
import { useProperty } from "@/contexts/PropertyContext";
import PropertyDetailsModal from "./PropertyDetailsModal";
import { useNavigate } from "react-router-dom";
import { sendWpp } from "@/services/wppService";

const FeaturedProperties = () => {
  const { filteredProperties } = useProperty();
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { resetFilters } = useProperty();
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const isLoadingProperties =
    filteredProperties.length === 0 && isIframeLoading;

  const navigate = useNavigate();

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "Destaque":
        return "default";
      case "Promoção":
        return "destructive";
      case "Exclusivo":
        return "secondary";
      case "Novo":
        return "outline";
      default:
        return "default";
    }
  };

  const handleViewDetails = (property: any) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleContact = (property: String) => {
    const message = `Olá, gostaria de um auxílio de especialista da Revan,estou entrando em contato para saber informações 
    sobre o imóvel ${property}.`;

    sendWpp({ mensagem: message });
  };

  const handleImageGallery = (propertyId: number) => {
    const property = filteredProperties.find((p) => p.id === propertyId);
    if (property) {
      handleViewDetails(property);
    }
  };
  const getIframeUrl = (image?: string | null): string => {
    if (!image) return "";
    const match = image.match(/\/d\/([a-zA-Z0-9_-]+)/);
    const id = match?.[1];
    return id ? `https://drive.google.com/file/d/${id}/preview` : "";
  };

  return (
    <>
      <section id="imoveis" className="py-16 bg-beige-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-wine mb-4">
              Imóveis em Destaque
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubra as melhores oportunidades do mercado imobiliário
              selecionadas especialmente para você
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {filteredProperties.length} imóveis encontrados
            </p>
          </div>

          {isLoadingProperties ? (
            <div className="text-center py-12">
              <Loader2 className="w-10 h-10 mx-auto animate-spin text-wine mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Buscando imóveis no banco de dados...
              </h3>
              <p className="text-gray-500">
                Aguarde enquanto carregamos as melhores opções para você.
              </p>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <HomeIcon className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Nenhum imóvel encontrado
              </h3>
              <p className="text-gray-500">
                Tente ajustar os filtros de busca para encontrar mais opções.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredProperties.map((property) => (
                <Card
                  key={property.id}
                  className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="relative">
                    {isIframeLoading && (
                      <div className="absolute inset-0 z-10 bg-white/90 flex flex-col items-center justify-center text-center p-6 rounded-lg">
                        <Loader2 className="w-6 h-6 animate-spin text-wine mb-2" />
                        <p className="text-sm text-wine font-medium">
                          Estamos carregando a foto do imóvel, aguarde uns
                          instantes...
                        </p>
                      </div>
                    )}
                    {/* <iframe
                      src={getIframeUrl(property.image)}
                      title={property.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onLoad={() => setIsIframeLoading(false)}
                    ></iframe> */}
                    <img
                      src={property.mainImage}
                      title={property.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onLoad={() => setIsIframeLoading(false)}
                    />

                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge
                        variant={getBadgeVariant(property.badge)}
                        className="bg-wine text-white"
                      >
                        {property.badge}
                      </Badge>
                      {property.isNew && (
                        <Badge
                          variant="outline"
                          className="bg-green-500 text-white border-green-500"
                        >
                          Lançamento
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-3 right-3">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="bg-white bg-opacity-80 hover:bg-opacity-100"
                        onClick={() => handleImageGallery(property.id)}
                      >
                        <ImageIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="mb-3">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2">
                        {property.title}
                      </h3>
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        {property.location}
                      </div>
                    </div>

                    <div className="text-2xl font-bold text-wine mb-4">
                      {property.price}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-4">
                        <span>{property.bedrooms} quartos</span>
                        <span>{property.bathrooms} banheiros</span>
                        <span>{property.area}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        className="flex-1 bg-wine hover:bg-wine-dark text-white"
                        onClick={() => handleViewDetails(property)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Ver Detalhes
                      </Button>
                      <Button
                        variant="outline"
                        className="border-wine text-wine hover:bg-wine hover:text-white"
                        onClick={() => handleContact(property.title)}
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        Contato
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              className="border-wine text-wine hover:bg-wine hover:text-white px-8"
              onClick={resetFilters}
            >
              Ver Todos os Imóveis
            </Button>
          </div>
        </div>
      </section>

      <PropertyDetailsModal
        property={selectedProperty}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default FeaturedProperties;
