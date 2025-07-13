import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Configuración básica de Axios
const api = axios.create({
  baseURL: 'http://10.0.2.2:3000', // Reemplaza con tu IP si pruebas en dispositivo físico
  timeout: 10000, // 10 segundos máximo de espera
  headers: {
    'Content-Type': 'application/json',
  }
});

// 2. Interceptor para añadir token automáticamente
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 3. Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expirado o inválido
      AsyncStorage.removeItem('token');
      // Opcional: Redirigir al login (necesitarás acceso al navigation)
    }
    return Promise.reject(error);
  }
);

export default api;