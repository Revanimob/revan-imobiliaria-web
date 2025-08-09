import React from "react";
import { Button } from "@/components/ui/button";
import { Home, User } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/Logo Revan P1.png";
import logodois from "@/assets/Logo Revan P2.png";

const Header = () => {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-0">
            <div className="w-48 h-48 flex items-center justify-center">
              <img
                src={logo}
                alt="Logo Revan"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="w-48 h-48 flex items-center justify-center">
              <img
                src={logodois}
                alt="Logo Revan"
                className="w-full h-full object-contain"
              />
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
