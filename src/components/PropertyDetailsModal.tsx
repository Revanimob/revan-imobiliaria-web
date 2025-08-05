import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Home,
  Bath,
  Ruler,
  Calendar,
  Phone,
  Heart,
  Share2,
  Loader2,
} from "lucide-react";
import { sendWpp } from "@/services/wppService";
import { toast } from "sonner";
import logo from "@/assets/fotor-2025080311745.jpg";

interface Property {
  id: number;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
  badge: string;
  isNew?: boolean;
}

interface PropertyDetailsModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

const PropertyDetailsModal = ({
  property,
  isOpen,
  onClose,
}: PropertyDetailsModalProps) => {
  if (!property) return null;
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  const handleContact = (property: String) => {
    const message = `Olá, gostaria de um auxílio de especialista da Revan,estou entrando em contato para saber informações 
      sobre o imóvel ${property}.`;

    sendWpp({ mensagem: message });
  };

  const handleVisit = () => {
    const message = `Olá, gostaria de visitar o empreendimento ${property.title} ,como eu faço?.`;
    sendWpp({ mensagem: message });
  };

  const handleFinancial = () => {
    const message = `Olá, gostaria de simular um financiamento para o empreendimento ${property.title} ,como eu faço?.`;
    sendWpp({ mensagem: message });
  };

  const handleShare = () => {
    toast("Funcionalidade de compartilhamento será implementada em breve.");
  };

  const handleFavorite = () => {
    toast("Imóvel adicionado aos favoritos!");
  };

  const getIframeUrl = (image?: string | null): string => {
    if (!image) return "";
    const match = image.match(/\/d\/([a-zA-Z0-9_-]+)/);
    const id = match?.[1];
    return id ? `https://drive.google.com/file/d/${id}/preview` : "";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-wine">
            {property.title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Imagem Principal */}
          <div className="space-y-4">
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
              <iframe
                src={getIframeUrl(property.image)}
                title={property.title}
                className="w-full mt-8 aspect-video rounded-lg"
                allow="autoplay"
                onLoad={() => setIsIframeLoading(false)}
              />

              <div className="hidden lg:block">
                <img src={logo} alt="Logo" className="w-32" />
              </div>

              <div className="absolute top-3 left-3 flex gap-2">
                <Badge className="bg-wine text-white">{property.badge}</Badge>
                {property.isNew && (
                  <Badge
                    variant="outline"
                    className="bg-green-500 text-white border-green-500"
                  >
                    Novo
                  </Badge>
                )}
              </div>
              <div className="absolute top-3 right-3 flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="bg-white/80"
                  onClick={handleFavorite}
                >
                  <Heart className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="bg-white/80"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Galeria de Imagens Menores */}
            {/* <div className="grid grid-cols-3 gap-2">
              {[property.image, property.image, property.image].map(
                (img, index) => (
                  <iframe
                    key={index}
                    src={getIframeUrl(img)}
                    title={property.title}
                    className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                  ></iframe>
                )
              )}
            </div> */}
          </div>

          {/* Detalhes do Imóvel */}
          <div className="space-y-6">
            <div>
              <div className="text-3xl font-bold text-wine mb-2">
                {property.price}
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                {property.location}
              </div>
            </div>

            {/* Características */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-beige-light rounded-lg">
                <Home className="w-6 h-6 mx-auto mb-1 text-wine" />
                <div className="font-semibold">{property.bedrooms}</div>
                <div className="text-sm text-gray-600">Quartos</div>
              </div>
              <div className="text-center p-3 bg-beige-light rounded-lg">
                <Bath className="w-6 h-6 mx-auto mb-1 text-wine" />
                <div className="font-semibold">{property.bathrooms}</div>
                <div className="text-sm text-gray-600">Banheiros</div>
              </div>
              <div className="text-center p-3 bg-beige-light rounded-lg">
                <Ruler className="w-6 h-6 mx-auto mb-1 text-wine" />
                <div className="font-semibold">{property.area}</div>
                <div className="text-sm text-gray-600">Área</div>
              </div>
            </div>

            {/* Descrição */}
            <div>
              <h3 className="text-lg font-semibold text-wine mb-2">
                Descrição
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Excelente imóvel localizado em uma das melhores regiões da
                cidade. Com acabamento de primeira qualidade, ambientes amplos e
                bem iluminados. Próximo a escolas, comércio e transporte
                público. Uma oportunidade única para quem busca conforto e
                qualidade de vida.
              </p>
            </div>

            {/* Características Extras */}
            {/* <div>
              <h3 className="text-lg font-semibold text-wine mb-2">Características</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-wine rounded-full mr-2"></div>
                  Garagem
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-wine rounded-full mr-2"></div>
                  Área de lazer
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-wine rounded-full mr-2"></div>
                  Portaria 24h
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-wine rounded-full mr-2"></div>
                  Elevador
                </div>
              </div>
            </div> */}

            {/* Botões de Ação */}
            <div className="space-y-3">
              <Button
                className="w-full bg-wine hover:bg-wine-dark text-white"
                onClick={() => handleContact(property.title)}
              >
                <Phone className="w-4 h-4 mr-2" />
                Entrar em Contato
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="border-wine text-wine hover:bg-wine hover:text-white"
                  onClick={handleVisit}
                >
                  Agendar Visita
                </Button>
                <Button
                  variant="outline"
                  className="border-wine text-wine hover:bg-wine hover:text-white"
                  onClick={handleFinancial}
                >
                  Simular Financiamento
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyDetailsModal;
