
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

const Stack = createStackNavigator();

const Autores = () => {

  const [selected, setSelected] = useState(null)
  const [refreshLivros, setRefreshLivros] = useState(false)

  const handleRefreshLivros = () => setRefreshLivros(!refreshLivros)

  return (
    <NavigationContainer independent>
      <Stack.Navigator
        initialRouteName='Lista'
        screenOptions={({ navigation, route }) => ({
          header: (props) => <Header {...props} selected={selected} setSelected={setSelected} handleRefresh={handleRefreshLivros}/>
        })}>
        <Stack.Screen name="Livros">
          {() => <GerenciarLivros selected={selected} setSelected={setSelected} refreshLivros={refreshLivros}/>}
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