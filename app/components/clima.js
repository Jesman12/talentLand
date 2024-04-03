import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Aquí debes realizar la petición a tu backend para obtener los datos meteorológicos
    // Reemplaza la siguiente URL con la URL de tu backend
    fetch('https://domint.com.mx/api/v1/sensor/?action=getClima')
      .then(response => response.json())
      .then(data => setWeatherData(data))
      .catch(error => console.error('Error fetching weather data:', error));
  }, []);

  if (!weatherData) {
    return <Text>Cargando...</Text>;
  }

  const { tmin, tmax, desciel } = weatherData[0];

  return (
    <View style={styles.card}>
      <View style={styles.column}>
        <Text style={styles.text}>Mín: {parseInt(tmin)}°C</Text>
        <Text style={styles.text}>Máx: {parseInt(tmax)}°C</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.text}>{desciel}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row', // Distribuir elementos en filas
    justifyContent: 'space-between', // Distribuir espacio entre elementos
  },
  column: {
    flex: 1, // Ocupar todo el espacio disponible en la fila
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default WeatherWidget;
