import { View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Pressable, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import Row from './Row'
import TabelaProvider from '../../Contexts/TabelaContext'
import Header from './Header'
import EmptyComponent from './EmptyComponent'
import ErrorDataRequest from './ErrorDataRequest'
import IsLoadingComponent from './IsLoadingComponent'
import AlertTable from './AlertTable'
import { Ionicons } from '@expo/vector-icons';

const percentToPixels = (valor, total) => {
  let value = parseInt(valor.split("%")[0])
  return total * (value / 100)
}

const Tabela = ({ data, configTable, configColumns, setSelected, rowCondition }) => {

  const [title, setTitle] = useState(null)
  const [namesColumns, setNamesColumns] = useState(null)
  const [sizesColumns, setSizesColumns] = useState(null)
  const [typesColumns, setTypesColumns] = useState(null)
  const [isReady, setIsReady] = useState(false)
  const [totalContainer, setTotalContainer] = useState(null)
  const [configs, setConfigs] = useState(null)
  const [initialSizeData, setInitialSizeData] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    setTitle(configTable?.title ? configTable.title : null)
    setError(null)
    if (data && totalContainer) {
      if (typeof (data) == "string") setError(data)
      startConfig()
    }
    else {
      setIsReady(false)
      startConfigNull()
    }

  }, [data, totalContainer])

  useEffect(() => {
    setIsReady(true)
  }, [configs])

  const startConfigNull = () => {
    let obj = {
      alias: "Loading",
      size: totalContainer,
      type: "text",
    }
    setIsLoading([obj])
  }

  const startConfig = () => {

    let initialNamesColumns = []
    let initialAliasColumns = []
    let initialSizesColumns = []
    let initialTypesColumns = []

    configColumns.forEach((i) => {
      initialNamesColumns.push(i["name"])
      initialAliasColumns.push(i["alias"] ? i["alias"] : i["name"])
      initialSizesColumns.push(percentToPixels(i["size"], totalContainer))
      initialTypesColumns.push(i["type"])
    })

    let initialConfigs = []

    configColumns.forEach((_, i) => {
      let obj = {
        name: initialNamesColumns[i],
        size: initialSizesColumns[i],
        type: initialTypesColumns[i],
        alias: initialAliasColumns[i]
      }
      initialConfigs.push(obj)
    })

    setConfigs(initialConfigs)
  }

  const innerStyles = StyleSheet.create({
    container: {
      flex: 1,
      borderWidth: 0.5,
      borderColor: configTable?.borderColor ? configTable.borderColor : "white",
      borderStyle: 'solid',
      borderRadius: configTable ? configTable.borderRadius : 0
    },
    flatlistContainer: {
      backgroundColor: configTable?.listColor ? configTable?.listColor : "white",
    },
    tableContainer: {

    },
    titleContainer: {
      justifyContent: 'center', alignItems: 'center',
      backgroundColor: configTable?.titleColor ? configTable?.titleColor : "white",
      height: Dimensions.get("screen").height * 0.05,
      flexDirection: 'row'
    },
    titleText: {
      letterSpacing: 5,
      textTransform: "uppercase",
      color: configTable?.titleTextColor ? configTable?.titleTextColor : "black"
    },
    isLoadingContainer: {
      flex: 1,
      justifyContent: 'center', alignItems: 'center',
      borderWidth: 1, borderColor: configTable.borderColor, borderStyle: 'solid',
      backgroundColor: configTable.listColor
    },
    isEmptyData: {
      flex: 1,
      width: totalContainer,
      justifyContent: 'center', alignItems: 'center'
    },
    titleRefreshButtonContainer: {
      position: 'absolute', right: 0, 
      marginRight: 10,
    }
  })

  const Title = ({hasRefresh, refreshButton}) => {

    return (
      <View style={innerStyles.titleContainer}>
        <Text style={innerStyles.titleText}>{title}</Text>
        {
          configTable.hasRefresh && 
          <Pressable style={innerStyles.titleRefreshButtonContainer} onPress={() => configTable.refreshButton()}>
            <Ionicons name="ios-refresh" size={24} color="white" />
          </Pressable>
        }
      </View>
    )
  }

  const handleSelected = (item) => {
    setSelected(item)
  }

  return (
    <TabelaProvider>
      <View style={innerStyles.container}>
        {title && <Title />}

        <ScrollView
          horizontal
          style={[innerStyles.tableContainer]}
          onLayout={(e) => setTotalContainer(e.nativeEvent.layout.width)}
        >
          {
            data ?
            !error ?
              data.length > 0 ?
                <FlatList
                  data={data}
                  style={innerStyles.flatlistContainer}
                  stickyHeaderIndices={[0]}
                  ListHeaderComponent={<Header configs={configs} configTable={configTable}/>}
                  ListEmptyComponent={<EmptyComponent configs={configs} message={configTable?.emptyDataInformation ? configTable.emptyDataInformation : "Não há dados para serem exibidos"} />}
                  renderItem={({ item, index }) =>
                    <TouchableOpacity onPress={() => handleSelected(item)}
                      style={{ backgroundColor: configTable?.zebra ? configTable.zebra[index % 2] : "white" }}
                    >
                      <Row
                        item={item}
                        index={index}
                        configs={configs}
                        conditions={rowCondition}
                        key={"row" + index} />
                    </TouchableOpacity>
                  }
                /> :
                <AlertTable type="empty" message={configTable.emptyDataInformation} size={totalContainer}/>
              : <AlertTable type="error" message={data} size={totalContainer}/>
            : <AlertTable type="loading" size={totalContainer} message={"Buscando informações " + (title ? "de " + title : "") }/>
          }
        </ScrollView>
      </View>
    </TabelaProvider>
  )
}

export default Tabela