import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground, Image, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Contexts/AuthContext'
import { Ionicons, SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import ModalCustom from '../../Components/ModalCustom';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

const TOP_ICONS_MEDIAS_COLORS = "white"
const TOP_ICONS_MEDIAS_SIZE = 30

const CustonDrawer = (props) => {

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
        <View style={styles.headerContainer}>
          <ImageBackground source={require('../../../assets/images/profileBackground.jpg')}
            style={styles.imageBackground}>
            <View style={styles.topHeaderContainer}>
              <View style={styles.profileIconContainer}>
                <Ionicons name="md-person-circle" size={100} color="white" />
              </View>
              <View style={{ flex: 1 }}>
                <Pressable style={styles.optionsIcons} onPress={() => handleLogout()}>
                  <MaterialIcons name="logout" size={TOP_ICONS_MEDIAS_SIZE} color={TOP_ICONS_MEDIAS_COLORS} />
                </Pressable>
              </View>
            </View>
            <View style={styles.bottomHeaderContainer}>
              <Text style={[styles.textTopContainer, { fontWeight: '600', fontSize: 20 }]}>Guilherme Rocha</Text>
              <Text style={[styles.textTopContainer, styles.marginTopTextTop]}>guilherme.rocha@soulasalle.com.br</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.bodyContainer}>
          <DrawerContentScrollView {...props} >
            <DrawerItemList {...props} />
          </DrawerContentScrollView>
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.leiaMaisContainer}>
            <View style={styles.contactsContainer}>
              <View style={styles.titleContactsContainer}>
                <Text style={styles.contactsTitleText}>Contatos</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                <Ionicons name="logo-instagram" size={24} color="lightblue" />
                <Ionicons name="logo-facebook" size={24} color="lightblue" />
                <Ionicons name="logo-linkedin" size={24} color="lightblue" />

              </View>

              <Text style={styles.copyright}>© RBTech LTDA </Text>
            </View>
          </View>

        </View>
      </View>




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

    </SafeAreaView>
  );

}

export default CustonDrawer