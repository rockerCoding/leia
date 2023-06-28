
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileLeitor from './ProfileLeitor';
import GerenciarLeitores from './GerenciarLeitores'
import Header from './Header'

const Stack = createStackNavigator();

const Leitores = () => {

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
        <Stack.Screen name="Leitores">
          {() => <GerenciarLeitores selected={selected} setSelected={setSelected} refreshAutores={refreshAutores}/>}
        </Stack.Screen>
        <Stack.Screen name="Leitor">
          {() => <ProfileLeitor selected={selected} />}
        </Stack.Screen>
        <Stack.Screen name="Novo Leitor">
          {() => <ProfileLeitor />}
        </Stack.Screen>
      

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Leitores