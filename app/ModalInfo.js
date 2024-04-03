// ModalInfo.js
import React, { useEffect, useState } from 'react';
import { Modal, Button, View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ModalInfo({ modalVisible, setModalVisible, sensor, selectedDate }) {
  const [resultIA, setResultIA] = useState('');

  useEffect(() => {
    setResultIA('Cargando respuesta...');
    if(modalVisible){
      fetchData(sensor, selectedDate);
    }
  }, [sensor, modalVisible]);

  const fetchData = (type, date) => {
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
        console.log(data);
        fetchAI(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  let mensajeConSaltosDeLinea = "";
  const fetchAI = (datos) => {
    let prompt = "Enlista consejos sobre cómo disminuir mi consumo diario de agua, además, proporciona datos específicos actuando como si fueras ambientalista y regañándome si es necesario. En base a los datos proporcionados especifica cuanto tiempo en litros de consumo se uso el agua y compararlo con la media recomendada para el ahorro de agua. Usando exclusivamente estos datos de consumo diario:";
    prompt = prompt + JSON.stringify(datos);

    const raw = JSON.stringify({
      "contents": [
        {
          "parts": [
            {
              "text": prompt
            }
          ]
        }
      ]
    });

    fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyCy0BGZXJtktcBJZ1HnaKfl27bG0QqNnwo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: raw
    })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result && result.candidates && result.candidates.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        console.log(text);
        mensajeConSaltosDeLinea = text.replace(/\\n/g, '\n');
        setResultIA(mensajeConSaltosDeLinea);
      } else {
          console.log("Ha ocurrido un error con la API");
          setResultIA('');
      }
      
    })
    .catch(error => console.error('Error fetching data:', error));
};

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <ScrollView style={styles.modalContent}>
          <Text>
            {resultIA}
          </Text>
          <Button title="Cerrar" onPress={() => setModalVisible(false)} />
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {

  },
  scrollViewContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    maxHeight: '80%', // Ajusta la altura máxima del contenido si es necesario
  },
});
