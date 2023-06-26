
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'

import Header from './Header';
import GerenciarEmprestimos from './GerenciarEmprestimos';
import ProfileEmprestimos from './ProfileEmprestimo'

const Stack = createStackNavigator();

const Emprestimos = () => {

  const [selected, setSelected] = useState(null)

  return (
    <NavigationContainer independent>
      <Stack.Navigator
        initialRouteName='Lista'
        screenOptions={({ navigation, route }) => ({
          header: (props) => <Header {...props} selected={selected} setSelected={setSelected}/>
        })}>
        <Stack.Screen name="Empréstimos">
          {() => <GerenciarEmprestimos selected={selected} setSelected={setSelected}/>}
        </Stack.Screen>
        <Stack.Screen name="Empréstimo">
          {() => <ProfileEmprestimos selected={selected} />}
        </Stack.Screen>
        <Stack.Screen name="Novo Empréstimo">
          {() => <ProfileEmprestimos />}
        </Stack.Screen>
        {/*<Stack.Screen name="Livros Cadastrados">
          {() => <EmprestimosPorLivro selected={selected}/>}
        </Stack.Screen> */}

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Emprestimos