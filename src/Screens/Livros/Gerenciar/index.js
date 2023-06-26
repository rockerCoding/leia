import { View, Text, TouchableOpacity, FlatList, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import Tabela from '../../../Components/Tabela'
import { useNavigation, useIsFocused } from '@react-navigation/native';
import LeitorController from '../../../Controllers/LeitorController'
import ObraController from '../../../Controllers/ObraController';

const contaId = (data) => {
  let id = 0
  data.forEach((item) => {
    if (item.id > id) id = item.id
  })
  return id + 1
}


const GerenciarLivros = ({selected, setSelected}) => {

  const navigation = useNavigation()
  const focused = useIsFocused()

  const [livros, setLivros]         = useState(null)
  const [autor, setAutor]           = useState("")
  const [nome, setNome]             = useState("")

  useEffect(() => {
    if(focused){
      ObraController.getBuscarTodos().then(res => setLivros(res))
    }
  }, [focused])

  useEffect(() => {
    console.log(livros)
  }, [livros])
  

  useEffect(() => {
    if(selected) navigation.navigate("Livro")
  }, [selected])

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, padding: 20 }}>
        
        <Tabela
          data={livros}
          configColumns={[
            {
              name: "id",
              size: "20%",
              type: "numeric"
            },
            {
              name: "titulo",
              size: "40%",
              type: "text"
            },
            {
              name: "autor.nome",
              alias: "autor",
              size: "40%",
              type: "text"
            }/* ,
            {
              name: "status",
              alias: "Status",
              size: "40%",
              type: "text"
            } */
          ]}
          configTable={{
            emptyDataInformation: "Não há livros registrados",
            selectable: true,
            borderColor: "blue",
            listColor: "white",
            /* title: "Lista de Livros", 
            titleColor: "#436ed4",
            titleTextColor: "white",*/
            headerColor: "#436ed4",
            headerTextColor: "whitesmoke",
            borderRadius: 5,
            zebra: ["white", "#cddcfc"]
          }}
          setSelected={setSelected}
        />
      </View>
    </View>
  )
}

export default GerenciarLivros