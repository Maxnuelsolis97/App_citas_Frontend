import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import api from '../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Instálalo con: yarn add react-native-vector-icons
import { format } from 'date-fns'; // Instálalo con: yarn add date-fns
import { es } from 'date-fns/locale'; // Para formato en español

const VerCitaScreen = ({ navigation }) => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCitas = async () => {
    try {
      const response = await api.get('/citas'); // Ajusta la ruta según tu backend
      setCitas(response.data);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Error al cargar citas');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCitas();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchCitas();
  };

  const handleCancelarCita = async (id) => {
    try {
      await api.delete(`/citas/${id}`);
      Alert.alert('Éxito', 'Cita cancelada correctamente', [
        { text: 'OK', onPress: () => fetchCitas() }
      ]);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Error al cancelar cita');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando citas...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <Text style={styles.title}>Mis Citas Agendadas</Text>

      {citas.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="event-busy" size={50} color="#ccc" />
          <Text style={styles.emptyText}>No tienes citas agendadas</Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('AgendarCita')}
          >
            <Text style={styles.buttonText}>Agendar Nueva Cita</Text>
          </TouchableOpacity>
        </View>
      ) : (
        citas.map((cita) => (
          <View key={cita.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.especialidad}>{cita.especialidad.nombre}</Text>
              <Text style={styles.estado}>{cita.estado}</Text>
            </View>
            
            <View style={styles.cardBody}>
              <View style={styles.infoRow}>
                <Icon name="calendar-today" size={18} color="#555" />
                <Text style={styles.infoText}>
                  {format(new Date(cita.fecha), "PPPp", { locale: es })}
                </Text>
              </View>
              
              <View style={styles.infoRow}>
                <Icon name="notes" size={18} color="#555" />
                <Text style={styles.infoText}>{cita.motivo}</Text>
              </View>
            </View>

            <View style={styles.cardFooter}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.postergarButton]}
                onPress={() => navigation.navigate('PostergarCita', { citaId: cita.id })}
              >
                <Text style={styles.actionButtonText}>Postergar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.actionButton, styles.cancelarButton]}
                onPress={() => handleCancelarCita(cita.id)}
              >
                <Text style={styles.actionButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    marginVertical: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
    marginBottom: 10,
  },
  especialidad: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  estado: {
    fontSize: 14,
    color: '#FF9500',
    fontWeight: '600',
  },
  cardBody: {
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#555',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  postergarButton: {
    backgroundColor: '#34C759',
  },
  cancelarButton: {
    backgroundColor: '#FF3B30',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default VerCitaScreen;