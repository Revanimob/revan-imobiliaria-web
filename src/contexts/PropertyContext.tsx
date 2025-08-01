import React, { createContext, useContext, useState, ReactNode } from "react";
import { initialProperties } from "./data/imoveis";

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
  operation: "comprar" | "alugar";
}

export interface SearchFilters {
  location: string;
  type: string;
  operation: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  bathrooms: string;
  title?: string;
}

interface PropertyContextType {
  properties: Property[];
  filteredProperties: Property[];
  searchFilters: SearchFilters;
  updateFilters: (filters: Partial<SearchFilters>) => void;
  searchProperties: () => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(
  undefined
);

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [properties] = useState<Property[]>(initialProperties);
  const [filteredProperties, setFilteredProperties] =
    useState<Property[]>(initialProperties);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    location: "",
    type: "",
    operation: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
  });

  const updateFilters = (filters: Partial<SearchFilters>) => {
    setSearchFilters((prev) => ({ ...prev, ...filters }));
  };

  const searchProperties = () => {
    let filtered = [...properties];

    const {
      location,
      title,
      type,
      operation,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
    } = searchFilters;

    // Filtro por localização
    if (location?.trim()) {
      filtered = filtered.filter((property) =>
        property.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Filtro por nome (título do empreendimento)
    if (title?.trim()) {
      filtered = filtered.filter((property) =>
        property.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    // Filtro por tipo
    if (type) {
      filtered = filtered.filter((property) => property.type === type);
    }

    // Filtro por operação
    if (operation) {
      filtered = filtered.filter(
        (property) => property.operation === operation
      );
    }

    // Filtro por preço mínimo
    if (minPrice && !isNaN(parseInt(minPrice))) {
      filtered = filtered.filter(
        (property) => property.priceValue >= parseInt(minPrice)
      );
    }

    // Filtro por preço máximo
    if (maxPrice && !isNaN(parseInt(maxPrice))) {
      filtered = filtered.filter(
        (property) => property.priceValue <= parseInt(maxPrice)
      );
    }

    // Filtro por quantidade mínima de quartos
    if (bedrooms && !isNaN(parseInt(bedrooms))) {
      filtered = filtered.filter(
        (property) => property.bedrooms >= parseInt(bedrooms)
      );
    }

    // Filtro por quantidade mínima de banheiros
    if (bathrooms && !isNaN(parseInt(bathrooms))) {
      filtered = filtered.filter(
        (property) => property.bathrooms >= parseInt(bathrooms)
      );
    }

    setFilteredProperties(filtered);
    console.log("Filtered properties:", filtered);
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        filteredProperties,
        searchFilters,
        updateFilters,
        searchProperties,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error("useProperty must be used within a PropertyProvider");
  }
  return context;
};
