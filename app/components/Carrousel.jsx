import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

const data = [
  { title: 'Regadera', description: 'Sensor Regadera', estado: 'ACTIVO' },
  { title: 'Lava Manos', description: 'Sensor Lavamanos', estado: 'ACTIVO' }
];

const Card = ({ title, description, estado }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description} - {estado}</Text>
  </View>
);

const Carousel = () => (
  <Swiper style={styles.wrapper} loop={false}>
    {data.map((item, index) => (
      <View key={index}>
        <Card title={item.title} description={item.description} estado={item.estado} />
      </View>
    ))}
  </Swiper>
);

const styles = StyleSheet.create({
  wrapper: {
    height: '100%'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
  },
});

export default Carousel;
