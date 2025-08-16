import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { initialProperties } from "./data/imoveis";
import { normalize } from "@/util/util";
import { getAllPropertiesService } from "@/services/propertyService";

export interface Property {
  id?: number;
  title: string;
  price: string;
  qtdstock: number;
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
  status: "disponivel" | "vendido" | "alugado" | "reservado";
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
  resetFilters: () => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(
  undefined
);

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getAllPropertiesService();
        setProperties(data);
        setFilteredProperties(data);
        console.log("Propriedades carregadas:", data);
      } catch (error) {
        console.error("Erro ao buscar propriedades:", error);
      }
    };

    fetchProperties();
  }, []);

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
        normalize(property.location).includes(normalize(location))
      );
    }

    // Filtro por nome (título do empreendimento)
    if (title?.trim()) {
      filtered = filtered.filter((property) =>
        normalize(property.title).includes(normalize(title))
      );
    }

    // Filtro por tipo de imóvel
    if (type?.trim()) {
      filtered = filtered.filter(
        (property) => property.type.toLowerCase() === type.toLowerCase()
      );
    }

    // Filtro por operação (comprar/alugar)
    if (operation?.trim()) {
      filtered = filtered.filter(
        (property) =>
          property.operation.toLowerCase() === operation.toLowerCase()
      );
    }

    // Preço mínimo
    if (minPrice && !isNaN(parseInt(minPrice))) {
      filtered = filtered.filter(
        (property) => property.priceValue >= parseInt(minPrice)
      );
    }

    // Preço máximo
    if (maxPrice && !isNaN(parseInt(maxPrice))) {
      filtered = filtered.filter(
        (property) => property.priceValue <= parseInt(maxPrice)
      );
    }

    // Quartos mínimos
    if (bedrooms && !isNaN(parseInt(bedrooms))) {
      filtered = filtered.filter(
        (property) => property.bedrooms >= parseInt(bedrooms)
      );
    }

    // Banheiros mínimos
    if (bathrooms && !isNaN(parseInt(bathrooms))) {
      filtered = filtered.filter(
        (property) => property.bathrooms >= parseInt(bathrooms)
      );
    }

    setFilteredProperties(filtered);
    console.log("Filtered properties:", filtered);
  };

  const resetFilters = () => {
    setSearchFilters({
      location: "",
      type: "",
      operation: "",
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
      bathrooms: "",
      title: "",
    });

    setFilteredProperties(properties);
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        filteredProperties,
        searchFilters,
        updateFilters,
        searchProperties,
        resetFilters,
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
