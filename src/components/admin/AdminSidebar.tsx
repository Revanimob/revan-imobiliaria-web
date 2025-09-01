import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Home,
  BarChart3,
  Settings,
  LogOut,
  MessageSquare,
  Bell,
  BookOpen,
} from "lucide-react";
import { useResponsive } from "@/hooks/useResponsive";
import { useAdminTheme } from "@/hooks/useAdminTheme";
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
  const { adminTheme } = useAdminTheme();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/admin/dashboard",
      badge: null,
    },
    {
      icon: Users,
      label: "Administradores",
      path: "/admin/users",
      badge: "3",
    },
    {
      icon: Home,
      label: "Imóveis",
      path: "/admin/properties",
      badge: null,
    },
    {
      icon: BookOpen,
      label: "Blog",
      path: "/admin/blog",
      badge: null,
    },
    // {
    //   icon: BarChart3,
    //   label: "Relatórios",
    //   path: "/admin/reports",
    //   badge: null,
    // },
    // {
    //   icon: MessageSquare,
    //   label: 'Mensagens',
    //   path: '/admin/messages',
    //   badge: '12'
    // },
    // {
    //   icon: Settings,
    //   label: "Configurações",
    //   path: "/admin/settings",
    //   badge: null,
    // },
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
              ${
                isActivePath(item.path)
                  ? `${
                      adminTheme === "dark"
                        ? "bg-wine/20 text-wine-light"
                        : "bg-wine/10 text-wine"
                    } shadow-sm`
                  : `${
                      adminTheme === "dark"
                        ? "hover:bg-gray-800/50 text-gray-300"
                        : "hover:bg-gray-100 text-gray-700"
                    }`
              }
            `}
          >
            <item.icon
              className={`w-5 h-5 transition-colors ${
                isActivePath(item.path)
                  ? "text-wine"
                  : `${
                      adminTheme === "dark"
                        ? "text-gray-500 group-hover:text-gray-200"
                        : "text-gray-500 group-hover:text-gray-700"
                    }`
              }`}
            />

            <span
              className={`font-medium transition-all duration-200 ${
                !isOpen && isDesktop ? "opacity-0 w-0" : "opacity-100"
              }`}
            >
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
      <div
        className={`p-4 border-t ${
          adminTheme === "dark" ? "border-gray-700/50" : "border-gray-200/50"
        }`}
      >
        <Link
          to="/"
          className={`group flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 ${
            adminTheme === "dark"
              ? "hover:bg-red-900/20 text-gray-300 hover:text-red-400"
              : "hover:bg-red-50 text-gray-700 hover:text-red-600"
          }`}
        >
          <LogOut className="w-5 h-5" />
          <span
            className={`font-medium transition-all duration-200 ${
              !isOpen && isDesktop ? "opacity-0 w-0" : "opacity-100"
            }`}
          >
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
        <SheetContent
          side="left"
          className={`w-72 p-0 backdrop-blur-md ${
            adminTheme === "dark" ? "bg-gray-900/95" : "bg-white/95"
          }`}
        >
          <SheetHeader
            className={`p-4 border-b ${
              adminTheme === "dark"
                ? "border-gray-700/50"
                : "border-gray-200/50"
            }`}
          >
            <SheetTitle
              className={adminTheme === "dark" ? "text-white" : "text-wine"}
            >
              Menu
            </SheetTitle>
          </SheetHeader>
          <SidebarContent />
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: Fixed sidebar
  return (
    <aside
      className={`
      fixed top-16 left-0 z-40 h-[calc(100vh-4rem)]
      backdrop-blur-md border-r transition-all duration-300 ease-in-out
      ${
        adminTheme === "dark"
          ? "bg-gray-900/95 border-gray-700/50"
          : "bg-white/95 border-gray-200/50"
      }
      ${isOpen ? "w-72" : "w-20"}
    `}
    >
      <SidebarContent />
    </aside>
  );
};

export default AdminSidebar;
