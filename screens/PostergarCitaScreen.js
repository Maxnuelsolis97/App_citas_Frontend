import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { solicitarPostergacion, obtenerCitaActiva } from '../services/citaService';

const PostergarCitaScreen = ({ navigation }) => {
  const [motivo, setMotivo] = useState('');
  const [cita, setCita] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    const fetchCita = async () => {
      try {
        const response = await obtenerCitaActiva();
        setCita(response.data);
      } catch (error) {
        Alert.alert('Error', 'No se pudo cargar la cita activa');
      } finally {
        setLoading(false);
      }
    };

    fetchCita();
  }, []);

  const handleSubmit = async () => {
    if (!motivo || motivo.trim().length === 0) {
      return Alert.alert('Error', 'El motivo no puede estar vacío');
    }

    if (motivo.length > 200) {
      return Alert.alert('Error', 'El motivo no puede exceder los 200 caracteres');
    }

    setEnviando(true);

    try {
      await solicitarPostergacion({ motivo });
      Alert.alert('Éxito', 'Solicitud de postergación enviada', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        },
      ]);
    } catch (error) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'No se pudo enviar la solicitud'
      );
    } finally {
      setEnviando(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!cita) {
    return (
      <View style={styles.container}>
        <Text style={styles.sinCita}>No tienes una cita activa para postergar.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Motivo de postergación</Text>

      <TextInput
        style={styles.input}
        placeholder="Escribe el motivo (máx. 200 caracteres)"
        multiline
        maxLength={200}
        value={motivo}
        onChangeText={setMotivo}
      />

      <TouchableOpacity
        style={styles.boton}
        onPress={handleSubmit}
        disabled={enviando}
      >
        <Text style={styles.textoBoton}>
          {enviando ? 'Enviando...' : 'Enviar solicitud'}
        </Text>
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
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 10,
    textAlignVertical: 'top',
    fontSize: 16,
    marginBottom: 20,
  },
  boton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sinCita: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});

export default PostergarCitaScreen;
