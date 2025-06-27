
import React from 'react';
import { Heart } from 'lucide-react';

const AdminFooter = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <div className="px-4 lg:px-6 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            © 2024 REVAN Imobiliária. Todos os direitos reservados.
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
            <span>Feito com</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>pela equipe REVAN</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
