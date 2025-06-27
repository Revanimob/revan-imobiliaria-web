
import { useState, useEffect } from 'react';

export const useAdminTheme = () => {
  const [adminTheme, setAdminTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedAdminTheme = localStorage.getItem('admin-theme') as 'light' | 'dark' | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedAdminTheme || systemTheme;
    
    setAdminTheme(initialTheme);
    
    // Apply theme class to document body for admin-specific styling
    document.body.classList.remove('admin-dark', 'admin-light');
    document.body.classList.add(`admin-${initialTheme}`);
  }, []);

  const toggleAdminTheme = () => {
    const newTheme = adminTheme === 'light' ? 'dark' : 'light';
    setAdminTheme(newTheme);
    localStorage.setItem('admin-theme', newTheme);
    
    // Update body class for admin-specific theming
    document.body.classList.remove('admin-dark', 'admin-light');
    document.body.classList.add(`admin-${newTheme}`);
  };

  return { adminTheme, toggleAdminTheme };
};
