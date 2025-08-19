import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Home, Building, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useProperty } from "@/contexts/PropertyContext";
import logo from "@/assets/Logo Revan P1.png";
import logodois from "@/assets/Logo Revan P2.png";

const Header = () => {
  const { filterByCategory, currentCategory } = useProperty();

  const scrollToSection = (sectionId: string, category: string) => {
    // Primeiro aplica o filtro
    filterByCategory(category);
    
    // Depois faz scroll para a seção
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const navigationTabs = [
    {
      id: "",
      label: "Todos",
      icon: Home,
      section: "imoveis"
    },
    {
      id: "compra",
      label: "Compra",
      icon: Home,
      section: "imoveis"
    },
    {
      id: "aluguel", 
      label: "Aluguel",
      icon: Building,
      section: "imoveis"
    },
    {
      id: "lancamentos",
      label: "Lançamentos", 
      icon: Sparkles,
      section: "imoveis"
    }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 md:h-24 lg:h-21">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 md:gap-2">
            <div className="w-20 h-20 md:w-32 md:h-32 lg:w-48 lg:h-48 flex items-center justify-center">
              <img
                src={logo}
                alt="Logo Revan"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="w-20 h-20 md:w-32 md:h-32 lg:w-48 lg:h-48 flex items-center justify-center">
              <img
                src={logodois}
                alt="Logo Revan"
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationTabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.section, tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    currentCategory === tab.id
                      ? "bg-wine text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Login Button */}
          <div className="flex items-center space-x-2 md:space-x-3">
            <Link to="/login">
              <Button
                variant="outline"
                className="border-wine text-wine hover:bg-wine hover:text-white text-sm md:text-base"
              >
                <User className="w-4 h-4 mr-1 md:mr-2" />
                Login
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <nav className="flex justify-center space-x-1">
            {navigationTabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.section, tab.id)}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                    currentCategory === tab.id
                      ? "bg-wine text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
