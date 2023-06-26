import { View, Text, TouchableOpacity, FlatList, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import Tabela from '../../../Components/Tabela'
import { useNavigation, useIsFocused, DrawerActions } from '@react-navigation/native';
import AutorController from '../../../Controllers/AutorController';
import EmprestimoController from '../../../Controllers/EmprestimoController';

const GerenciarEmprestimos = ({ selected, setSelected }) => {

  const navigation            = useNavigation()
  const focused               = useIsFocused()
  const [emprestimos, setEmprestimos] = useState(null)

  const fetchAutores = () => {
    setEmprestimos(null)
    EmprestimoController.getBuscarTodos().then(res => setEmprestimos(res))
  }

  useEffect(() => {
    console.log(emprestimos)
  
  }, [emprestimos])
  

  useEffect(() => {
    if (focused) fetchAutores()
  }, [focused])

  useEffect(() => {
    if (selected) navigation.navigate("Empréstimo")
  }, [selected])

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, padding: 20 }}>

        <Tabela
          data={emprestimos}
          configColumns={[
            {
              name: "id",
              size: "20%",
              type: "numeric"
            },
            {
              name: "leitor.nome",
              size: "30%",
              type: "text",
              alias: "leitor"
            },
            {
              name: "obra.titulo",
              size: "30%",
              type: 'text',
              alias: 'Título'
            },
            {
              name: "dataEmprestimo",
              size: "30%",
              type: 'date/timestamp',
              alias: "Empréstimo"
            },
            {
              name: "dataDevolucao",
              size: "30%",
              type: 'date/timestamp',
              alias: "Devolução"
            }
          ]}
          configTable={{
            emptyDataInformation: "Não há empréstimos registrados",
            selectable: true,
            borderColor: "red",
            listColor: "white",
            /* title: "Autores",
            titleColor: "green",
            titleTextColor: "white", */
            headerColor: "rgba(172, 27, 102, 0.8)",
            headerTextColor: "white",
            borderRadius: 5,
            zebra: ["white", "rgba(219, 157, 189, 0.8)"],
            hasRefresh: true,
            refreshButton: () => fetchAutores()
          }}
          setSelected={setSelected}

        />
      </View>
    </View>
  )
}

export default GerenciarEmprestimos