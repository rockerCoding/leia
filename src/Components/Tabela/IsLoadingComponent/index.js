import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { styles } from './styles'

const IsLoadingComponent = ({ configTable, size }) => {
  return (
    <View style={[styles.container, { width: size }]}>
      <View>
        <ActivityIndicator
          size={50}
          />
        <Text>Buscando informações...</Text>

      </View>
    </View>
  )
}

export default IsLoadingComponent