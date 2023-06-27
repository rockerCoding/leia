
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderBackButton,
} from '@react-navigation/stack';
import { View, Text, TouchableOpacity, FlatList, Button, Dimensions } from 'react-native'


import EmprestimosPorLivro from './EmprestimosPorLivro';
import GerenciarAutores from './GerenciarAutores';
import ProfileAutor from './ProfileAutor';
import Header from './Header';

const Stack = createStackNavigator();

const Autores = () => {

  const [selected, setSelected] = useState(null)
  const [refreshAutores, setRefreshAutores] = useState(false)

  const handleRefreshAutores = () => setRefreshAutores(!refreshAutores)

  return (
    <NavigationContainer independent>
      <Stack.Navigator
        initialRouteName='Autores'
        screenOptions={({ navigation, route }) => ({
          /* header: (props) => <Header {...props} selected={selected} setSelected={setSelected}/> */
          header: (props) => 
            <Header {...props} 
              selected={selected} setSelected={setSelected}
              handleRefresh={handleRefreshAutores}
            />  
        })}>
        <Stack.Screen name="Autores">
          {() => <GerenciarAutores selected={selected} setSelected={setSelected} refreshAutores={refreshAutores}/>}
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