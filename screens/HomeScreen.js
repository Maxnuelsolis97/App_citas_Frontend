import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          navigation.replace('Login');
          return;
        }

        const response = await api.get('/auth/user');
        setUser(response.data);
      } catch (error) {
        Alert.alert('Error', 'No se pudo cargar la información del usuario');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const cerrarSesion = async () => {
    await AsyncStorage.removeItem('token');
    navigation.replace('Login');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Bienvenido, {user?.nombres || 'Usuario'}
      </Text>

      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate('Agendar Cita')}
      >
        <Text style={styles.textoBoton}>Agendar Cita</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate('Ver Cita')}
      >
        <Text style={styles.textoBoton}>Ver Cita</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate('Postergar Cita')}
      >
        <Text style={styles.textoBoton}>Postergar Cita</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate('Cancelar Cita')}
      >
        <Text style={styles.textoBoton}>Cancelar Cita</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.boton, { backgroundColor: '#FF3B30', marginTop: 30 }]}
        onPress={cerrarSesion}
      >
        <Text style={styles.textoBoton}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  boton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
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
});

export default HomeScreen;
