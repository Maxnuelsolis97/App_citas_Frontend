import React from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export default function RegisterScreen({ navigation }) {
  const registerSchema = Yup.object().shape({
    dni: Yup.string().length(8, 'Debe tener 8 dígitos').required('Requerido'),
    nombres: Yup.string().required('Requerido'),
    apellidos: Yup.string().required('Requerido'),
    celular: Yup.string().length(9, 'Debe tener 9 dígitos').required('Requerido'),
    correo: Yup.string().email('Correo inválido').required('Requerido'),
    contraseña: Yup.string().min(6, 'Mínimo 6 caracteres').required('Requerido'),
  });

  const handleRegister = async (values, { resetForm }) => {
    try {
      const response = await axios.post('http://10.0.2.2:3000/usuarios', values);
      
      if (response.status === 201 || response.status === 200) {
        Alert.alert('✅ Registro exitoso', 'Ahora puedes iniciar sesión');
        resetForm();
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', 'No se pudo registrar el usuario');
        console.log('Respuesta inesperada:', response);
      }
    } catch (error) {
      console.log(error?.response?.data || error.message);
      Alert.alert('Error', 'No se pudo registrar el usuario');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro de Usuario</Text>
      <Formik
        initialValues={{
          dni: '',
          nombres: '',
          apellidos: '',
          celular: '',
          correo: '',
          contraseña: '',
        }}
        validationSchema={registerSchema}
        onSubmit={handleRegister}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              placeholder="DNI"
              style={styles.input}
              keyboardType="number-pad"
              onChangeText={handleChange('dni')}
              onBlur={handleBlur('dni')}
              value={values.dni}
            />
            {touched.dni && errors.dni && <Text style={styles.error}>{errors.dni}</Text>}

            <TextInput
              placeholder="Nombres"
              style={styles.input}
              onChangeText={handleChange('nombres')}
              onBlur={handleBlur('nombres')}
              value={values.nombres}
            />
            {touched.nombres && errors.nombres && <Text style={styles.error}>{errors.nombres}</Text>}

            <TextInput
              placeholder="Apellidos"
              style={styles.input}
              onChangeText={handleChange('apellidos')}
              onBlur={handleBlur('apellidos')}
              value={values.apellidos}
            />
            {touched.apellidos && errors.apellidos && <Text style={styles.error}>{errors.apellidos}</Text>}

            <TextInput
              placeholder="Celular"
              style={styles.input}
              keyboardType="phone-pad"
              onChangeText={handleChange('celular')}
              onBlur={handleBlur('celular')}
              value={values.celular}
            />
            {touched.celular && errors.celular && <Text style={styles.error}>{errors.celular}</Text>}

            <TextInput
              placeholder="Correo"
              style={styles.input}
              keyboardType="email-address"
              onChangeText={handleChange('correo')}
              onBlur={handleBlur('correo')}
              value={values.correo}
            />
            {touched.correo && errors.correo && <Text style={styles.error}>{errors.correo}</Text>}

            <TextInput
              placeholder="Contraseña"
              style={styles.input}
              secureTextEntry
              onChangeText={handleChange('contraseña')}
              onBlur={handleBlur('contraseña')}
              value={values.contraseña}
            />
            {touched.contraseña && errors.contraseña && <Text style={styles.error}>{errors.contraseña}</Text>}

            <Button title="Registrar" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 },
  error: { color: 'red', marginBottom: 5 },
});
