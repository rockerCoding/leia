import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Tabela from '../../../Components/Tabela'

const EmprestimosPorLivro = ({selected}) => {

  const [emprestimos, setEmprestimos] = useState(null)
  const [emprestimo, setEmprestimo] = useState(null)

  useEffect(() => {
    // axios para buscar o emprestimo de um determinado livro
    const data = [
      {
        id: 10,
        idLivro: 1,
        idUsuario: 5,
        alugadoEm: "10/09/2019",
        devolvidoEm: "13/09/2019"
      },
      {
        id: 11,
        idLivro: 1,
        idUsuario: 5,
        alugadoEm: "17/10/2021",
        devolvidoEm: "13/11/2021"
      }
    ]

    setTimeout(() => {
      
      setEmprestimos(data)
    }, 3000);
  }, [])
  

  return (
    <View style={{flex: 1,padding: 20}}>
      <Text>{emprestimo?.id}</Text>
      <Tabela 
        data={emprestimos}
        configColumns={[
          {
            name: "id",
            size: "15%",
            type: "numeric"
          },
          {
            name: "idLivro",
            size: "40%",
            type: "numeric"
          },
          {
            name: "idUsuario",
            size: "40%",
            type: "numeric"
          },
          {
            name: "alugadoEm",
            alias: "Alugado",
            size: "40%",
            type: "numeric"
          },
          {
            name: "devolvidoEm",
            alias: "Devolvido",
            size: "40%",
            type: "numeric"
          }
        ]}

        configTable={{
          emptyDataInformation: "Não há livros registrados",
          selectable: false,
          borderColor: "blue",
          listColor: "white",
          title: "Lista de Livros",
          titleColor: "blue",
          titleTextColor: "white",
          headerColor: "blue",
          headerTextColor: "white",
          borderRadius: 5,
          zebra: ["white", "#A5BEFA"]
        }}
        seleted={emprestimos}
        setSelected={setEmprestimo}
      
      />

    </View>
  )
}

export default EmprestimosPorLivro