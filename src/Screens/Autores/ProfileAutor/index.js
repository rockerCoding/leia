import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import LeitorController from '../../../Controllers/LeitorController';
import { styles } from './styles';
import { TextInput } from 'react-native-paper';
import AutorController from '../../../Controllers/AutorController';

const ProfileAutor = ({ selected }) => {

  useEffect(() => {
    console.log(selected)

  }, [selected])
  

  const [nome, setNome] = useState(selected ? selected.nome : "")
  const [hasBeenSaved, setHasBeenSaved] = useState(null)
  const [isDisabled, setIsDisabled] = useState(selected ? true : false)

  const handleSave = () => {
    let obj = {
      nome: nome
    }
    AutorController.novoAutor(obj).then((res) => {
      setHasBeenSaved(res)
    })
  }

  const handleEdit = () => {
    setIsDisabled(!isDisabled)
  }

  return (
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
      <View style={styles.topContainer}>
        {
          selected ?
            <View style={styles.buttonContainer}>
              {
                isDisabled ?
                  <Button  onPress={() => handleEdit()} title='Editar' color="green" />
                  :
                  <>
                    <Button onPress={() => handleEdit()} title='Cancelar' color="lightgreen" />
                    <Button onPress={() => handleEdit()} title='Gravar' color="blue" />
                  </>
              }
            </View>
            :
            <Button onPress={() => handleSave()} title='Salvar Autor' />
        }

      </View>


    </View>
  )
}

export default ProfileAutor