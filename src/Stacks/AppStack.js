import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import Livros from '../Screens/Livros';
import { Image } from 'react-native';
import Autores from '../Screens/Autores';
import { Ionicons, SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../Contexts/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import ModalCustom from '../Components/ModalCustom';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import CustomDrawer from './CustomDrawer'

const Drawer = createDrawerNavigator();

const SOCIAL_MEDIAS_COLORS = "blue"

const CustomSidebarMenu = (props) => {

  const { user, setUser } = useContext(AuthContext)
  const [logginOut, setLogginOut] = useState(false)
  const [countToLogOut, setCountToLogOut] = useState(3)

  const handleLogout = () => {
    setLogginOut(true)
    setTimeout(() => {
      setUser(null)
    }, 3000);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.profileContainer}>
        <View style={styles.topProfile}>
          <View style={styles.logoutIconContainer}>
            <TouchableOpacity 
              onPress={() => handleLogout()} 
              style={{backgroundColor: 'red', padding: 30}}
              >
              <SimpleLineIcons name="logout" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.topLogoContainer}>
            <Text style={styles.titleText}>Leia+</Text>
            <View style={styles.socialMediaContainer}>
              <Text style={styles.subtitleText}>Livros em qualquer lugar</Text>
              <View style={styles.iconsContainer}>
                <Ionicons name="logo-instagram" size={15} color={SOCIAL_MEDIAS_COLORS} />
                <Ionicons name="logo-facebook" size={15} color={SOCIAL_MEDIAS_COLORS} />
                <Ionicons name="logo-linkedin" size={15} color={SOCIAL_MEDIAS_COLORS} />

              </View>
            </View>
          </View>
        </View>
        <View style={styles.imageProfileContainer}>
          <Ionicons name="person-outline" size={100} color="black" />
        </View>
        <View style={styles.bottomProfileContainer}>
          <Text>Seja bem vindo, <Text>{user?.nome}</Text></Text>
        </View>

      </View>

      <View style={styles.menuContentContainer}>
        <DrawerContentScrollView {...props} >
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>
      <View style={styles.footerContainer}>
        <Text
          style={{
            backgroundColor: "blue",
            paddingHorizontal: 20,
            paddingVertical: 15,
            borderRadius: 5,
            fontSize: 16,
            textAlign: 'center',
            color: 'white',
            paddingVertical: 5
          }}>
          © Copyright 2023 RBTech LTDA
        </Text>
      </View>
      <>
        <ModalCustom
          isVisible={logginOut}
          type="loading"
          loadingComponent={
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
              <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <Text style={styles.isLoggingTitleText}>Logout Executado!</Text>
                <MaterialIcons name="cancel" size={44} color="red" />
              </View>
              <CountdownCircleTimer
                isPlaying
                duration={3}
                colors={['red']}
                colorsTime={[0]}
                strokeWidth={5}
              >
                {({ remainingTime }) => (
                  <>
                    <Text> Saindo em: </Text>
                    <Text> {remainingTime}</Text>

                  </>
                )}
              </CountdownCircleTimer>
            </View>
          }
        />
      </>
    </SafeAreaView>
  );
};

const AppStack = () => {
  return (
    <NavigationContainer>


      <Drawer.Navigator useLegacyImplementation
        drawerContent={(props) => <CustomDrawer {...props} />}
        initialRouteName='Livros'
        screenOptions={{
          drawerStyle: {
            width: Dimensions.get('screen').width * 0.8
          },
          headerRight: () => {
            return (
              <View>
                <Image
                  style={{ width: 50, height: 50, marginRight: 20 }}
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

    </NavigationContainer>
  )
}

export default AppStack

const styles = StyleSheet.create({
  profileContainer: {
    flex: 3,
    backgroundColor: 'white',
  },
  menuContentContainer: {
    flex: 6,

  },
  footerContainer: {
    flex: 1,
    justifyContent: 'center', alignItems: 'center',
  },

  isLoggingTitleText: {
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
    textAlign: 'center',
    textAlignVertical: 'center'
  },

  // profile

  // top profile
  topProfile: {
    flex: 1, flexDirection: 'row',
    justifyContent: 'center', alignItems: 'center',
  },
  imageProfileContainer: {
    flex: 1,
  },

  bottomProfileContainer: {
    flex: 1,
  },
  topLogoContainer: {
    flex: 4,
  },

  logoutIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  titleText: {
    fontSize: 25,

    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    borderStyle: 'solid'
  },
  subtitleText: {
    fontSize: 10,
    fontWeight: '600',
    fontStyle: 'italic'
  },
  iconsContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    marginLeft: 10, marginTop: 5
  }
})