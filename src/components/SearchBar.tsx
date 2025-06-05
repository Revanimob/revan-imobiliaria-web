
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Home as HomeIcon, DollarSign } from 'lucide-react';
import { Card } from '@/components/ui/card';

const SearchBar = () => {
  const [searchData, setSearchData] = useState({
    location: '',
    type: '',
    operation: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: ''
  });

  const handleSearch = () => {
    console.log('Searching with:', searchData);
    // Implementar lógica de busca
  };

  return (
    <div className="relative -mt-20 z-30 mx-4 mb-12">
      <Card className="bg-white shadow-2xl rounded-xl p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 items-end">
          {/* Localização */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <MapPin className="w-4 h-4 mr-1 text-wine" />
              Localização
            </label>
            <Input
              placeholder="Cidade, bairro..."
              value={searchData.location}
              onChange={(e) => setSearchData({...searchData, location: e.target.value})}
              className="border-gray-300 focus:border-wine"
            />
          </div>

          {/* Tipo de Imóvel */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <HomeIcon className="w-4 h-4 mr-1 text-wine" />
              Tipo
            </label>
            <Select value={searchData.type} onValueChange={(value) => setSearchData({...searchData, type: value})}>
              <SelectTrigger className="border-gray-300">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartamento">Apartamento</SelectItem>
                <SelectItem value="casa">Casa</SelectItem>
                <SelectItem value="terreno">Terreno</SelectItem>
                <SelectItem value="comercial">Comercial</SelectItem>
                <SelectItem value="rural">Rural</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Operação */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Operação</label>
            <Select value={searchData.operation} onValueChange={(value) => setSearchData({...searchData, operation: value})}>
              <SelectTrigger className="border-gray-300">
                <SelectValue placeholder="Comprar/Alugar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="comprar">Comprar</SelectItem>
                <SelectItem value="alugar">Alugar</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Faixa de Preço */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <DollarSign className="w-4 h-4 mr-1 text-wine" />
              Preço Mínimo
            </label>
            <Select value={searchData.minPrice} onValueChange={(value) => setSearchData({...searchData, minPrice: value})}>
              <SelectTrigger className="border-gray-300">
                <SelectValue placeholder="Mín" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="100000">R$ 100.000</SelectItem>
                <SelectItem value="200000">R$ 200.000</SelectItem>
                <SelectItem value="300000">R$ 300.000</SelectItem>
                <SelectItem value="500000">R$ 500.000</SelectItem>
                <SelectItem value="1000000">R$ 1.000.000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quartos */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Quartos</label>
            <Select value={searchData.bedrooms} onValueChange={(value) => setSearchData({...searchData, bedrooms: value})}>
              <SelectTrigger className="border-gray-300">
                <SelectValue placeholder="Qtd" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Botão de Busca */}
          <Button 
            onClick={handleSearch}
            className="bg-wine hover:bg-wine-dark text-white h-10 px-6"
          >
            <Search className="w-4 h-4 mr-2" />
            Buscar
          </Button>
        </div>

        {/* Filtros Rápidos */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 mr-2">Busca rápida:</span>
            {['Apartamento 2 quartos', 'Casa 3 quartos', 'Cobertura', 'Terreno'].map((filter) => (
              <Button
                key={filter}
                variant="outline"
                size="sm"
                className="text-xs border-wine text-wine hover:bg-wine hover:text-white"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SearchBar;
