
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, Menu, User, Bell, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

interface AdminNavbarProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

const AdminNavbar = ({ onToggleSidebar, sidebarOpen }: AdminNavbarProps) => {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-wine to-wine-dark rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-wine dark:text-white">REVAN</h1>
            </div>
          </Link>
        </div>

        {/* Center - Breadcrumbs */}
        <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <span>Admin</span>
          <span>/</span>
          <span className="text-wine dark:text-white font-medium">Dashboard</span>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
              3
            </span>
          </Button>

          <div className="flex items-center space-x-2 pl-3 border-l border-gray-200 dark:border-gray-700">
            <div className="w-8 h-8 bg-wine rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
