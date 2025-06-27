
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Home, 
  BarChart3, 
  Settings, 
  LogOut,
  MessageSquare,
  Bell
} from 'lucide-react';
import { useResponsive } from '@/hooks/useResponsive';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSidebar = ({ isOpen, onClose }: AdminSidebarProps) => {
  const location = useLocation();
  const { isMobile, isDesktop } = useResponsive();

  const menuItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/admin/dashboard',
      badge: null
    },
    { 
      icon: Users, 
      label: 'Administradores', 
      path: '/admin/users',
      badge: '3'
    },
    { 
      icon: Home, 
      label: 'Imóveis', 
      path: '/admin/properties',
      badge: null
    },
    { 
      icon: BarChart3, 
      label: 'Relatórios', 
      path: '/admin/reports',
      badge: null
    },
    { 
      icon: MessageSquare, 
      label: 'Mensagens', 
      path: '/admin/messages',
      badge: '12'
    },
    { 
      icon: Settings, 
      label: 'Configurações', 
      path: '/admin/settings',
      badge: null
    },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={`
              group flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200
              ${isActivePath(item.path) 
                ? 'bg-wine/10 text-wine dark:bg-wine/20 dark:text-wine-light shadow-sm' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300'
              }
            `}
          >
            <item.icon className={`w-5 h-5 transition-colors ${
              isActivePath(item.path) ? 'text-wine' : 'text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-200'
            }`} />
            
            <span className={`font-medium transition-all duration-200 ${
              !isOpen && isDesktop ? 'opacity-0 w-0' : 'opacity-100'
            }`}>
              {item.label}
            </span>
            
            {item.badge && (isOpen || !isDesktop) && (
              <span className="ml-auto px-2 py-1 text-xs bg-wine text-white rounded-full">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
        <Link
          to="/"
          className="group flex items-center space-x-3 px-3 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className={`font-medium transition-all duration-200 ${
            !isOpen && isDesktop ? 'opacity-0 w-0' : 'opacity-100'
          }`}>
            Sair
          </span>
        </Link>
      </div>
    </div>
  );

  // Mobile: Sheet (slide from left)
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="w-72 p-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
          <SheetHeader className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
            <SheetTitle className="text-wine dark:text-white">Menu</SheetTitle>
          </SheetHeader>
          <SidebarContent />
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: Fixed sidebar
  return (
    <aside className={`
      fixed top-16 left-0 z-40 h-[calc(100vh-4rem)]
      bg-white/95 dark:bg-gray-900/95 backdrop-blur-md
      border-r border-gray-200/50 dark:border-gray-700/50
      transition-all duration-300 ease-in-out
      ${isOpen ? 'w-72' : 'w-20'}
    `}>
      <SidebarContent />
    </aside>
  );
};

export default AdminSidebar;
