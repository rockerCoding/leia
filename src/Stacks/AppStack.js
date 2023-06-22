import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Livros from '../Screens/Livros';
import { Image } from 'react-native';
import Autores from '../Screens/Autores';


const Drawer = createDrawerNavigator();

const Feed = () => {
  return (<View><Text>Feed</Text></View>)
}
const Article = () => {
  return (<View><Text>Article</Text></View>)
}

const AppStack = () => {
  return (
    <Drawer.Navigator useLegacyImplementation
      //initialRouteName='Livros'
      initialRouteName='Autores'
      screenOptions={{
        headerRight: () => {
          return (
            <View>
              <Image
                style={{width: 50, height: 50, marginRight: 20}}
                source={require('../../assets/images/logoLeia.jpg')}
                
              />
            </View>
          )
        }
      }}
    >
      <Drawer.Screen name="Livros" component={Livros} />
      <Drawer.Screen name="Autores" component={Autores} />
    </Drawer.Navigator>
  )
}

export default AppStack