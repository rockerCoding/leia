import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { MaterialIcons } from '@expo/vector-icons';

const ErrorDataRequest = ({ message, size }) => {
  return (
    <View style={[styles.container, { width: size}]}>
      <View style={styles.errorContainer}>
        <MaterialIcons name="error" size={50} color="white" />
        <Text style={styles.errorText}>{message}</Text>
      </View>

    </View>
  )
}

export default ErrorDataRequest