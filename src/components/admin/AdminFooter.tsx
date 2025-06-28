
import React from 'react';
import { Heart } from 'lucide-react';
import { useAdminTheme } from '@/hooks/useAdminTheme';

const AdminFooter = () => {
  const { adminTheme } = useAdminTheme();

  return (
    <footer className={`border-t backdrop-blur-sm ${
      adminTheme === 'dark'
        ? 'border-gray-700 bg-gray-900/50'
        : 'border-gray-200 bg-white/50'
    }`}>
      <div className="px-4 lg:px-6 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <div className={`text-sm ${
            adminTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            © 2024 REVAN Imobiliária. Todos os direitos reservados.
          </div>
          <div className={`flex items-center space-x-1 text-sm ${
            adminTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <span>Feito com</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>por QuedSoft</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
