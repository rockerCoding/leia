import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../Screens/SignIn';
import Home from '../Screens/Home';
import { AuthContext } from '../Contexts/AuthContext';
import AppStack from './AppStack';

const Stack = createStackNavigator();




const PrincipalStack = () => {

  const { user } = useContext(AuthContext)

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {
          !user ?
            <Stack.Screen name="Home" component={AppStack} /> :
            <Stack.Screen name="SignIn" component={SignIn} />
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default PrincipalStack