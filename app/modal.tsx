import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

import { Text, View } from '../components/Themed';

export default function ModalScreen() {
  const [text, onChangeText] = React.useState('Tu nombre:');
  const [number, onChangeNumber] = React.useState('');
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      <Text style={styles.ajustes1}>DATOS PERSONALES:</Text>
      <Text>- Profile Character</Text>
      
      <TouchableOpacity style={styles.buttonIcon} >
        <Image source={require('../img/icon.png')} style={styles.icon}/>
      </TouchableOpacity>
      
      <Text>- Nombre:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder={'Nombre completo'}
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
        placeholder={'Correo'}
      />
      
      <TouchableOpacity style={styles.button} >
        <Text>modificar la contraseña de inicio de sesion</Text>
      </TouchableOpacity>
      
      <Text style={styles.ajustes1}>UNIDAD DE TEMPERATURA:</Text>
      <TouchableOpacity style={styles.button} >
        <Text>Guardar</Text>
      </TouchableOpacity>
      
      <Text style={styles.ajustes1}>IDIOMA:</Text>
      <TouchableOpacity style={styles.button} >
        <Text>Guardar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} >
        <Text>GESTION DEL HOGAR</Text>
      </TouchableOpacity>
      
      <Text>- nombre del hogar</Text>
      <Text>- Gestion de Salas</Text>
      <Text>- Localizacion</Text>
      
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
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  ajustes1: {
    color: 'blue',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonIcon: {
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 50,
    height: 50,
  },
});
