import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { 
    correo: email, 
    password 
  });
  await AsyncStorage.setItem('token', response.data.token);
  return response.data.user;
};

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const logout = async () => {
  await AsyncStorage.removeItem('token');
};