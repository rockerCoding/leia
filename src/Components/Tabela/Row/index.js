import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import Cell from '../Cell'

const Row = ({ item, index, totalContainer, configs, conditions }) => {
  
  return (
    configs &&
    <View style={[styles.container, { width: totalContainer }]}>
      {
        configs.map((config, i) => {
          return (
            <Cell 
              item={item} 
              cellConfig={config}
              key={"row" + index + "cell" + i}
            />
          )
        })
      }

    </View>
  )
}

export default Row