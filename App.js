import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios'

//CEP é pra receber os dados do componente de textinput
let cep = "";
//Data cep guarda os dados
let data_cep = {};

export default function App(){
  /*
   * Eu coloquei esse state pra poder dar refresh na view sempre que eu precisar
   * Ele esta atrelado aos resultados que o getcep conseguir trazer, sendo 0 pra
   * input invalido, 1 pra tudo certo, 2 pra cep n existe e o 4 eu usei só pra
   * poder dar refresh no state e n travar quando eu trocar pra um state que ja é
   * o que esta ali, exemplo, eu consigo um cep valido, e logo em seguida coloco
   * outro cep valido, o setstate irá mudar de 1 pra 1, então o react não irá dar
   * o refresh.
   */
  const [stati, setStati] = useState(0)

  //Função pega o valor do textinput e ve se o tamanho é 8 (tamanho padrão de ceps)
  function getCEP(valor){

    if(valor.length == 8){
      //Se for ele manda pro axios e assim ele faz a requisição e devolve o resultado
      axios.get("https://viacep.com.br/ws/"+ valor +"/json").then(response =>{
        //Armazeno o resultado
        data_cep = response.data

        //Se um erro existir seta o estado como cep não existe(2)
        if((data_cep.erro ?? false)){
          setStati(4)
          setStati(2);
        }else{
          //Se não, seta o estado como tudo certo (1)
          setStati(4)
          setStati(1)
        }
      })
    }else{
      //Se o cep n tiver 8 digitos seta como cep invalido
      setStati(4)
      setStati(0)
    }
  }
  //Aqui tem uma função pra exibir o texto na tela que vai ser chamada logo abaixo do button
  function exibeTexto(){
    if(stati == 0){
      //Se tiver invalido exibe "Por favor insira um numero de 9 digitos" em vermelho
      return <Text style={{color:'#f00'}}>Por favor insira um numero de 9 digitos</Text>
    }else if(stati == 1){
      //Se tiver certo percorre o objeto trazendo os valores
      return Object.keys(data_cep).map((key, index) => 
      { return (<Text key={key}> { key.toLocaleUpperCase() + ": " + data_cep[key] } </Text>)});
    }else{
      //Se não existir exibe CEP não existe! em vermelho
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

      {//Aqui é chamado a exibeTexto, eu preferi usar touchable opacity pois posso
       //estilizar ela melhor que o button do react
      exibeTexto()}
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
