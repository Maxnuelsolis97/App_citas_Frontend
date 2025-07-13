import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importa todas las pantallas
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AgendarCitaScreen from './screens/AgendarCitaScreen';
import VerCitaScreen from './screens/VerCitaScreen';
import PostergarCitaScreen from './screens/PostergarCitaScreen';
import CancelarCitaScreen from './screens/CancelarCitaScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const handleLogout = async (navigation) => {
    await AsyncStorage.removeItem('token');
    navigation.replace('Login');
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {/* Pantallas de autenticación */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Registro" 
          component={RegisterScreen} 
          options={{ title: 'Crear cuenta' }} 
        />

        {/* Pantallas principales (requieren autenticación) */}
        <Stack.Screen 
          name="Inicio" 
          component={HomeScreen} 
          options={({ navigation }) => ({
            title: 'Inicio',
            headerRight: () => (
              <TouchableOpacity 
                onPress={() => handleLogout(navigation)}
                style={{ marginRight: 15 }}
              >
                <Icon name="logout" size={24} color="#fff" />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen 
          name="AgendarCita" 
          component={AgendarCitaScreen} 
          options={{ title: 'Agendar cita' }} 
        />

        <Stack.Screen 
          name="VerCita" 
          component={VerCitaScreen} 
          options={{ title: 'Mis citas' }} 
        />

        <Stack.Screen 
          name="PostergarCita" 
          component={PostergarCitaScreen} 
          options={{ title: 'Reprogramar cita' }} 
        />

        <Stack.Screen 
          name="CancelarCita" 
          component={CancelarCitaScreen} 
          options={{ title: 'Cancelar cita' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;