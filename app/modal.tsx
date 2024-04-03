import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, StyleSheet,TextInput,TouchableOpacity } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function ModalScreen() {
  const [text, onChangeText] = React.useState('Tu nombre:');
  const [number, onChangeNumber] = React.useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles. ajustes1}>DATOS PERSONALES:</Text>
      <Text>- Profile Character</Text>
      <TouchableOpacity style={styles.buttonIcon} >
      <img src="./img/icon.png" alt="" width={50} height={50}/>
      </TouchableOpacity>
      <Text>- Nombre:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder = {'Nombre completo'}
      />
      <TouchableOpacity style={styles.button} >
      <Text>Guardar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} >
      <Text>CUENTA Y SEGURIDAD:</Text>
      </TouchableOpacity>
      <Text>- correo electronico</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder = {'Correo'}
      />
      <TouchableOpacity style={styles.button} >
      <Text>modificar la contraseña de inicio de sesion</Text>
      </TouchableOpacity>
      
      <Text style={styles. ajustes1}>UNIDAD DE TEMPERATURA:</Text>
      <TouchableOpacity style={styles.button} >
      <Text>Guardar</Text>
      </TouchableOpacity>
      <Text style={styles. ajustes1}>IDIOMA:</Text>
      <TouchableOpacity style={styles.button} >
      <Text>Guardar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} >
      <Text>GESTION DEL HOGAR</Text>
      </TouchableOpacity>
      
      <Text>- nombre del hogar</Text>
      <Text>- Gestion de Salas</Text>
      <Text>- Localizacion</Text>
      <Text></Text>
      <Text></Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
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
  ajustes1:{
    color: 'blue',
    marginRight: 80,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  buttonIcon: {
    alignItems: 'center',
    padding: 0,
  },
});
