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

  const [nome, setNome] = useState(selected ? selected.nome : "")
  const [autor, setAutor] = useState(selected ? selected.autor.nome : "")
  const [isLoading, setIsLoading] = useState(false)

  const [autores, setAutores] = useState(null)
  const [hasBeenSaved, setHasBeenSaved] = useState(null)
  const [isDisabled, setIsDisabled] = useState(selected ? true : false)

  useEffect(() => {
    AutorController.getBuscarTodos().then(res => setAutores(res))
  }, [])


  const handleSave = () => {
    setIsLoading(true)
    let obj = {
      titulo: nome,
      autor: autor
    }
    ObraController.novaObra(obj).then((res) => {
      setHasBeenSaved(res)
    }).catch((erro) => console.log(erro))
    
  }

  const handleEdit = () => setIsDisabled(!isDisabled)
  const handleChangeAuthor = (itemValue) => setAutor(itemValue)

  const validadeSaveBook = () => {
    if (autor == "" || nome == "") console.log("não salva")
    else handleSave()
  }
  const handleReset = () => {
    console.log('resetar')
  }

  useEffect(() => {
    console.log(hasBeenSaved)
  }, [hasBeenSaved])
  

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
                <Picker.Item label={selected.autor.nome} value={selected.autor.id} /> :
                <>
                  <Picker.Item label="Escolha um autor" value="" />
                  {
                    autores.map((item, index) => {
                      return (
                        <Picker.Item label={item.nome} value={item.id} key={"autor" + index} />
                      )
                    })
                  }
                </>
              :
              autores &&
              <>
                <Picker.Item label="Escolha um autor" value="" />
                {
                  autores.map((item, index) => {
                    return (
                      <Picker.Item label={item.nome} value={item.id} key={"autor" + index} />
                    )
                  })
                }

              </>
          }
        </Picker>

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
            <View style={styles.buttonContainer}>
              {
                isDisabled ?
                  <Button onPress={() => handleEdit()} title='Editar' color="green" />
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

      <ModalCustom
        isVisible={isLoading}
        setIsVisible={setIsLoading}
        haveResponse={hasBeenSaved}
        type="loadingWithRespond"
        responses={{
          sucess: {
            text: nome + " incluso com sucesso!",
          },
          onFinish: () => handleReset()
        }}
        
      />
    </View>
  )
}

export default Profile