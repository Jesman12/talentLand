import { StyleSheet } from 'react-native';
import { Text, View, } from '@/components/Themed';
import WeatherWidget from '../components/clima'
import CarouselComponent from '../components/Carrousel';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <WeatherWidget />
      <CarouselComponent/>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  title2:{
    color: 'blue',
  },
});
