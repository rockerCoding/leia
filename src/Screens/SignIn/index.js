import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { styles } from './styles'
import { ActivityIndicator, Snackbar, TextInput } from 'react-native-paper'
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../Contexts/AuthContext';
import UserController from '../../Controllers/UserController';
import ModalCustom from '../../Components/ModalCustom';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';


const SignIn = ({ navigationLogin }) => {

  const { isLoading, setIsLoading, setUser } = useContext(AuthContext)

  const [login, setLogin] = useState("eric@gmail.com")
  const [senha, setSenha] = useState("senha")
  const [isSecret, setIsSecret] = useState(true)
  const [isEnabled, setIsEnabled] = useState(false)
  const [error, setError] = useState(false)
  const [isDisable, setIsDisable] = useState(false)
  const [isLogging, setIsLogging] = useState(false)

  const handleError = () => setError(!error)
  const handleResetPage = () => {
    setLogin("")
    setSenha("")
    setIsDisable(false)
    setIsLoading(false)
  }

  const checkLogin = () => {
    let attempt = {
      email: login,
      senha: senha
    }

    UserController.login(attempt).then((res) => {
      //handleResetPage()
      if (res) {
        setIsLogging(true)
        setTimeout(() => {
          setUser({ data: res.data, navigation: navigationLogin })
        }, 3000);
      }
      else setError(true)
    }).finally(() => setIsLoading(false))

  }

  const handleLogin = () => {
    setError(false)
    setIsLoading(true)
    checkLogin(login, senha)
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          source={require('../../../assets/images/logoLeia.jpg')}
          style={styles.imageLogo}
        />
      </View>
      <View style={styles.bottomContainer}>

        <View style={styles.warningContainer}>
          {
            isLoading && <ActivityIndicator animating={true} color="lightblue" size={60} />
          }
          <Snackbar
            visible={error}
            onDismiss={handleError}
            duration={3000}
            style={{ backgroundColor: 'red' }}
            action={{
              label: 'X',
              onPress: () => {
                setError(false)
              },
            }}

          >
            Usuário ou senha incorretos
          </Snackbar>
        </View>
        <TextInput
          mode='outlined'
          label='Login'
          value={login}
          onChangeText={setLogin}
          outlineColor={error ? "red" : '#5290f2'}
          disabled={isLoading}
        />
        <TextInput
          outlineColor={error ? "red" : '#5290f2'}
          mode='outlined'
          label='Senha'
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={isSecret}
          disabled={isLoading}
          right={<TextInput.Icon icon="eye" onPress={() => setIsSecret(!isSecret)} />}
        />

        <TouchableOpacity
          style={[styles.buttonContainer, { backgroundColor: isLoading ? "lightblue" : "#5290f2" }]} onPress={() => handleLogin()}
          disabled={isLoading}
        >
          <Ionicons name="ios-checkmark" size={24} color="white" />
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>


      </View>
      <ModalCustom
        isVisible={isLogging}
        type="loading"
        loadingComponent={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
            <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.isLoggingTitleText}>Usuário Encontrado!</Text>
              <EvilIcons name="check" size={44} color="green" />
            </View>
            <CountdownCircleTimer
              isPlaying
              duration={3}
              /* colors={['#004777', '#F7B801', '#A30000', '#A30000']} */
              colors={['lightgreen']}
              colorsTime={[0]}
              strokeWidth={5}
            >
              {({ remainingTime }) => (
                <>
                  <Text> Entrando em: </Text>
                  <Text> {remainingTime}</Text>

                </>
              )}
            </CountdownCircleTimer>
          </View>

        }
      />

    </View>
  )
}

export default SignIn