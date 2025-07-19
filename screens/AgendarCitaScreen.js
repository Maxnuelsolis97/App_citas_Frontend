import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { obtenerEspecialidades } from '../services/especialidadService'; // ✅ Corrección aquí
import citaService from '../services/citaService';


const AgendarCitaScreen = () => {
  const [especialidades, setEspecialidades] = useState([]);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState('');
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);
  const [mostrarPickerFecha, setMostrarPickerFecha] = useState(false);
  const [mostrarPickerHora, setMostrarPickerHora] = useState(false);

  useEffect(() => {
    const cargarEspecialidades = async () => {
      try {
        const data = await obtenerEspecialidades();
        setEspecialidades(data || []);
      } catch (error) {
        console.error('Error al cargar especialidades:', error);
        Alert.alert('Error', 'No se pudieron cargar las especialidades');
      }
    };
    cargarEspecialidades();
  }, []);

  const mostrarFechaPicker = () => setMostrarPickerFecha(true);
  const mostrarHoraPicker = () => setMostrarPickerHora(true);

  const onChangeFecha = (event, selectedDate) => {
    setMostrarPickerFecha(Platform.OS === 'ios');
    if (selectedDate) {
      setFechaSeleccionada(selectedDate);
    }
  };

  const onChangeHora = (event, selectedTime) => {
    setMostrarPickerHora(Platform.OS === 'ios');
    if (selectedTime) {
      setHoraSeleccionada(selectedTime);
    }
  };

  const formatearHora = (date) => {
    if (!date) return '';
    const hora = date.getHours().toString().padStart(2, '0');
    const minutos = date.getMinutes().toString().padStart(2, '0');
    return `${hora}:${minutos}`;
  };

  const handleAgendarCita = async () => {
    if (!especialidadSeleccionada || !fechaSeleccionada || !horaSeleccionada) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    try {
      const fechaISO = fechaSeleccionada.toISOString().split('T')[0]; // yyyy-mm-dd
      const horaFormateada = formatearHora(horaSeleccionada); // HH:mm

      await citaService.agendarCita({
      fecha: fechaISO,
      hora: horaFormateada,
      especialidad: especialidadSeleccionada,
      });


      Alert.alert('Éxito', 'Cita agendada correctamente');
    } catch (error) {
      console.error('Error al agendar cita:', error);
      Alert.alert('Error', 'No se pudo agendar la cita');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Especialidad</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={especialidadSeleccionada}
          onValueChange={(itemValue) => setEspecialidadSeleccionada(itemValue)}
        >
          <Picker.Item label="Selecciona una especialidad" value="" />
          {Array.isArray(especialidades) &&
            especialidades.map((esp) => (
              <Picker.Item key={esp.id} label={esp.nombre} value={esp.id} />
            ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.buttonDisabled} onPress={mostrarFechaPicker}>
        <Text style={styles.buttonText}>
          {fechaSeleccionada ? fechaSeleccionada.toDateString() : 'Seleccionar Fecha'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonDisabled} onPress={mostrarHoraPicker}>
        <Text style={styles.buttonText}>
          {horaSeleccionada ? formatearHora(horaSeleccionada) : 'Seleccionar Hora'}
        </Text>
      </TouchableOpacity>

      {mostrarPickerFecha && (
        <DateTimePicker
          value={fechaSeleccionada || new Date()}
          mode="date"
          display="default"
          onChange={onChangeFecha}
        />
      )}

      {mostrarPickerHora && (
        <DateTimePicker
          value={horaSeleccionada || new Date()}
          mode="time"
          display="default"
          onChange={onChangeHora}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleAgendarCita}>
        <Text style={styles.buttonText}>Agendar Cita</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    borderRadius: 5,
  },
  buttonDisabled: {
    backgroundColor: '#ddd',
    padding: 12,
    marginBottom: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AgendarCitaScreen;
