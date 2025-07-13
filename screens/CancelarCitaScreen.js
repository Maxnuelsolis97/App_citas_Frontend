import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import api from '../services/api';

const CancelarCitaScreen = ({ route, navigation }) => {
  const { citaId } = route.params;
  const [loading, setLoading] = useState(false);

  const handleCancelar = async () => {
    setLoading(true);
    try {
      // Prueba primero con DELETE, si falla intenta con PUT/PATCH
      try {
        await api.delete(`/citas/${citaId}`);
      } catch (error) {
        // Fallback: Si DELETE no funciona, intenta actualizar el estado
        await api.patch(`/citas/${citaId}`, { estado: 'cancelada' });
      }
      Alert.alert('Éxito', 'Cita cancelada');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Error al cancelar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Cancelar esta cita?</Text>
      
      <Text style={styles.warning}>
        Esta acción no se puede deshacer
      </Text>

      <TouchableOpacity 
        style={[styles.button, styles.cancelButton]}
        onPress={handleCancelar}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Cancelando...' : 'Confirmar Cancelación'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.backButton]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  warning: {
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 16
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15
  },
  cancelButton: {
    backgroundColor: '#FF3B30'
  },
  backButton: {
    backgroundColor: '#007AFF'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default CancelarCitaScreen;