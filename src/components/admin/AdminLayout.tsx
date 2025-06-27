
import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import { useResponsive } from '@/hooks/useResponsive';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isMobile } = useResponsive();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <AdminNavbar onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      
      <div className="flex">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* Main Content */}
        <main className={`
          flex-1 pt-16 transition-all duration-300
          ${sidebarOpen && !isMobile ? 'lg:ml-72' : 'lg:ml-20'}
          ${isMobile ? 'ml-0' : ''}
        `}>
          <div className="p-6 max-w-full overflow-hidden">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
