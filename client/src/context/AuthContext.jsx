import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { trackEvent } from '../services/analytics';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('lendkart_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const storedToken = localStorage.getItem('lendkart_token');
      if (storedToken) {
        try {
          const res = await api.get('/auth/me');
          if (res.data.success) {
            setUser(res.data.user);
          }
        } catch (err) {
          console.warn('Session expired or invalid token');
          localStorage.removeItem('lendkart_token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.data.success) {
      localStorage.setItem('lendkart_token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      trackEvent('login', { method: 'email' });
      return res.data;
    }
  };

  const register = async (formData) => {
    const res = await api.post('/auth/register', formData);
    if (res.data.success) {
      localStorage.setItem('lendkart_token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      trackEvent('register', { method: 'email' });
      return res.data;
    }
  };

  const logout = () => {
    localStorage.removeItem('lendkart_token');
    setToken(null);
    setUser(null);
  };

  const updateProfile = async (formData) => {
    const res = await api.put('/auth/profile', formData);
    if (res.data.success) {
      setUser(res.data.user);
      return res.data.user;
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
