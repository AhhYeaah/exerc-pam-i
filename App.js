import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios'

let cep = "";
let data_cep = {};



export default function App(){

  const [stati, setStati] = useState(0)

  function getCEP(valor){
    if(valor.length == 8){
      axios.get("https://viacep.com.br/ws/"+ valor +"/json").then(response =>{
        data_cep = response.data
        
        if((data_cep.erro ?? false)){
          setStati(4)
          setStati(3);
        }else{
          setStati(4)
          setStati(1)
        }
      })
    }else{
      setStati(4)
      setStati(0)
    }
  }

  function exibeTexto(){
    if(stati == 0){
      return <Text style={{color:'#f00'}}>Por favor insira um numero de 9 digitos</Text>
    }else if(stati == 1){
      return Object.keys(data_cep).map((key, index) => 
      { return (<Text key={key}> { key.toLocaleUpperCase() + ": " + data_cep[key] } </Text>)});
    }else{
      return <Text style={{color:'#f00'}}>CEP não existe!</Text>
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Digite um CEP para buscar mais informações</Text>

      <TextInput
        placeholder="Insira um CEP"
        keyboardType="numeric"
        onChangeText={(text) => {cep = text}}
        maxLength= {8}
        textAlign="center"
        style={styles.textinp}
      />

      <TouchableOpacity
      style={styles.button}
      onPress={() =>{getCEP(cep)}}>
        <Text>Buscar</Text>
      </TouchableOpacity>
      {exibeTexto()}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CAFFFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#32BF84',
    fontSize: 20,
    textAlign:'center',
    paddingBottom:20,
  },
  texterror:{
    color: 'red',
    paddingTop: 5
  },
  textinp: {
    backgroundColor: '#fff',
    height:50,
    width: 120
  },
  button: {
    backgroundColor: '#048243',
    color:'#fff',
    borderRadius:20,
    width:100,
    height:50,
    alignItems:'center',
    justifyContent: 'center',
    marginTop: 20
  }
});
