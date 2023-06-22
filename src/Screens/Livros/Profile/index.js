import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import LeitorController from '../../../Controllers/LeitorController';
import { styles } from './styles';
import { TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import AutorController from '../../../Controllers/AutorController';

const Profile = ({ selected }) => {

  console.log(selected)

  const [nome, setNome] = useState(selected ? selected.nome : "")
  const [autor, setAutor] = useState(selected ? selected.autor.nome : "")

  const [autores, setAutores] = useState(null)
  const [hasBeenSaved, setHasBeenSaved] = useState(null)
  const [isDisabled, setIsDisabled] = useState(selected ? true : false)

  useEffect(() => {
    AutorController.getBuscarTodos().then(res => setAutores(res))
  }, [])


  const handleSave = () => {
    let obj = {
      nome: nome,
      autor: autor
    }
    LeitorController.novoLivro(obj).then((res) => {
      setHasBeenSaved(res)
    })
  }

  const handleEdit = () => {
    setIsDisabled(!isDisabled)
  }

  const handleChangeAuthor = (itemValue) => {
    setAutor(itemValue)
  }

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
            <Button onPress={() => handleSave()} title='Salvar novo livro' />
        }

      </View>


    </View>
  )
}

export default Profile