import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { MaterialIcons } from '@expo/vector-icons';

const AlertTable = ({ type, size, message }) => {

  console.loe
  const ReturnTypeAlert = () => {
    switch (type) {
      case "loading":
        return (
          <View style={[styles.loadingContainer, styles.innerContainer]}>
            <ActivityIndicator size={50} color="white"/>
            <Text style={[styles.loadingText, styles.innerText]}>{message}</Text>
          </View>
        )   
        break;
      case "error":
        return (
          <View style={[styles.errorContainer, styles.innerContainer]}>
            <MaterialIcons name="error-outline" size={60} color="white" />
            <Text style={[styles.loadingText, styles.innerText]}>{message}</Text>
          </View>
        )
        break;
      case "empty":
        return (
          <View style={[styles.emptyContainer, styles.innerContainer]}>
            <MaterialIcons name="warning" size={60} color="yellow" />
            <Text style={[styles.loadingText, styles.innerText, styles.innerTextEmpty]}>{message}</Text>
          </View>
        )
      default:
        break;
    }
  }
  

  return (
    <View style={[styles.container, { width: size}]}>
      <View style={styles.innerContainer}>
        {ReturnTypeAlert()}
        
      </View>
    </View>
  )
}

export default AlertTable