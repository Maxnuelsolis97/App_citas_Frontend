import api from './api';

export const getCitas = async () => {
  const response = await api.get('/citas');
  return response.data; 
};

export const agendarCita = (citaData) => {
  return api.post('/citas', citaData); 
};

export const postergarCita = (id, nuevaFecha) => {
  return api.patch(`/citas/${id}`, { fecha: nuevaFecha });
};

export const cancelarCita = (id) => {
  // Intenta con DELETE primero, si falla usa PATCH
  try {
    return api.delete(`/citas/${id}`);
  } catch (error) {
    return api.patch(`/citas/${id}`, { estado: 'cancelada' });
  }
};