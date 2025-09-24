import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('authToken');
      const storedUser = await AsyncStorage.getItem('userData');
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      const { token: authToken, user: userData } = data;
      await AsyncStorage.setItem('authToken', authToken);
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      setToken(authToken);
      setUser(userData);
      return { success: true, data };
    } catch (error) {
      const message = error?.response?.data?.message || 'Login failed';
      return { success: false, error: message };
    }
  };

  const register = async (email, password) => {
    try {
      const { data } = await api.post('/api/auth/register', { email, password });
      return { success: true, data };
    } catch (error) {
      const message = error?.response?.data?.message || 'Registration failed';
      return { success: false, error: message };
    }
  };

  const verifyOTP = async (email, otp) => {
    try {
      const { data } = await api.post('/api/auth/verify-otp', { email, otp });
      const { token: authToken, user: userData } = data;
      await AsyncStorage.setItem('authToken', authToken);
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      setToken(authToken);
      setUser(userData);
      return { success: true, data };
    } catch (error) {
      const message = error?.response?.data?.message || 'OTP verification failed';
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userData');
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    register,
    verifyOTP,
    logout,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
