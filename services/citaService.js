import api from './api';

const agendarCita = ({ fecha, hora, especialidad }) => {
  return api.post('/citas', { fecha, hora, especialidad });
};

const obtenerCitaActiva = () => {
  return api.get('/citas/proxima');
};

const cancelarCitaActiva = () => {
  return api.post('/citas/cancelar');
};

const solicitarPostergacion = ({ motivo }) => {
  return api.post('/solicitudes/postergacion', { motivo });
};

export default {
  agendarCita,
  obtenerCitaActiva,
  cancelarCitaActiva,
  solicitarPostergacion
};
