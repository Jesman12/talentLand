import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';

const data = [
  { title: 'Regadera', description: 'Sensor Regadera', estado: 'ACTIVO', img: 'https://www.costco.com.mx/medias/sys_master/products/hda/h31/80547738615838.webp' },
  { title: 'Lava Manos', description: 'Sensor Lavamanos', estado: 'ACTIVO', img: 'https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/70f6df7422ac1e1bfcb33c3f747e292e.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp' }
];

const Card = ({ title, description, estado, img }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{title}</Text>
    <Image
        source={{ uri: img }} // URL de la imagen
        style={styles.image}
      />
    <Text style={styles.description}>{description}</Text>
    <Text style={ estado === 'ACTIVO' ? {color: '#39FF14'} : {color: '#FE575F'} }>{estado}</Text>
  </View>
);

const Carousel = () => (
  <Swiper style={styles.wrapper} loop={false}>
    {data.map((item, index) => (
      <View key={index}>
        <Card title={item.title} description={item.description} estado={item.estado} img={item.img} />
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
    boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)',
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
  image: {
    width: '100%',
    height: 300,
    marginBottom: '1em'
  },
});

export default Carousel;
