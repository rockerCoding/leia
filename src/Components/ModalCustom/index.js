import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import Modal from "react-native-modal";
import { styles } from './styles';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ICONSIZE = 50

const ModalCustom = ({
  type, isVisible, setIsVisible,
  backdropQuit, question,
  haveResponse, setHaveResponse, responses,
  loadingMessage, loadingComponent
}) => {

  const TopContainer = ({ question }) => {
    return (
      <View style={styles.topContainer}>
        <View>
          <AntDesign name="question" size={ICONSIZE} color="red" />
        </View>
        <Text style={styles.textTitle}>{question.title}</Text>
      </View>
    )
  }

  const ButtonQuestion = ({ button, quitOnClick }) => {
    console.log(button)
    return (
      <TouchableOpacity onPress={() => handleOnPressQuestionButton(button.respond, quitOnClick)}
        style={[styles.buttonContainer, { backgroundColor: button.color }]}
      >
        <Text style={styles.textButton}>{button.name}</Text>
      </TouchableOpacity>
    )

  }

  const handleOnPressQuestionButton = (choosed, quitOnClick) => {
    if (quitOnClick) setIsVisible(false)
    question.handleFunction(choosed)
  }

  const BottomContainer = ({ question }) => {
    return (
      <View style={styles.bottomContainer}>
        {
          question.buttons.map((button) => {
            return (
              <ButtonQuestion button={button} key={button.name} quitOnClick={question.quitOnClick} />
            )
          })
        }
      </View>
    )
  }

  /* const ReturnResponse = ({haveResponse}) => {
      handleTimeout()
      return (
        haveResponse == true?
        <View style={styles.responseContainer}>
          <Text>Deu bom</Text>
        </View>
        :
        <View>
          <Text>Deu ruim</Text>
        </View>
      )
  } */

  const ReturnWithResponse = () => {

    console.log(haveResponse)
    return (
      haveResponse == null ?
        <ActivityIndicator size={ICONSIZE * 2} /> :
        haveResponse.sucess ?
          <View style={{ flex: 1 }}>
            <Text>Bom</Text>
          </View> :
          <View style={{ flex: 1 }}>
            <Text>Ruim</Text>
          </View>
    )
  }

  useEffect(() => {
    handleTimeout()
  }, [haveResponse])


  const handleTimeout = () => {
    console.log(responses)
    //if(responses.onFinish) responses.onFinish()
    /* setTimeout(() => {
      if(haveResponse != null) {
        setIsVisible(false)
        setHaveResponse(null)
      }

      if(responses.onFinish) responses.onFinish()
    }, 2500); */
  }

  const ReturnedTypeModal = ({ type, responses, setIsVisible, haveResponse }) => {

    switch (type) {
      case "question":
        return (
          <View style={{ flex: 1, width: '100%' }}>
            <TopContainer question={question} />
            <BottomContainer question={question} />
          </View>
        )
        break;
      case "loading":
        return (
          <View style={{ flex: 1, width: '100%', /* justifyContent: 'center',  */alignItems: 'center' }}>
            {
              loadingComponent ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  {loadingComponent}
                </View>
                :
                <>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={ICONSIZE * 2} />
                  </View>
                  <Text style={styles.textLoading}>{loadingMessage}</Text>
                </>
            }
          </View>
        )
        break;
      case "loadingWithRespond":
        return (
          <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <ReturnWithResponse />
          </View>
        )
        break;
      default: break;
    }
  }

  const handleBackDrop = () => {
    if (backdropQuit) setIsVisible(false)
  }

  return (
    <Modal
      isVisible={isVisible}
      style={styles.container}
      onBackdropPress={() => handleBackDrop()}>
      <View style={styles.modalContainer}>
        <ReturnedTypeModal type={type} responses={responses} setIsVisible={setIsVisible} haveResponse={haveResponse} setHaveResponse={setHaveResponse} />
      </View>
    </Modal>

  )
}

export default ModalCustom