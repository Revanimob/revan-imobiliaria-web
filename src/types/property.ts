export interface Property {
  title: string;
  description: string;
  price: number;
  type: "casa" | "apartamento" | "terreno" | "comercial";
  status: "disponivel" | "vendido" | "alugado" | "reservado";
  address: string;
  neighborhood: string;
  city: string;
  zipCode: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  garage: number;
  images: string;
  createdAt: string;
  updatedAt: string;
}
