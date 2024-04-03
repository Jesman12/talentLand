import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

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
    <View>
      <Text>Mínima: {tmin}°C</Text>
      <Text>Máxima: {tmax}°C</Text>
      <Text>Descripción: {desciel}</Text>
    </View>
  );
};

export default WeatherWidget;
