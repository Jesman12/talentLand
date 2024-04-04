import { Pressable, StyleSheet } from 'react-native';
import { Text, View, } from '@/components/Themed';
import WeatherWidget from '../components/clima'
import CarouselComponent from '../components/Carrousel';


export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <WeatherWidget />
      <CarouselComponent/>
      <Pressable style={styles.btn} onPress={() => console.log('')}>
        <Text style={styles.btnText}>
          Agregar dispositivo
        </Text>
      </Pressable>
    </View>
    
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#256D7B',
    padding: 10,
    borderRadius: 5,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center', // Centra el texto horizontalmente
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
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
