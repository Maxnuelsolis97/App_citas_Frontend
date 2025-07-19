import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AgendarCitaScreen from './screens/AgendarCitaScreen';
import VerCitaScreen from './screens/VerCitaScreen';
import PostergarCitaScreen from './screens/PostergarCitaScreen';
import CancelarCitaScreen from './screens/CancelarCitaScreen';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        
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

        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Inicio' }} 
        />

        <Stack.Screen 
          name="Agendar Cita" 
          component={AgendarCitaScreen} 
          options={{ title: 'Agendar cita' }} 
        />

        <Stack.Screen 
          name="Ver Cita" 
          component={VerCitaScreen} 
          options={{ title: 'Mis citas' }} 
        />

        <Stack.Screen 
          name="Postergar Cita" 
          component={PostergarCitaScreen} 
          options={{ title: 'Reprogramar cita' }} 
        />

        <Stack.Screen 
          name="Cancelar Cita" 
          component={CancelarCitaScreen} 
          options={{ title: 'Cancelar cita' }} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
