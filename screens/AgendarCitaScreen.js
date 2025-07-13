import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { agendarCita } from '../services/citaService';

const AgendarCitaScreen = ({ navigation }) => {
  const [especialidad, setEspecialidad] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [motivo, setMotivo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const handleSubmit = async () => {
    if (!especialidad || !motivo) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    setLoading(true);
    try {
      await agendarCita({
        especialidadId: especialidad,
        fecha: date.toISOString(),
        motivo
      });
      Alert.alert('Éxito', 'Cita agendada correctamente', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo agendar la cita');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Agendar Nueva Cita</Text>

      <Text style={styles.label}>Especialidad:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Cardiología"
        value={especialidad}
        onChangeText={setEspecialidad}
      />

      <Text style={styles.label}>Fecha y Hora:</Text>
      <TouchableOpacity 
        style={styles.dateButton} 
        onPress={() => setShowDatePicker(true)}
      >
        <Text>{date.toLocaleString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Motivo:</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        multiline
        numberOfLines={4}
        placeholder="Describa el motivo de la consulta"
        value={motivo}
        onChangeText={setMotivo}
      />

      <TouchableOpacity 
        style={[styles.button, loading && styles.disabledButton]} 
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Agendando...' : 'Confirmar Cita'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top'
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center'
  },
  disabledButton: {
    opacity: 0.6
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default AgendarCitaScreen;