import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Button, Pressable, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { LineChart } from 'react-native-chart-kit';
import ModalInfo from '../ModalInfo';
import { Picker } from '@react-native-picker/picker';

// Componente reutilizable para el gráfico de línea
const CustomLineChart = ({ data, chartConfig }) => (
  <LineChart
    data={data}
    width={Dimensions.get("window").width - 20}
    height={220}
    yAxisLabel="L/m"
    yAxisInterval={1}
    chartConfig={chartConfig}
    bezier
    style={{ borderRadius: 16 }}
  />
);

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
      setData(chartData);
    })
    .catch(error => console.error('Error fetching data:', error));
  };

  function handlerModal(visible, sensor) {
    setModalVisible(visible);
    setSensor(sensor);
  } 

  const pickerItems = [
    { label: "2024-04-01", value: "2024-04-01" },
    { label: "2024-04-02", value: "2024-04-02" },
    { label: "2024-04-03", value: "2024-04-03" },
    { label: "Otra fecha...", value: "other" }
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ModalInfo modalVisible={modalVisible} setModalVisible={setModalVisible} sensor={selectedSensor} selectedDate={selectedDate}/>
      
      <Text style={styles.label}>Seleccione una fecha:</Text>
      <Picker
        selectedValue={selectedDate}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedDate(itemValue)}
      >
        {pickerItems.map(item => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>

      <Pressable style={styles.chartContainer} onPress={() => handlerModal(true, 'regadera')}>
        <Text style={styles.chartTitle}>Regadera</Text>
        {chartDataCaudal && (
          <CustomLineChart
            data={{
              labels: chartDataCaudal.map(item => item.timestamp),
              datasets: [{ data: chartDataCaudal.map(item => item.value) }]
            }}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: { borderRadius: 16 },
              propsForDots: { r: "6", strokeWidth: "2", stroke: "#ffa726" }
            }}
          />
        )}
      </Pressable>

      <Pressable style={styles.chartContainer} onPress={() => handlerModal(true, 'lavamanos')}>
        <Text style={styles.chartTitle}>Lava Manos</Text>
        {chartDataLavamanos && (
          <CustomLineChart
            data={{
              labels: chartDataLavamanos.map(item => item.timestamp),
              datasets: [{ data: chartDataLavamanos.map(item => item.value) }]
            }}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#020024",
              backgroundGradientTo: "#090979",
              decimalPlaces: 2,
              color: (opacity = 100) => `rgba(0, 212, 155, 100)`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: { borderRadius: 16 },
              propsForDots: { r: "6", strokeWidth: "2", stroke: "#ffa726" }
            }}
          />
        )}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', paddingVertical: 20 },
  label: { fontSize: 16, marginBottom: 10 },
  picker: { width: '80%', marginBottom: 20 },
  chartContainer: { alignItems: 'center', marginBottom: 20 },
  chartTitle: { fontSize: 18, marginBottom: 10 }
});
