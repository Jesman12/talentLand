import { StyleSheet } from 'react-native';
import { Text, View, } from '@/components/Themed';
import WeatherWidget from '../components/clima'

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <View>
        <WeatherWidget />
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>SENSORES</Text>
      <Text style={styles.title2}>Sensor baño:</Text>
      <Text style={styles.title2}>Sensor regadera:</Text>
      <Text style={styles.title2}>Sensor lavamanos:</Text>
      <Text style={styles.title2}>Sensor Algibe:</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
