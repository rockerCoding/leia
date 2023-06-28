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
import EmprestimoController from '../../../Controllers/EmprestimoController';

const ProfileEmprestimo = ({ selected, setSelected }) => {

  const navigation = useNavigation()

  const [status, setStatus] = useState(selected ? selected.status : "")
  const [leitor, setLeitor] = useState(selected ? selected.leitor.nome : "")
  const [titulo, setTitulo] = useState(selected ? selected.obra.titulo : "")
  const [idEmprestimo, setIdEmprestimo] = useState(selected ? selected.id : "")
  const [dataDevolucao, setDataDevolucao] = useState(selected ? selected?.dataDevolucao == null ? " - " : formatarTimeStampUmaLinha(selected?.dataDevolucao) : "")
  const [dataEmprestimo, setDataEmprestimo] = useState(selected ? formatarTimeStampUmaLinha(selected?.dataEmprestimo) : "")

  const [leitores, setLeitores] = useState(null)
  const [obras, setObras] = useState(null)

  const [nome, setNome] = useState(selected ? selected?.nome : "")
  const [goBack, setGoBack] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(selected ? true : false)
  const [hasBeenSaved, setHasBeenSaved] = useState(null)
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [hasBeenDeleted, setHasBeenDeleted] = useState(null)
  const [hasBeenCanceled, setHasBeenCanceled] = useState(null)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)

  const [bookImage, setBookImage] = useState(null)

  const handleEdit = () => setIsDisabled(!isDisabled)
  const handleLoading = () => { setIsLoading(!isLoading) }
  const handleQuestion = () => setShowConfirmDelete(true)

  const handleReset = () => {
    handleFetch()
    setLeitor("")
    setTitulo("")
    setHasBeenSaved(null)
    setIsLoading(false)
  }

  const handleSave = () => {
    setIsLoading(true)
    let obj = {
      leitor: parseInt(leitor),
      obra: parseInt(titulo)
    }
    EmprestimoController.novoEmprestimo(obj).then((res) => {
      setTimeout(() => {
        if (res) {
          setHasBeenSaved(true)
        }
        else console.log('error')
      }, 2000);
    })
  }

  const handleChanges = () => {
    EmprestimoController.getBuscarPorId(selected.id).then((res) => {
      setSelected(res)
      setIsLoading(false)
    })
  }

  const handleCancel = () => {
    setIsLoading(true)
    let emprestimo = {
      id: selected.id,
      obra: {
        id: selected.obra.id
      }
    }
    EmprestimoController.cancelarEmprestimo(emprestimo).then((res) => {
      setTimeout(() => {
        if (res) {
          setHasBeenCanceled(res)
          setStatus("cancelado")
        }
      }, 2000);
    })
  }

  useEffect(() => {
    if (goBack) navigation.goBack()
  }, [goBack])

  const handleFetch = () => {
    setObras(null)
    LeitorController.getBuscarTodos().then(res => setLeitores(res))
    ObraController.getBuscarTodosByStatus("disponivel").then(res => setObras(res))
  }

  useEffect(() => {
    handleFetch()
  }, [])

  useEffect(() => {
    console.log(selected)
  }, [selected])
  


  const ReturnPickerList = ({ arrayOf, label, value, selectedValue, setSelectedValue, customEmptyMsg }) => {

    return (
      <Picker
        style={{ paddingVertical: 15, paddingLeft: 10 }}
        itemStyle={{ width: "70%" }}
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedValue(itemValue)
        }}>
        <Picker.Item label={customEmptyMsg ? customEmptyMsg : "Escolha uma opção"} value="" key="" enabled={false} />
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

          {
            selected ?
              <>
                <TextInput
                  value={idEmprestimo}
                  disabled
                  mode='outlined'
                  label="Id"
                />
                <TextInput
                  value={leitor}
                  disabled
                  mode='outlined'
                  label="Leitor"
                />
                <TextInput
                  value={titulo}
                  disabled
                  mode='outlined'
                  label="Título"
                />
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    style={{ flex: 1 }}
                    value={dataEmprestimo}
                    disabled
                    mode='outlined'
                    label="Data Empréstimo"
                  />
                  <TextInput
                    style={{ flex: 1, marginLeft: 10 }}
                    value={dataDevolucao}
                    disabled
                    mode='outlined'
                    label="Data Devolução"
                  />

                </View>
                <TextInput
                  value={status}
                  disabled
                  mode='outlined'
                  label="Status Atual"
                  contentStyle={{ textTransform: 'uppercase' }}
                />
              </>
              :
              <>
                {leitores && <ReturnPickerList arrayOf={leitores} label="nome" value="id" selectedValue={leitor} setSelectedValue={setLeitor} customEmptyMsg="Escolha um leitor" />}
                {obras && <ReturnPickerList arrayOf={obras} label="titulo" value="id" selectedValue={titulo} setSelectedValue={setTitulo} customEmptyMsg="Escolha uma obra" />}
              </>
          }


        </View>
        <View style={styles.bottomContainer}>
          {
            selected ?
              <>
                {
                  (selected?.status != "cancelado" && selected != "finalizado") &&
                  <>
                    <Button title='Cancelar' color="red" onPress={() => handleCancel()} />
                    <Button title='Finalizar' color="blue" />
                  </>
                }
              </> :
              <>
                <Button title='Registrar Empréstimo' color="green" onPress={() => handleSave()} />
              </>
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
              <ModalCustom
                isVisible={isLoading}
                setIsVisible={setIsLoading}
                haveResponse={hasBeenCanceled}
                type="loadingWithRespond"
                responses={{
                  success: {
                    text: "Exclusão de " + selected.nome + " realizada com sucesso",
                    component: <Text>Alteração realizada com sucesso</Text>
                  },
                  onFinish: () => handleChanges()
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
                  component: <Text style={{ fontWeight: '700' }}>Empréstimo registrado com sucesso</Text>
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