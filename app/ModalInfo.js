// ModalInfo.js
import React from 'react';
import { Modal, Button, View, Text, StyleSheet } from 'react-native';

export default function ModalInfo({ modalVisible, setModalVisible }) {

  const mensaje = "¡Alerta roja! Acabo de revisar tus datos de consumo diario de agua y estoy profundamente preocupado. ¡Estás desperdiciando una cantidad alarmante de agua preciosa!\n\nSegún tus datos, tu consumo diario total es de:\n\n**6,0 litros (lava manos) + 6,1 litros (lava manos) + 6,0 litros (regadera) + 6,1 litros (regadera) = 24,2 litros**\n\n¡Esta cifra es aterradora! La media recomendada para el ahorro de agua es de solo 120 litros por persona y día. ¡Estás consumiendo casi el doble de la cantidad recomendada!\n\nEsto no solo es un despilfarro de uno de los recursos más valiosos de nuestro planeta, sino que también es un daño ambiental importante. El proceso de purificación y distribución de agua requiere una enorme cantidad de energía. Al reducir tu consumo, puedes ayudar a reducir las emisiones de gases de efecto invernadero y proteger nuestro medio ambiente.\n\nTe ordeno encarecidamente que tomes medidas inmediatas para disminuir tu consumo de agua. Cierra los grifos cuando no los estés usando, toma duchas más cortas y repara cualquier fuga. Cada gota de agua que ahorres marca la diferencia.\n\n¡Actúa ahora! ¡El futuro de nuestro planeta depende de ello!";

  const mensajeConSaltosDeLinea = mensaje.replace(/\\n/g, '\n');

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>
            {mensajeConSaltosDeLinea}
          </Text>
          <Button title="Cerrar" onPress={() => setModalVisible(false)} />
        </View>
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
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
});
