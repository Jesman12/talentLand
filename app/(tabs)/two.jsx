import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Picker, Button, Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import { LineChart } from 'react-native-chart-kit';
import ModalInfo from '../ModalInfo'

export default function TabTwoScreen() {
  const [selectedDate, setSelectedDate] = useState('2024-04-02');
  const [selectedSensor, setSensor] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [chartDataCaudal, setChartDataCaudal] = useState(null);
  const [chartDataLavamanos, setChartDataLavamanos] = useState(null);

  useEffect(() => {
    fetchData('regadera', setChartDataCaudal, selectedDate);
    fetchData('lavamanos', setChartDataLavamanos, selectedDate);
  }, [selectedDate]);

  const fetchData = (type, setData, date) => {
      fetch('https://domint.com.mx/api/v1/sensor/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          action: 'getDataByDate',
          date,
          type
        }).toString()
      })
      .then(response => response.json())
      .then(data => {
        const chartData = data.map(item => ({
          value: parseFloat(item.valor),
          timestamp: item.timestamp.split(' ')[1] // Extracting only the time
        }));
        console.log(chartData);
        setData(chartData);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  function handlerModal(visible, sensor){
    setModalVisible(visible);
    setSensor(sensor);
  } 

  return (
    <View style={styles.container}>      
      {/* Modal */}
      <ModalInfo modalVisible={modalVisible} setModalVisible={setModalVisible} sensor={selectedSensor} selectedDate={selectedDate}/>
      
      <Text>Seleccione una fecha:</Text>
      <Picker
        selectedValue={selectedDate}
        onValueChange={(itemValue) => setSelectedDate(itemValue)}
        style={{ height: 50, width: 200 }}
      >
        <Picker.Item label="2024-04-01" value="2024-04-01" />
        <Picker.Item label="2024-04-02" value="2024-04-02" />
        <Picker.Item label="2024-04-03" value="2024-04-03" />
        <Picker.Item label="Otra fecha..." value="other" />
      </Picker>
      
      <Pressable onPress={() => handlerModal(true, 'regadera')}>
        <Text>Regadera</Text>
        {chartDataCaudal && (
          <LineChart
            data={{
              labels: chartDataCaudal.map(item => item.timestamp),
              datasets: [
                {
                  data: chartDataCaudal.map(item => item.value)
                }
              ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisLabel="L/m"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        )}
      </Pressable>

      <Pressable onPress={() => handlerModal(true, 'lavamanos')}>
        <Text>Lava Manos</Text>
        {chartDataLavamanos && (
          <LineChart
            data={{
              labels: chartDataLavamanos.map(item => item.timestamp),
              datasets: [
                {
                  data: chartDataLavamanos.map(item => item.value)
                }
              ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisLabel="L/m"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundGradientFrom: "#1E2923",
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: "#08130D",
              backgroundGradientToOpacity: 0.5,
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        )}
      </Pressable>
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
});
