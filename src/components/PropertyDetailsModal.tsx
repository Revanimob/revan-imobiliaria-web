
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Home, Bath, Ruler, Calendar, Phone, Heart, Share2 } from 'lucide-react';

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

const PropertyDetailsModal = ({ property, isOpen, onClose }: PropertyDetailsModalProps) => {
  if (!property) return null;

  const handleContact = () => {
    alert(`Entrando em contato sobre ${property.title}. Em breve, você será direcionado para o WhatsApp ou formulário de contato.`);
  };

  const handleShare = () => {
    alert('Funcionalidade de compartilhamento será implementada em breve.');
  };

  const handleFavorite = () => {
    alert('Imóvel adicionado aos favoritos!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-wine">{property.title}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Imagem Principal */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-64 lg:h-80 object-cover rounded-lg"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <Badge className="bg-wine text-white">
                  {property.badge}
                </Badge>
                {property.isNew && (
                  <Badge variant="outline" className="bg-green-500 text-white border-green-500">
                    Novo
                  </Badge>
                )}
              </div>
              <div className="absolute top-3 right-3 flex gap-2">
                <Button size="icon" variant="ghost" className="bg-white/80" onClick={handleFavorite}>
                  <Heart className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" className="bg-white/80" onClick={handleShare}>
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {/* Galeria de Imagens Menores */}
            <div className="grid grid-cols-3 gap-2">
              {[property.image, property.image, property.image].map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${property.title} - ${index + 1}`}
                  className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                />
              ))}
            </div>
          </div>

          {/* Detalhes do Imóvel */}
          <div className="space-y-6">
            <div>
              <div className="text-3xl font-bold text-wine mb-2">{property.price}</div>
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
              <h3 className="text-lg font-semibold text-wine mb-2">Descrição</h3>
              <p className="text-gray-700 leading-relaxed">
                Excelente imóvel localizado em uma das melhores regiões da cidade. 
                Com acabamento de primeira qualidade, ambientes amplos e bem iluminados. 
                Próximo a escolas, comércio e transporte público. Uma oportunidade única 
                para quem busca conforto e qualidade de vida.
              </p>
            </div>

            {/* Características Extras */}
            <div>
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
            </div>

            {/* Botões de Ação */}
            <div className="space-y-3">
              <Button 
                className="w-full bg-wine hover:bg-wine-dark text-white"
                onClick={handleContact}
              >
                <Phone className="w-4 h-4 mr-2" />
                Entrar em Contato
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="border-wine text-wine hover:bg-wine hover:text-white">
                  Agendar Visita
                </Button>
                <Button variant="outline" className="border-wine text-wine hover:bg-wine hover:text-white">
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
