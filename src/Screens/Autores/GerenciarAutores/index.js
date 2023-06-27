import { View, Text, TouchableOpacity, FlatList, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import Tabela from '../../../Components/Tabela'
import { useNavigation, useIsFocused, DrawerActions } from '@react-navigation/native';
import AutorController from '../../../Controllers/AutorController';

const GerenciarAutores = ({ selected, setSelected, refreshAutores }) => {

  const navigation            = useNavigation()
  const focused               = useIsFocused()
  const [autores, setAutores] = useState(null)

  const fetchAutores = () => {
    setAutores(null)
    AutorController.getBuscarTodos(setAutores).then(res => setAutores(res))
  }

  useEffect(() => {
    if (focused) fetchAutores()
  }, [focused, refreshAutores])

  useEffect(() => {
    if (selected) navigation.navigate("Autor")
  }, [selected])

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
            /* title: "Autores",
            titleColor: "green",
            titleTextColor: "white", */
            headerColor: "#6db349",
            headerTextColor: "white",
            borderRadius: 5,
            zebra: ["white", "lightgreen"],
            hasRefresh: true,
            refreshButton: () => fetchAutores()
          }}
          setSelected={setSelected}

        />
      </View>
    </View>
  )
}

export default GerenciarAutores