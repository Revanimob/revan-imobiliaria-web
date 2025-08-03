import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import rua03numero480 from "@/assets/Rua03-numero480.jpg";
import RuaSetePronta from "@/assets/RuaSetePronta.jpg";
import RuaZezeMacedoResidencialCamila from "@/assets/RuaZezeMacedoResidencialCamila.jpg";

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Encontre o Imóvel dos Seus Sonhos",
      subtitle:
        "Mais de 10.000 imóveis disponíveis para compra, venda e locação",
      image: rua03numero480,
    },
    {
      id: 2,
      title: "Expertise em Mercado Imobiliário",
      subtitle:
        "25 anos de experiência conectando pessoas aos melhores imóveis",
      image: RuaSetePronta,
    },
    {
      id: 3,
      title: "Assessoria Completa",
      subtitle: "Da busca ao financiamento, cuidamos de cada detalhe para você",
      image: RuaZezeMacedoResidencialCamila,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const scrollToSearch = () => {
    const searchElement = document.getElementById("search-bar");
    if (searchElement) {
      searchElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToProperties = () => {
    const propertiesElement = document.getElementById("imoveis");
    if (propertiesElement) {
      propertiesElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-[70vh] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          </div>
        </div>
      ))}

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in">
            {slides[currentSlide].subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button
              size="lg"
              className="bg-wine hover:bg-wine-dark text-white px-8 py-3 text-lg"
              onClick={scrollToSearch}
            >
              <Search className="w-5 h-5 mr-2" />
              Buscar Imóveis
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-wine hover:bg-white hover:text-wine px-8 py-3 text-lg"
              onClick={scrollToProperties}
            >
              Verificar Ofertas
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-200"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-200"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
