
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, Search, User, Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Início', href: '#', icon: Home },
    { label: 'Imóveis', href: '#imoveis' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Quem Somos', href: '#sobre' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-wine to-wine-dark rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-wine">REVAN</h1>
              <p className="text-xs text-gray-600">IMOBILIÁRIA</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-wine transition-colors duration-200 font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" className="border-wine text-wine hover:bg-wine hover:text-white">
              <User className="w-4 h-4 mr-2" />
              Login
            </Button>
            <Button className="bg-wine hover:bg-wine-dark text-white">
              Anunciar Imóvel
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6 text-wine" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {menuItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="text-lg font-medium text-gray-700 hover:text-wine transition-colors py-2 border-b border-gray-100"
                    >
                      {item.label}
                    </a>
                  ))}
                  <div className="pt-4 space-y-3">
                    <Button variant="outline" className="w-full border-wine text-wine">
                      <User className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                    <Button className="w-full bg-wine hover:bg-wine-dark text-white">
                      Anunciar Imóvel
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
