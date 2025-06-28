import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  email: string;
  accessToken: string;
  refreshToken: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('access_token');
    const storedRefreshToken = localStorage.getItem('refresh_token');
    const storedUser = localStorage.getItem('admin_user');

    if (storedAccessToken && storedRefreshToken && storedUser) {
      setUser({
        email: JSON.parse(storedUser).email,
        accessToken: storedAccessToken,
        refreshToken: storedRefreshToken,
      });
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('access_token', userData.accessToken);
    localStorage.setItem('refresh_token', userData.refreshToken);
    localStorage.setItem('admin_user', JSON.stringify({ email: userData.email }));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('admin_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
