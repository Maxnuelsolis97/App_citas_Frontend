import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import citaService from '../services/citaService';

const CancelarCitaScreen = ({ navigation }) => {
  const handleCancelarCita = async () => {
    try {
      const response = await citaService.cancelarCitaActiva();

      if (response?.status === 200) {
        Alert.alert('Éxito', 'Cita cancelada correctamente', [
          { text: 'OK', onPress: () => navigation.navigate('Inicio') }
        ]);
      } else {
        Alert.alert('Advertencia', 'La cita fue cancelada, pero hubo una respuesta inesperada.');
      }

    } catch (error) {
      console.error('Error al cancelar cita:', error);
      const mensaje = error.response?.data?.message || error.message || 'No se pudo cancelar la cita';
      Alert.alert('Error', mensaje);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>¿Estás seguro que deseas cancelar tu cita activa?</Text>
      <TouchableOpacity style={styles.button} onPress={handleCancelarCita}>
        <Text style={styles.buttonText}>Sí, Cancelar Cita</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CancelarCitaScreen;
