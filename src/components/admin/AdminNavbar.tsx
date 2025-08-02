import React from "react";
import { Button } from "@/components/ui/button";
import { Home, Menu, User, Bell, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AdminThemeToggle from "./AdminThemeToggle";
import { useAdminTheme } from "@/hooks/useAdminTheme";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuthContext } from "@/contexts/hook/useAuthContext";

interface AdminNavbarProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

const AdminNavbar = ({ onToggleSidebar, sidebarOpen }: AdminNavbarProps) => {
  const { adminTheme } = useAdminTheme();
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 h-16 backdrop-blur-md border-b transition-colors duration-300 ${
        adminTheme === "dark"
          ? "bg-gray-900/80 border-gray-700/50 text-white"
          : "bg-white/80 border-gray-200/50 text-gray-900"
      }`}
    >
      <div className="flex items-center justify-between h-full px-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className={`transition-colors ${
              adminTheme === "dark"
                ? "hover:bg-gray-800 text-white"
                : "hover:bg-gray-100 text-gray-900"
            }`}
          >
            <Menu className="w-5 h-5" />
          </Button>

          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-wine to-wine-dark rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1
                className={`text-lg font-bold ${
                  adminTheme === "dark" ? "text-white" : "text-wine"
                }`}
              >
                REVAN
              </h1>
            </div>
          </Link>
        </div>

        {/* Center - Breadcrumbs */}
        <div
          className={`hidden md:flex items-center space-x-2 text-sm ${
            adminTheme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <span>Admin</span>
          <span>/</span>
          <span
            className={`font-medium ${
              adminTheme === "dark" ? "text-white" : "text-wine"
            }`}
          >
            Dashboard
          </span>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* <AdminThemeToggle /> */}

          <Button
            variant="ghost"
            size="icon"
            className={`relative transition-colors ${
              adminTheme === "dark"
                ? "hover:bg-gray-800 text-white"
                : "hover:bg-gray-100 text-gray-900"
            }`}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
              3
            </span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                className={`flex items-center space-x-2 pl-3 border-l cursor-pointer ${
                  adminTheme === "dark" ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <div className="w-8 h-8 bg-wine rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>

                <div className="hidden sm:block text-right">
                  <p
                    className={`text-sm font-medium ${
                      adminTheme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Admin User
                  </p>
                  <p
                    className={`text-xs ${
                      adminTheme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Super Admin
                  </p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 ${
                    adminTheme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
