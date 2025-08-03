import React from "react";
import { Button } from "@/components/ui/button";
import { Home, User } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/Logo Revan Vinho.png";

const Header = () => {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-28 h-28 rounded-lg flex items-center justify-center">
              <img
                src={logo}
                alt="Logo Revan"
                className="w-full h-full object-contain"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-wine">REVAN</h1>
              <p className="text-xs text-gray-600">IMOBILIÁRIA</p>
            </div>
          </Link>

          {/* Login Button */}
          <div className="flex items-center space-x-3">
            <Link to="/login">
              <Button
                variant="outline"
                className="border-wine text-wine hover:bg-wine hover:text-white"
              >
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
