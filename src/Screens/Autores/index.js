
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderBackButton,
} from '@react-navigation/stack';
import { View, Text, TouchableOpacity, FlatList, Button, Dimensions } from 'react-native'
import Header from './Header';
import EmprestimosPorLivro from './EmprestimosPorLivro';
import GerenciarAutores from './GerenciarAutores';
import ProfileAutor from './ProfileAutor';

const Stack = createStackNavigator();

const Autores = () => {

  const [selected, setSelected] = useState(null)

  return (
    <NavigationContainer independent>
      <Stack.Navigator
        initialRouteName='Lista'
        screenOptions={({ navigation, route }) => ({
          header: (props) => <Header {...props} selected={selected} setSelected={setSelected}/>
        })}>
        <Stack.Screen name="Lista">
          {() => <GerenciarAutores selected={selected} setSelected={setSelected}/>}
        </Stack.Screen>
        <Stack.Screen name="Autor">
          {() => <ProfileAutor selected={selected} />}
        </Stack.Screen>
        <Stack.Screen name="Novo Autor">
          {() => <ProfileAutor />}
        </Stack.Screen>
        <Stack.Screen name="Livros Cadastrados">
          {() => <EmprestimosPorLivro selected={selected}/>}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Autores