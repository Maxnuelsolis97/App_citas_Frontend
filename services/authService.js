import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 🔐 Iniciar sesión
export const login = async ({ correo, contrasena }) => {
  const response = await api.post('/auth/login', { correo, contrasena: contrasena });
  const token = response.data.token;
  await AsyncStorage.setItem('token', token);
  return response.data.user;
};

// 📝 Registrar nuevo usuario
export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    // Esto imprimirá el error en la consola y lo enviará de vuelta al frontend
    console.error('Error al registrar (frontend):', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || 'Ocurrió un error');
  }
};

// 🚪 Cerrar sesión
export const logout = async () => {
  await AsyncStorage.removeItem('token');
};
