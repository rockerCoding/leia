import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import { styles } from './styles'

const getValue = (obj, path) => {
  if (!path) return obj;
  const properties = path.split('.');
  return getValue(obj[properties.shift()], properties.join('.'))
}

const convertDateType = (type, timestamp) => {
  if (type.includes("timestamp")) {
    const data = new Date(timestamp * 1000);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    const segundos = String(data.getSeconds()).padStart(2, '0');

    let datas = []
    datas.push(`${dia}/${mes}/${ano}`)
    datas.push(`${horas}:${minutos}:${segundos}`)
    
    return datas;
  }
}

const Cell = ({ item, cellConfig }) => {

  const innerStyles = StyleSheet.create({
    cellText: {
      textAlign: cellConfig["type"] == "numeric" ? "right" : "center",
      marginRight: cellConfig["type"] == "numeric" ? 5 : 0,
    }
  })

  var valueItem = getValue(item, cellConfig["name"])
  if (cellConfig["type"].includes("date")) valueItem = convertDateType(cellConfig["type"], valueItem)

  return (
    <View
      style={[styles.container,
      {
        width: cellConfig["size"],
        borderRightColor: 'lightgrey',
        borderRightWidth: 0.5,
        borderStyle: 'solid'
      }
      ]} >
        {
          cellConfig["type"].includes("date") ? 
          <View>
            {
              valueItem.map((data) => {
                return (
                  <Text style={innerStyles.cellText} key={"data" + data}>{data}</Text>
                )
              })
            }
          </View> :
          <Text style={innerStyles.cellText}>{valueItem}</Text>
        }
      
    </View>
  )
}

export default Cell