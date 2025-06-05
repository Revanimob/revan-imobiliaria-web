
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Property {
  id: number;
  title: string;
  price: string;
  priceValue: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  areaValue: number;
  type: string;
  image: string;
  badge: string;
  isNew: boolean;
  operation: 'comprar' | 'alugar';
}

export interface SearchFilters {
  location: string;
  type: string;
  operation: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  bathrooms: string;
}

interface PropertyContextType {
  properties: Property[];
  filteredProperties: Property[];
  searchFilters: SearchFilters;
  updateFilters: (filters: Partial<SearchFilters>) => void;
  searchProperties: () => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

const initialProperties: Property[] = [
  {
    id: 1,
    title: "Apartamento Luxuoso em Copacabana",
    price: "R$ 1.200.000",
    priceValue: 1200000,
    location: "Copacabana, Rio de Janeiro",
    bedrooms: 3,
    bathrooms: 2,
    area: "120m²",
    areaValue: 120,
    type: "apartamento",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
    badge: "Destaque",
    isNew: true,
    operation: "comprar"
  },
  {
    id: 2,
    title: "Casa Moderna com Piscina",
    price: "R$ 890.000",
    priceValue: 890000,
    location: "Barra da Tijuca, Rio de Janeiro",
    bedrooms: 4,
    bathrooms: 3,
    area: "250m²",
    areaValue: 250,
    type: "casa",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
    badge: "Promoção",
    isNew: false,
    operation: "comprar"
  },
  {
    id: 3,
    title: "Cobertura com Vista Mar",
    price: "R$ 2.500.000",
    priceValue: 2500000,
    location: "Ipanema, Rio de Janeiro",
    bedrooms: 4,
    bathrooms: 4,
    area: "300m²",
    areaValue: 300,
    type: "apartamento",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
    badge: "Exclusivo",
    isNew: true,
    operation: "comprar"
  },
  {
    id: 4,
    title: "Apartamento Studio Centro",
    price: "R$ 350.000",
    priceValue: 350000,
    location: "Centro, Rio de Janeiro",
    bedrooms: 1,
    bathrooms: 1,
    area: "45m²",
    areaValue: 45,
    type: "apartamento",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    badge: "Oportunidade",
    isNew: false,
    operation: "alugar"
  },
  {
    id: 5,
    title: "Casa de Condomínio Recreio",
    price: "R$ 750.000",
    priceValue: 750000,
    location: "Recreio, Rio de Janeiro",
    bedrooms: 3,
    bathrooms: 2,
    area: "180m²",
    areaValue: 180,
    type: "casa",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
    badge: "Novo",
    isNew: true,
    operation: "comprar"
  },
  {
    id: 6,
    title: "Loft Industrial Lapa",
    price: "R$ 480.000",
    priceValue: 480000,
    location: "Lapa, Rio de Janeiro",
    bedrooms: 2,
    bathrooms: 1,
    area: "85m²",
    areaValue: 85,
    type: "comercial",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
    badge: "Tendência",
    isNew: false,
    operation: "alugar"
  }
];

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [properties] = useState<Property[]>(initialProperties);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(initialProperties);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    location: '',
    type: '',
    operation: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: ''
  });

  const updateFilters = (filters: Partial<SearchFilters>) => {
    setSearchFilters(prev => ({ ...prev, ...filters }));
  };

  const searchProperties = () => {
    let filtered = [...properties];

    // Filtro por localização
    if (searchFilters.location) {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(searchFilters.location.toLowerCase())
      );
    }

    // Filtro por tipo
    if (searchFilters.type) {
      filtered = filtered.filter(property => property.type === searchFilters.type);
    }

    // Filtro por operação
    if (searchFilters.operation) {
      filtered = filtered.filter(property => property.operation === searchFilters.operation);
    }

    // Filtro por preço mínimo
    if (searchFilters.minPrice) {
      const minPrice = parseInt(searchFilters.minPrice);
      filtered = filtered.filter(property => property.priceValue >= minPrice);
    }

    // Filtro por preço máximo
    if (searchFilters.maxPrice) {
      const maxPrice = parseInt(searchFilters.maxPrice);
      filtered = filtered.filter(property => property.priceValue <= maxPrice);
    }

    // Filtro por quartos
    if (searchFilters.bedrooms) {
      const minBedrooms = parseInt(searchFilters.bedrooms);
      filtered = filtered.filter(property => property.bedrooms >= minBedrooms);
    }

    // Filtro por banheiros
    if (searchFilters.bathrooms) {
      const minBathrooms = parseInt(searchFilters.bathrooms);
      filtered = filtered.filter(property => property.bathrooms >= minBathrooms);
    }

    setFilteredProperties(filtered);
    console.log('Filtered properties:', filtered);
  };

  return (
    <PropertyContext.Provider value={{
      properties,
      filteredProperties,
      searchFilters,
      updateFilters,
      searchProperties
    }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};
