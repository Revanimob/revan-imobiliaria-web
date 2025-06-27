
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

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSidebar = ({ isOpen, onClose }: AdminSidebarProps) => {
  const location = useLocation();
  const { isMobile } = useResponsive();

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

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 z-50 h-[calc(100vh-4rem)]
        bg-white/80 dark:bg-gray-900/80 backdrop-blur-md
        border-r border-gray-200/50 dark:border-gray-700/50
        transition-all duration-300 ease-in-out
        ${isOpen ? 'w-72 translate-x-0' : 'w-20 -translate-x-full lg:translate-x-0'}
        lg:relative lg:top-0 lg:h-screen
      `}>
        <div className="flex flex-col h-full">
          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={isMobile ? onClose : undefined}
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
                  !isOpen && !isMobile ? 'opacity-0 w-0' : 'opacity-100'
                }`}>
                  {item.label}
                </span>
                
                {item.badge && isOpen && (
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
                !isOpen && !isMobile ? 'opacity-0 w-0' : 'opacity-100'
              }`}>
                Sair
              </span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
