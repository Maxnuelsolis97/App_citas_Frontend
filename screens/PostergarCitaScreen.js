import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../services/api';

const PostergarCitaScreen = ({ route, navigation }) => {
  const { citaId } = route.params;
  const [cita, setCita] = useState(null);
  const [newDate, setNewDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  // Cargar datos de la cita
  useEffect(() => {
    const fetchCita = async () => {
      try {
        const response = await api.get(`/citas/${citaId}`);
        setCita(response.data);
        setNewDate(parseISO(response.data.fecha));
      } catch (error) {
        Alert.alert('Error', 'No se pudo cargar la cita');
        navigation.goBack();
      }
    };
    fetchCita();
  }, [citaId]);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setNewDate(selectedDate);
    }
  };

  const handlePostergar = async () => {
    if (newDate <= new Date()) {
      Alert.alert('Error', 'La nueva fecha debe ser futura');
      return;
    }

    setLoading(true);
    try {
      await api.patch(`/citas/${citaId}`, {
        fecha: newDate.toISOString(),
        estado: 'reprogramada' // Ajusta según tu modelo
      });
      Alert.alert('Éxito', 'Cita reprogramada correctamente', [
        { text: 'OK', onPress: () => navigation.replace('VerCita') }
      ]);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Error al reprogramar');
    } finally {
      setLoading(false);
    }
  };

  if (!cita) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando información de la cita...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Reprogramar Cita</Text>

      <View style={styles.card}>
        <View style={styles.infoRow}>
          <Icon name="medical-services" size={20} color="#007AFF" />
          <Text style={styles.infoText}>{cita.especialidad.nombre}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="calendar-today" size={20} color="#007AFF" />
          <Text style={styles.infoText}>
            Fecha actual: {format(parseISO(cita.fecha), "PPPp", { locale: es })}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="notes" size={20} color="#007AFF" />
          <Text style={styles.infoText}>Motivo: {cita.motivo}</Text>
        </View>
      </View>

      <Text style={styles.subtitle}>Selecciona nueva fecha y hora:</Text>

      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Icon name="edit-calendar" size={24} color="#555" />
        <Text style={styles.dateText}>
          {format(newDate, "PPPp", { locale: es })}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={newDate}
          mode="datetime"
          minimumDate={new Date()}
          onChange={handleDateChange}
        />
      )}

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handlePostergar}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Procesando...' : 'Confirmar Reprogramación'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 15,
    color: '#555'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  infoText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#555'
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20
  },
  dateText: {
    marginLeft: 10,
    fontSize: 15
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonDisabled: {
    opacity: 0.6
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default PostergarCitaScreen;