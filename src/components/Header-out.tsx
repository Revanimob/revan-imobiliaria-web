import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, Building, Sparkles } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/Logo Revan Horizontal.png";

const HeaderOut = () => {
  const [open, setOpen] = useState(false); // controla o drawer
  const location = useLocation();
  const navigate = useNavigate();

  // guarda qual seção queremos ir
  const [targetSection, setTargetSection] = useState<string | null>(null);

  useEffect(() => {
    if (targetSection && location.pathname === "/") {
      const section = document.getElementById(targetSection);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setTargetSection(null); // reseta depois de rolar
    }
  }, [location.pathname, targetSection]);

  const navigationTabs = [
    { id: "compra", label: "Compra", section: "imoveis" },
    { id: "aluguel", label: "Aluguel", section: "imoveis" },
    {
      id: "lancamentos",
      label: "Lançamentos",
      section: "imoveis",
    },
  ];

  const handleNavigateSection = (sectionId: string) => {
    if (location.pathname === "/") {
      // já está na home → só rolar
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // salvar alvo, ir para home e rolar via useEffect
      setTargetSection(sectionId);
      navigate("/");
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 md:h-24 lg:h-21">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Logo Revan"
              className="w-36 h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 object-contain"
            />
          </Link>

          {/* Navegação desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationTabs.map((tab) => (
              <Button
                key={tab.id}
                variant="ghost"
                className="text-sm md:text-base"
                onClick={() => handleNavigateSection(tab.section)}
              >
                {tab.label}
              </Button>
            ))}
          </nav>

          {/* Botão Anunciar */}
          <div className="hidden md:flex items-center space-x-2 md:space-x-3">
            <Button
              variant="outline"
              className="border-wine text-wine hover:bg-wine hover:text-white text-sm md:text-base"
              onClick={() => handleNavigateSection("servicos")}
            >
              <Home className="w-4 h-4 mr-1 md:mr-2" />
              Home
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
                {navigationTabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      setOpen(false);
                      handleNavigateSection(tab.section);
                    }}
                  >
                    {tab.label}
                  </Button>
                ))}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderOut;
