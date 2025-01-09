import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { loginService } from '../lib/auth';

interface UserInfo {
  username: string;
  email: string;
  given_name: string;
  family_name: string;
  expires_in: number;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: UserInfo | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      const decodedUser = decodeToken(token);
      setUser(decodedUser);
      setIsAuthenticated(!!token);
      setAccessToken(token);
    }
  }, []);

  const login = async (username: string, password: string) => {
    await loginService(username, password);
    const token = Cookies.get('access_token');
    const decodedUser = decodeToken(token || '');
    setUser(decodedUser);
    setIsAuthenticated(!!token);
    setAccessToken(token || null);
  };

  const logout = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    setIsAuthenticated(false);
    setUser(null);
    setAccessToken(null);
  };

  const decodeToken = (token: string): UserInfo | null => {
    try {
      const decoded: any = jwtDecode(token); // Decodes JWT to extract user info
      return {
        username: decoded.preferred_username || '',
        email: decoded.email || '',
        given_name: decoded.given_name || '',
        family_name: decoded.family_name || '',
        expires_in: decoded.exp || 0,
        role: decoded.resource_access['nest-client'].roles[0],
      };
    } catch (error) {
      console.error('Token decoding failed:', error);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, accessToken, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
