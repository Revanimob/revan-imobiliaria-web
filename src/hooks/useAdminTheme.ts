
import { useState, useEffect } from 'react';

export const useAdminTheme = () => {
  const [adminTheme, setAdminTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedAdminTheme = localStorage.getItem('admin-theme') as 'light' | 'dark' | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedAdminTheme || systemTheme;
    
    setAdminTheme(initialTheme);
  }, []);

  const toggleAdminTheme = () => {
    const newTheme = adminTheme === 'light' ? 'dark' : 'light';
    setAdminTheme(newTheme);
    localStorage.setItem('admin-theme', newTheme);
  };

  return { adminTheme, toggleAdminTheme };
};
