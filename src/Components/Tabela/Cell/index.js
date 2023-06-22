import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import { styles } from './styles'

const getValue = (obj, path) => {
  if (!path) return obj;
  const properties = path.split('.');
  return getValue(obj[properties.shift()], properties.join('.'))
}

const Cell = ({item, cellConfig}) => {
  
  const innerStyles = StyleSheet.create({
    cellText: {
      textAlign: cellConfig["type"] == "numeric" ? "right" : "center",
      marginRight: cellConfig["type"] == "numeric" ? 5 : 0,
    }
  })

  var valueItem = getValue(item, cellConfig["name"])

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
      <Text style={innerStyles.cellText}>{valueItem}</Text>
    </View>
  )
}

export default Cell