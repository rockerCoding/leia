import { View, Text, TouchableOpacity, FlatList, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import Tabela from '../../../Components/Tabela'
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AutorController from '../../../Controllers/AutorController';

const GerenciarAutores = ({ selected, setSelected }) => {

  const navigation = useNavigation()
  const focused = useIsFocused()

  const [autores, setAutores] = useState(null)

  useEffect(() => {
    console.log(autores)
  }, [autores])


  useEffect(() => {
    if (focused) {
      AutorController.getBuscarTodos().then(res => setAutores(res))
    }
  }, [focused])

  useEffect(() => {
    if (selected) navigation.navigate("Autor")
  }, [selected])

  function handleRefresh(){
    console.log('refresh data')
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, padding: 20 }}>

        <Tabela
          data={autores}
          configColumns={[
            {
              name: "id",
              size: "20%",
              type: "numeric"
            },
            {
              name: "nome",
              size: "80%",
              type: "text"
            }
          ]}
          configTable={{
            emptyDataInformation: "Não há autores registrados",
            selectable: true,
            borderColor: "green",
            listColor: "white",
            title: "Lista de Autores",
            titleColor: "green",
            titleTextColor: "white",
            headerColor: "blue",
            headerTextColor: "white",
            borderRadius: 5,
            zebra: ["white", "lightgreen"],
            hasRefresh: true,
            refreshButton: () => handleRefresh()
          }}
          setSelected={setSelected}

        />
      </View>
    </View>
  )
}

export default GerenciarAutores