import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { register } from '../services/authService';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [dni, setDni] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [celular, setcelular] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!dni || !nombres || !apellidos || !celular || !correo || !contrasena) {
      Alert.alert('Campos incompletos', 'Por favor, completa todos los campos.');
      return;
    }

    setLoading(true);
    try {
      await register({ dni, nombres, apellidos, celular, correo, contrasena });
      Alert.alert('Registro exitoso', 'Tu cuenta ha sido creada.', [
        { text: 'OK', onPress: () => navigation.replace('Login') }
      ]);
    } catch (error) {
      console.log('Error al registrar (frontend):', error.response?.data || error.message);
      Alert.alert('Error al registrar', error.response?.data?.message || 'Ocurrió un error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>

      <TextInput style={styles.input} placeholder="DNI" value={dni} onChangeText={setDni} />
      <TextInput style={styles.input} placeholder="Nombres" value={nombres} onChangeText={setNombres} />
      <TextInput style={styles.input} placeholder="Apellidos" value={apellidos} onChangeText={setApellidos} />
      <TextInput style={styles.input} placeholder="Teléfono" value={celular} onChangeText={setcelular} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Correo" value={correo} onChangeText={setCorreo} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Contrasena" value={contrasena} onChangeText={setContrasena} secureTextEntry />

      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>{loading ? 'Registrando...' : 'Registrarse'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 12 },
  button: { backgroundColor: '#34C759', padding: 15, borderRadius: 8, marginTop: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  loginLink: { marginTop: 20, textAlign: 'center', color: '#007AFF' },
});

export default RegisterScreen;
