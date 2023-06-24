import { View, Text, Button, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import LeitorController from '../../../Controllers/LeitorController';
import { styles } from './styles';
import { TextInput } from 'react-native-paper';
import AutorController from '../../../Controllers/AutorController';
import Modal from "react-native-modal";
import { EvilIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ModalCustom from '../../../Components/ModalCustom';

const ProfileAutor = ({ selected }) => {

  const navigation = useNavigation()

  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [nome, setNome] = useState(selected ? selected.nome : "")
  const [hasBeenSaved, setHasBeenSaved] = useState(null)
  const [hasBeenDeleted, setHasBeenDeleted] = useState(null)
  const [isDisabled, setIsDisabled] = useState(selected ? true : false)
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [goBack, setGoBack] = useState(false)

  const handleSave = () => {
    setIsLoading(true)
    let obj = { nome: nome }

    setTimeout(() => {
      setHasBeenSaved({sucess: "bla"})
    }, 3000);


    /* AutorController.novoAutor(obj).then((res) => {

      setTimeout(() => {
        setHasBeenSaved(res)
      }, 2000);

    }) */
  }

  const handleEdit = () => setIsDisabled(!isDisabled)
  const handleLoading = () => { setIsLoading(!isLoading) }
  const handleQuestion = () => setShowConfirmDelete(true)

  const handleSaveExist = () => {
    console.log("gravar novas informações")
  }



  const handleSelection = (choosed) => {
    let obj = { id: selected.id }
    if (choosed) {
      setIsLoading(true)
      setTimeout(() => {
        AutorController.deletarAutor(obj).then((res) => {
          setHasBeenDeleted(res)
          setTimeout(() => {
            setGoBack(true)

          }, 2000);
        })
      }, 2000);
    }
    else console.log('cancelar')
  }

  const handleReset = () => {
    setNome("")
  }

  useEffect(() => {
    if (goBack) navigation.goBack()
  }, [goBack])


  return (
    <>

      <View style={styles.container}>
        <View style={styles.topContainer}>

        </View>
        <View style={styles.middleContainer}>
          <TextInput
            value={nome}
            onChangeText={setNome}
            disabled={isDisabled}
            mode='outlined'
            label="Nome"
          />
        </View>
        <View style={styles.bottomContainer}>
          {
            selected ?
              isDisabled ?
                <>
                  <Button onPress={() => handleQuestion()} title='Apagar' color="red" />
                  {/* <Button onPress={() => handleLoading()} title='Loading' color="blue" /> */}
                  <Button onPress={() => handleEdit()} title='Editar' color="green" />
                </>
                :
                <>
                  <Button onPress={() => handleSaveExist()} title='Gravar' color="blue" />
                  <Button onPress={() => handleEdit()} title='Cancelar' color="red" />
                </>
              :
              <Button onPress={() => handleSave()} title='Salvar Autor' />
          }

        </View>


      </View >
      <>
        {
          selected ?
            <>
              <ModalCustom
                isVisible={showConfirmDelete}
                setIsVisible={setShowConfirmDelete}
                backdropQuit={true}
                type="question"
                question={{
                  title: "Deseja confirmar a exclusão de " + selected.nome + "?",
                  handleFunction: (selection) => handleSelection(selection),
                  quitOnClick: true,
                  buttons: [
                    {
                      name: "Confirmar",
                      respond: true,
                      color: "green"
                    },
                    {
                      name: "Cancelar",
                      respond: false,
                      color: "red"
                    }
                  ]
                }}
              />
              <ModalCustom
                isVisible={isLoading}
                setIsVisible={setIsLoading}
                haveResponse={hasBeenDeleted}
                type="loadingWithRespond"
                responses={{
                  sucess: {
                    text: "Exclusão de " + selected.nome + " realizada com sucesso",
                    component: <Text>Exclusão de <Text style={{ fontWeight: '700' }}>{selected.nome}</Text> realizada com sucesso</Text>
                  }
                }}
              />
            </> :
            <ModalCustom
              isVisible={isLoading}
              setIsVisible={setIsLoading}
              haveResponse={hasBeenSaved}
              type="loadingWithRespond"
              responses={{
                sucess: {
                  text: nome + " incluso com sucesso!",
                  //component: <Text>Exclusão de <Text style={{ fontWeight: '700' }}>{selected.nome}</Text> realizada com sucesso</Text>
                },
                onFinish: () => handleReset()
              }}
            />


        }


      </>
    </>
  )
}

export default ProfileAutor