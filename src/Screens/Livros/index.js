
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderBackButton,
} from '@react-navigation/stack';
import GerenciarLivros from './Gerenciar'
import Profile from './Profile';
import { View, Text, TouchableOpacity, FlatList, Button, Dimensions } from 'react-native'
import Header from './Header';
import EmprestimosPorLivro from './EmprestimosPorLivro';

const data = [
  {
    id: 1,
    nome: "Livro bom",
    autor: "Autor Ruim"
  }
  ,
  {
    id: 2,
    nome: "Memórias póstumas",
    autor: "Machadão"
  }
  ,
  {
    id: 3,
    nome: "Memórias póstumas",
    autor: "Machadão"
  }
  ,
  {
    id: 4,
    nome: "Memórias póstumas",
    autor: "Machadão"
  }
  ,
  {
    id: 5,
    nome: "Memórias póstumas",
    autor: "Machadão"
  }
  ,
  {
    id: 6,
    nome: "Memórias póstumas",
    autor: "Machadão"
  }
  ,
  {
    id: 7,
    nome: "Memórias póstumas",
    autor: "Machadão"
  }
  ,
  {
    id: 8,
    nome: "Memórias póstumas",
    autor: "Machadão"
  }
  ,
  {
    id: 9,
    nome: "Memórias póstumas",
    autor: "Machadão"
  }
  ,
  {
    id: 10,
    nome: "Memórias póstumas",
    autor: "Machadão"
  }
  ,
  {
    id: 11,
    nome: "Memórias póstumas",
    autor: "Machadão"
  }
  ,
  {
    id: 12,
    nome: "Memórias póstumas",
    autor: "Machadão"
  }
  ,
  {
    id: 13,
    nome: "Memórias póstumas",
    autor: "Machadão"
  }
  ,
  {
    id: 14,
    nome: "Memórias póstumas",
    autor: "Machadão"
  }
  ,
  {
    id: 15,
    nome: "Memórias póstumas",
    autor: "Machadão"
  }
  ,
  {
    id: 16,
    nome: "Memórias póstumas",
    autor: "Machadão"
  }
  ,
  {
    id: 17,
    nome: "Memórias póstumas",
    autor: "Machadão"
  }
  ,
  {
    id: 18,
    nome: "Memórias póstumas",
    autor: "Machadão"
  }
  ,
  {
    id: 19,
    nome: "Memórias póstumas",
    autor: "Machadão"
  }
  ,
  {
    id: 20,
    nome: "Memórias póstumas",
    autor: "Machadão"
  }
]

const Stack = createStackNavigator();

const Autores = () => {

  const [selected, setSelected] = useState(null)

  /* useEffect(() => {
    if(selected) console.log(selected)
  }, [selected]) */
  

  return (
    <NavigationContainer independent>
      <Stack.Navigator
        initialRouteName='Lista'
        screenOptions={({ navigation, route }) => ({
          header: (props) => <Header {...props} selected={selected} setSelected={setSelected}/>
        })}>
        <Stack.Screen name="Lista">
          {() => <GerenciarLivros data={data} selected={selected} setSelected={setSelected}/>}
        </Stack.Screen>
        <Stack.Screen name="Livro">
          {() => <Profile selected={selected} setSelected={setSelected}/>}
        </Stack.Screen>
        <Stack.Screen name="Novo Livro">
          {() => <Profile />}
        </Stack.Screen>
        <Stack.Screen name="Empréstimos">
          {() => <EmprestimosPorLivro selected={selected}/>}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Autores