import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import LeitorController from '../../../Controllers/LeitorController';
import { styles } from './styles';
import { TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import AutorController from '../../../Controllers/AutorController';
import ModalCustom from '../../../Components/ModalCustom';
import ObraController from '../../../Controllers/ObraController';

const Profile = ({ selected }) => {

  const navigation = useNavigation()

  const [autor, setAutor] = useState(selected ? selected.autor.nome : "")
  const [titulo, setTitulo] = useState(selected ? selected.titulo : "")
  const [goBack, setGoBack] = useState(false)
  const [autores, setAutores] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(selected ? true : false)
  const [hasBeenSaved, setHasBeenSaved] = useState(null)
  const [hasBeenDeleted, setHasBeenDeleted] = useState(null)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)

  const handleLoading = () => setIsLoading(!isLoading)
  const handleEdit = () => setIsDisabled(!isDisabled)
  const handleChangeAuthor = (itemValue) => setAutor(itemValue)
  const handleQuestion = () => setShowConfirmDelete(true)

  const handleSave = () => {
    handleLoading()
    let obj = {
      titulo: titulo,
      autor: autor
    }
    ObraController.novaObra(obj).then((res) => {
      setHasBeenSaved(res)
    }).catch((erro) => console.log(erro))

  }

  const validadeSaveBook = () => {
    if (autor == "" || titulo == "") console.log("não salva")
    else handleSave()
  }

  const handleReset = () => {
    handleLoading()
    setTitulo("")
    setAutor("")
    setHasBeenSaved(null)
  }

  const handleSelection = (choosed) => {
    let obj = { id: selected.id }
    if (choosed) {
      setIsLoading(true)
      setTimeout(() => {
        ObraController.deletarObra(obj).then((res) => {
          setHasBeenDeleted(res)
          setTimeout(() => {
            setGoBack(true)
          }, 2000);
        })
      }, 2000);
    }
    else console.log('cancelar')
  }

  useEffect(() => {
    AutorController.getBuscarTodos().then(res => setAutores(res))
  }, [])

  useEffect(() => {

  }, [autor])

  useEffect(() => {
    if (goBack) navigation.goBack()
  }, [goBack])

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>

      </View>
      <View style={styles.middleContainer}>
        <Picker
          style={{ paddingVertical: 15, paddingLeft: 10 }}
          selectedValue={autor}
          onValueChange={(itemValue, itemIndex) => handleChangeAuthor(itemValue)}
          enabled={!isDisabled}
        >
          {
            selected ?
              isDisabled ?
                <Picker.Item label={selected.autor.nome} value={selected.autor.id} />
                :
                <>
                  <Picker.Item label="Escolha um autor" value="" />
                  {
                    autores.map((item, index) => { return (<Picker.Item label={item.nome} value={item.id} key={"autor" + index} />) })
                  }
                </>
              :
              autores &&
              <>
                <Picker.Item label="Escolha um autor" value="" />
                {
                  autores.map((item, index) => { return (<Picker.Item label={item.nome} value={item.id} key={"autor" + index} />) })
                }
              </>
          }
        </Picker>

        <TextInput
          value={titulo}
          onChangeText={setTitulo}
          disabled={isDisabled}
          mode='outlined'
          label="Título"
        />
      </View>
      <View style={styles.bottomContainer}>
        {
          selected ?
            <View style={styles.buttonContainer}>
              {
                isDisabled ?
                  <>
                    <Button onPress={() => handleQuestion()} title='Apagar' color="red" />
                    <Button onPress={() => handleEdit()} title='Editar' color="green" />
                  </>
                  :
                  <>
                    <Button onPress={() => handleEdit()} title='Cancelar' color="lightgreen" />
                    <Button onPress={() => handleEdit()} title='Gravar' color="blue" />
                  </>
              }
            </View>
            :
            <Button onPress={() => validadeSaveBook()} title='Salvar novo livro' />
        }
      </View>

      {
        selected ?
          <ModalCustom
            isVisible={showConfirmDelete}
            setIsVisible={setShowConfirmDelete}
            backdropQuit={true}
            type="question"
            question={{
              title: "Deseja confirmar a exclusão de " + selected.titulo + "?",
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
          :
          <ModalCustom
            isVisible={isLoading}
            setIsVisible={setIsLoading}
            haveResponse={hasBeenSaved}
            type="loadingWithRespond"
            durationAfterResponse={3000}
            responses={{
              success: {
                component: <Text>Obra <Text style={{ fontWeight: '700' }}>{titulo}</Text> inclusa com sucesso!</Text>
              },
              onFinish: () => handleReset()
            }}

          />
      }

    </View>
  )
}

export default Profile