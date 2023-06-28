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

  const fetchEmprestimos = () => {
    setEmprestimos(null)
    EmprestimoController.getBuscarTodos().then(res => setEmprestimos(res))
  }

  useEffect(() => {
  
  }, [emprestimos])
  

  useEffect(() => {
    if (focused) fetchEmprestimos()
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
              type: "custom",
              component: (item) =>  
                <View style={{justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row'}}>
                  <View style={{width: 15, height: 15, 
                    backgroundColor: item["status"] == "cancelado" ? 'red' : item["status"] == "emprestado" ? 'lightgreen' : "blue", 
                    borderRadius: 20}} />
                  <Text>{item["id"]}</Text>
                </View>
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
            },
            {
              name: "status",
              size: "30%",
              type: 'text',
              alias: "Status"
            }
          ]}
          configTable={{
            emptyDataInformation: "Não há empréstimos registrados",
            selectable: true,
            borderColor: "#42628C",
            listColor: "white",
            headerColor: "#42628C",
            headerTextColor: "white",
            borderRadius: 5,
            zebra: ["white", "#d2d1d1"],
            hasRefresh: true,
            refreshButton: () => fetchAutores(),
            legends: {
              backgroundColor: "#42628C",
              perLine: 3,
              data : [
                { name: "cancelado", color: '#FF0000' },
                /* { name: "em atraso", color: '#FFFF00' }, */
                { name: "emprestado", color: '#90EE90' },
                { name: "devolvido", color: '#0000FF' }
              ]
            }
          }}
          setSelected={setSelected}

        />
      </View>
    </View>
  )
}

export default GerenciarEmprestimos