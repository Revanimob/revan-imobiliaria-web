import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, Building, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useProperty } from "@/contexts/PropertyContext";
import logo from "@/assets/Logo Revan P1.png";
import logodois from "@/assets/Logo Revan P2.png";

const Header = () => {
  const { filterByCategory, currentCategory } = useProperty();
  const [open, setOpen] = useState(false); // controla o drawer

  const scrollToSection = (sectionId: string, category: string) => {
    filterByCategory(category);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);

    setOpen(false); // fecha o drawer após clicar
  };

  const navigationTabs = [
    { id: "compra", label: "Compra", icon: Home, section: "imoveis" },
    { id: "aluguel", label: "Aluguel", icon: Building, section: "imoveis" },
    {
      id: "lancamentos",
      label: "Lançamentos",
      icon: Sparkles,
      section: "imoveis",
    },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 md:h-24 lg:h-21">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Logo Revan"
              className="w-20 h-20 md:w-32 md:h-32 lg:w-48 lg:h-48 object-contain"
            />
            <img
              src={logodois}
              alt="Logo Revan"
              className="w-20 h-20 md:w-32 md:h-32 lg:w-48 lg:h-48 object-contain"
            />
          </Link>

          {/* Navegação desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.section, tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentCategory === tab.id
                    ? "bg-wine text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* Botão Anunciar */}
          <div className="hidden md:flex items-center space-x-2 md:space-x-3">
            <Button
              variant="outline"
              className="border-wine text-wine hover:bg-wine hover:text-white text-sm md:text-base"
              onClick={() => {
                const section = document.getElementById("servicos");
                if (section) {
                  section.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
            >
              <Home className="w-4 h-4 mr-1 md:mr-2" />
              Anunciar Imóveis
            </Button>
          </div>

          {/* Drawer Mobile */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-4">
                <nav className="flex flex-col gap-3 mt-6">
                  {navigationTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => scrollToSection(tab.section, tab.id)}
                      className={`text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                        currentCategory === tab.id
                          ? "bg-wine text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                  <Button
                    variant="outline"
                    className="mt-4 border-wine text-wine hover:bg-wine hover:text-white"
                    onClick={() => {
                      const section = document.getElementById("servicos");
                      if (section) {
                        section.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                      setOpen(false); // fecha após clique
                    }}
                  >
                    Anunciar Imóveis
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
