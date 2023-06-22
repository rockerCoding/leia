import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { Ionicons } from '@expo/vector-icons';

const EmptyComponent = ({configs, message}) => {
  let size = 0
  configs.forEach((item) => size += item["size"])

  return (
    <View style={[styles.container, { width: size}]}>
      <Ionicons name="ios-warning-outline" size={24} color="lightgreen" />
      <Text style={styles.textEmpty}>{message}</Text>
    </View>
  )
}

export default EmptyComponent