import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);

  const currentHour = new Date().getHours();
  let gradientColors = ['#ff7e5f', '#feb47b']; // Colores predeterminados (mañana)

  if (currentHour >= 12 && currentHour < 18) {
    // Tarde
    gradientColors = ['#ffac81', '#ff928b'];
  } else if (currentHour >= 18 || currentHour < 6) {
    // Noche
    gradientColors = ['#020111', '#191654'];
  }

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
    <LinearGradient
      colors={gradientColors}
      style={styles.card}
      start={[0, 0.5]}
      end={[1, 0.5]}
    >
        <View style={styles.column}>
          <Text style={styles.text}>Mín: {parseInt(tmin)}°C</Text>
          <Text style={styles.text}>Máx: {parseInt(tmax)}°C</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>{desciel}</Text>
        </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)',
    elevation: 5,
    flexDirection: 'row', // Distribuir elementos en filas
    justifyContent: 'space-between', // Distribuir espacio entre elementos
    height: '100pt'
  },
  column: {
    flex: 1, // Ocupar todo el espacio disponible en la fila
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 5,
    color: 'white',
  },
});

export default WeatherWidget;
