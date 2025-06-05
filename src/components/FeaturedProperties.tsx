
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Home as HomeIcon, Image as ImageIcon } from 'lucide-react';

const FeaturedProperties = () => {
  const properties = [
    {
      id: 1,
      title: "Apartamento Luxuoso em Copacabana",
      price: "R$ 1.200.000",
      location: "Copacabana, Rio de Janeiro",
      bedrooms: 3,
      bathrooms: 2,
      area: "120m²",
      type: "Apartamento",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
      badge: "Destaque",
      isNew: true
    },
    {
      id: 2,
      title: "Casa Moderna com Piscina",
      price: "R$ 890.000",
      location: "Barra da Tijuca, Rio de Janeiro",
      bedrooms: 4,
      bathrooms: 3,
      area: "250m²",
      type: "Casa",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      badge: "Promoção",
      isNew: false
    },
    {
      id: 3,
      title: "Cobertura com Vista Mar",
      price: "R$ 2.500.000",
      location: "Ipanema, Rio de Janeiro",
      bedrooms: 4,
      bathrooms: 4,
      area: "300m²",
      type: "Cobertura",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
      badge: "Exclusivo",
      isNew: true
    },
    {
      id: 4,
      title: "Apartamento Studio Centro",
      price: "R$ 350.000",
      location: "Centro, Rio de Janeiro",
      bedrooms: 1,
      bathrooms: 1,
      area: "45m²",
      type: "Studio",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      badge: "Oportunidade",
      isNew: false
    },
    {
      id: 5,
      title: "Casa de Condomínio Recreio",
      price: "R$ 750.000",
      location: "Recreio, Rio de Janeiro",
      bedrooms: 3,
      bathrooms: 2,
      area: "180m²",
      type: "Casa",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
      badge: "Novo",
      isNew: true
    },
    {
      id: 6,
      title: "Loft Industrial Lapa",
      price: "R$ 480.000",
      location: "Lapa, Rio de Janeiro",
      bedrooms: 2,
      bathrooms: 1,
      area: "85m²",
      type: "Loft",
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
      badge: "Tendência",
      isNew: false
    }
  ];

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case 'Destaque': return 'default';
      case 'Promoção': return 'destructive';
      case 'Exclusivo': return 'secondary';
      case 'Novo': return 'outline';
      default: return 'default';
    }
  };

  return (
    <section id="imoveis" className="py-16 bg-beige-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-wine mb-4">Imóveis em Destaque</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubra as melhores oportunidades do mercado imobiliário selecionadas especialmente para você
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {properties.map((property) => (
            <Card key={property.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge 
                    variant={getBadgeVariant(property.badge)}
                    className="bg-wine text-white"
                  >
                    {property.badge}
                  </Badge>
                  {property.isNew && (
                    <Badge variant="outline" className="bg-green-500 text-white border-green-500">
                      Novo
                    </Badge>
                  )}
                </div>
                <div className="absolute top-3 right-3">
                  <Button size="icon" variant="ghost" className="bg-white bg-opacity-80 hover:bg-opacity-100">
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
                  <Button className="flex-1 bg-wine hover:bg-wine-dark text-white">
                    Ver Detalhes
                  </Button>
                  <Button variant="outline" className="border-wine text-wine hover:bg-wine hover:text-white">
                    Contato
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline" 
            className="border-wine text-wine hover:bg-wine hover:text-white px-8"
          >
            Ver Todos os Imóveis
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
