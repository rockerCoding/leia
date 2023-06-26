import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation, useIsFocused, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../Livros/Profile';

const Dashboard = () => {
  const navigation = useNavigation()
  const Stack = createStackNavigator();

  const DashBoardScreen = () => {
    return (
      <View>
        <Text>Dashboard</Text>
        <Button
          title='Empréstimos'
          onPress={() => navigation.navigate("Novo Livro")}
        />
      </View>
    )
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={DashBoardScreen} />
      <Stack.Screen name="Novo Livro" component={Profile} options={{headerShown: true}} />

    </Stack.Navigator>

  )
}

export default Dashboard