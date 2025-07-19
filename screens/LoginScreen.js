import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { login } from '../services/authService';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!correo || !contrasena) {
      Alert.alert('Campos incompletos', 'Por favor, completa todos los campos.');
      return;
    }

    setLoading(true);
    try {
      const response = await login({
        correo: correo.trim(),
        contrasena: contrasena.trim()
      });

      Alert.alert('Inicio de sesión exitoso');
      navigation.replace('Home');

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error de inicio de sesión', error?.response?.data?.error || 'Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.hospitalTitle}>HOSPITAL REGIONAL DE AYACUCHO</Text>
      <Text style={styles.subtitle}>Miguel A. Mariscal Llerena</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo"
        keyboardType="email-address"
        autoCapitalize="none"
        value={correo}
        onChangeText={setCorreo}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={contrasena}
        onChangeText={setContrasena}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>
          {loading ? 'Ingresando...' : 'Ingresar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
        <Text style={styles.registerLink}>¿No tienes cuenta? Regístrate aquí</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  hospitalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#670155',
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#a70589ff',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#b31696ff',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  registerLink: {
    marginTop: 20,
    textAlign: 'center',
    color: '#007AFF',
  },
});

export default LoginScreen;
