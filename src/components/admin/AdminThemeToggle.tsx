
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useAdminTheme } from '@/hooks/useAdminTheme';

const AdminThemeToggle = () => {
  const { adminTheme, toggleAdminTheme } = useAdminTheme();

  return (
    <button
      onClick={toggleAdminTheme}
      className="relative inline-flex items-center h-8 w-14 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-wine focus:ring-offset-2"
      aria-label="Toggle admin theme"
    >
      <span
        className={`inline-block w-6 h-6 transform bg-white dark:bg-gray-800 rounded-full shadow-lg transition-transform duration-300 ${
          adminTheme === 'dark' ? 'translate-x-7' : 'translate-x-1'
        }`}
      >
        <div className="flex items-center justify-center w-full h-full">
          {adminTheme === 'light' ? (
            <Sun className="w-3 h-3 text-yellow-500" />
          ) : (
            <Moon className="w-3 h-3 text-blue-400" />
          )}
        </div>
      </span>
    </button>
  );
};

export default AdminThemeToggle;
