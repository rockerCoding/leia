import { View, Text, TouchableOpacity, FlatList, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import Tabela from '../../../Components/Tabela'
import { useNavigation, useIsFocused, DrawerActions } from '@react-navigation/native';
import AutorController from '../../../Controllers/AutorController';
import LeitorController from '../../../Controllers/LeitorController';

const GerenciarLeitores = ({ selected, setSelected, refreshLeitores }) => {

  const navigation            = useNavigation()
  const focused               = useIsFocused()
  const [leitores, setLeitores] = useState(null)

  const fetchLeitores = () => {
    setLeitores(null)
    LeitorController.getBuscarTodos(setLeitores).then(res => setLeitores(res))
  }

  useEffect(() => {
    if (focused) fetchLeitores()
  }, [focused, refreshLeitores])

  useEffect(() => {
    if (selected) navigation.navigate("Leitor")
  }, [selected])

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, padding: 20 }}>

        <Tabela
          data={leitores}
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
            emptyDataInformation: "Não há leitores registrados",
            selectable: true,
            borderColor: "rgba(107, 158, 128, 1)",
            listColor: "white",
            /* title: "Leitores",
            titleColor: "green",
            titleTextColor: "white", */
            headerColor: "rgba(107, 158, 128, 1)",
            headerTextColor: "white",
            borderRadius: 5,
            zebra: ["white", "rgba(107, 158, 128, 0.4)"],
            hasRefresh: true,
            refreshButton: () => fetchLeitores()
          }}
          setSelected={setSelected}

        />
      </View>
    </View>
  )
}

export default GerenciarLeitores