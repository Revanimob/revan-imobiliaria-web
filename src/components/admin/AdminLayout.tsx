
import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import AdminFooter from './AdminFooter';
import { useResponsive } from '@/hooks/useResponsive';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isMobile, isDesktop } = useResponsive();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 transition-all duration-300">
      <AdminNavbar onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      
      <div className="flex">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* Main Content */}
        <main className={`
          flex-1 pt-16 transition-all duration-300 min-h-screen flex flex-col
          ${isDesktop && sidebarOpen ? 'lg:ml-72' : isDesktop ? 'lg:ml-20' : 'ml-0'}
        `}>
          <div className="flex-1 p-4 lg:p-6 max-w-full overflow-hidden">
            {children}
          </div>
          <AdminFooter />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
