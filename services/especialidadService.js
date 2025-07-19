import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.0.2.2:3000/especialidades';

export const obtenerEspecialidades = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al cargar especialidades:', error);
    throw error;
  }
};
