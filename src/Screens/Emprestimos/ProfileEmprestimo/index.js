import { View, Text, Button, Pressable, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import LeitorController from '../../../Controllers/LeitorController';
import { styles } from './styles';
import { TextInput } from 'react-native-paper';
import AutorController from '../../../Controllers/AutorController';
import Modal from "react-native-modal";
import { EvilIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ModalCustom from '../../../Components/ModalCustom';
import { formatarTimeStampUmaLinha } from '../../../Utils/dateUtils'
import { Picker } from '@react-native-picker/picker';
import ObraController from '../../../Controllers/ObraController';

const ProfileEmprestimo = ({ selected }) => {

  const navigation = useNavigation()

  const [status, setStatus] = useState(selected ? selected.status : "")
  const [leitor, setLeitor] = useState(selected ? selected.leitor.nome : "")
  const [titulo, setTitulo] = useState(selected ? selected.obra.titulo : "")
  const [idEmprestimo, setIdEmprestimo] = useState(selected ? selected.id : "")
  const [dataDevolucao, setDataDevolucao] = useState(selected ? formatarTimeStampUmaLinha(selected.dataDevolucao) : "")
  const [dataEmprestimo, setDataEmprestimo] = useState(selected ? formatarTimeStampUmaLinha(selected.dataEmprestimo) : "")

  const [leitores, setLeitores] = useState(null)
  const [obras, setObras] = useState(null)

  const [nome, setNome] = useState(selected ? selected.nome : "")
  const [goBack, setGoBack] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(selected ? true : false)
  const [hasBeenSaved, setHasBeenSaved] = useState(null)
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [hasBeenDeleted, setHasBeenDeleted] = useState(null)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)

  const [bookImage, setBookImage] = useState(null)

  const handleEdit = () => setIsDisabled(!isDisabled)
  const handleLoading = () => { setIsLoading(!isLoading) }
  const handleQuestion = () => setShowConfirmDelete(true)

  const handleSave = () => {
    handleLoading()
    AutorController.novoAutor({ nome: nome }).then((res) => {
      setHasBeenSaved(res)
    })
  }

  const handleSelection = (choosed) => {
    let obj = { id: selected.id }
    if (choosed) {
      setIsLoading(true)
      setTimeout(() => {
        AutorController.deletarAutor(obj).then((res) => {
          setHasBeenDeleted(res)
          setTimeout(() => {
            setGoBack(true)
          }, 2000);
        })
      }, 2000);
    }
    else console.log('cancelar')
  }

  const handleReset = () => {
    setNome("")
    setHasBeenSaved(null)
    setIsLoading(false)
  }

  useEffect(() => {
    if (goBack) navigation.goBack()
  }, [goBack])

  useEffect(() => {
    LeitorController.getBuscarTodos().then(res => setLeitores(res))
    ObraController.getBuscarTodos().then(res => setObras(res))
  }, [])

  useEffect(() => {
    console.log(leitores)
  }, [leitores])
  useEffect(() => {
    console.log(obras)
  }, [obras])
  


  const ReturnPickerList = ({ arrayOf, label, value, selectedValue, setSelectedValue }) => {

    return (
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedValue(itemValue)
        }}>
        {
          arrayOf.map((item, index) => {
            return (
              <Picker.Item label={item[label]} value={item[value]} key={item[value] + item[label]} />
            )
          })
        }
      </Picker>
    )

  }



  return (
    <>

      <View style={styles.container}>
        <View style={styles.topContainer}>

        </View>
        <View style={styles.middleContainer}>

          {selected &&
            <TextInput
              value={idEmprestimo}
              disabled
              mode='outlined'
              label="Id"
            />
          }
          {
            selected ?
              <>
                <TextInput
                  value={leitor}
                  disabled={selected == null}
                  mode='outlined'
                  label="Leitor"
                />
              </>
              :
              <>
                {leitores && <ReturnPickerList arrayOf={leitores} label="nome" value="id" selectedValue={leitor} setSelectedValue={setLeitor} />}
                {obras && <ReturnPickerList  arrayOf={obras} label="titulo" value="id" selectedValue={titulo} setSelectedValue={setTitulo} />}
              </>

          }
          <TextInput
            value={titulo}
            disabled
            mode='outlined'
            label="Título"
          />
          <TextInput
            value={dataEmprestimo}
            disabled
            mode='outlined'
            label="Data Empréstimo"
          />
          <TextInput
            value={dataDevolucao}
            disabled
            mode='outlined'
            label="Data Devolução"
          />
          <TextInput
            value={status}
            disabled
            mode='outlined'
            label="Status Atual"
            contentStyle={{ textTransform: 'uppercase' }}
          />
        </View>
        <View style={styles.bottomContainer}>
          {
            selected &&
            <Button title='Editar' color="green" />
          }

        </View>


      </View >
      <>
        {
          selected ?
            <>
              <ModalCustom
                isVisible={showConfirmDelete}
                setIsVisible={setShowConfirmDelete}
                backdropQuit={true}
                type="question"
                question={{
                  title: "Deseja confirmar a exclusão de " + selected.nome + "?",
                  handleFunction: (selection) => handleSelection(selection),
                  quitOnClick: true,
                  buttons: [
                    {
                      name: "Confirmar",
                      respond: true,
                      color: "green"
                    },
                    {
                      name: "Cancelar",
                      respond: false,
                      color: "red"
                    }
                  ]
                }}
              />
              <ModalCustom
                isVisible={isLoading}
                setIsVisible={setIsLoading}
                haveResponse={hasBeenDeleted}
                type="loadingWithRespond"
                responses={{
                  success: {
                    text: "Exclusão de " + selected.nome + " realizada com sucesso",
                    component: <Text>Exclusão de <Text style={{ fontWeight: '700' }}>{selected.nome}</Text> realizada com sucesso</Text>
                  }
                }}
              />
            </> :
            <ModalCustom
              isVisible={isLoading}
              setIsVisible={setIsLoading}
              haveResponse={hasBeenSaved}
              type="loadingWithRespond"
              durationAfterResponse={3000}
              responses={{
                success: {
                  //text: nome + " incluso com sucesso!",
                  component: <Text>Inclusão de <Text style={{ fontWeight: '700' }}>{nome}</Text> realizada com sucesso</Text>
                },
                onFinish: () => handleReset()
              }}
            />


        }


      </>
    </>
  )
}

export default ProfileEmprestimo