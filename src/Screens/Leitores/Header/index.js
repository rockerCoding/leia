import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

const BACKGROUND_THEME_COLOR = "rgba(107, 158, 128, 1)"

const HeaderAutor = (props) => {

  const [canGoBack, setCanGoBack] = useState(false)
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    if (props) setCanGoBack(props.navigation.canGoBack() ? true : false)
    if (props.selected) setIsSelected(true)
    else setIsSelected(false)
  }, [props])

  const handleNewAuthor = () => {
    props.setSelected(null)
    props.navigation.navigate("Novo Autor")
  }

  const handleRefresh = () => {
    props.handleRefresh()
  }

  const rightIconProfile = (selected, name) => {

    switch (name) {
      case "Autores":
        return (
          <>
            {
              props.handleRefresh &&
              <TouchableOpacity onPress={() => handleRefresh()} style={{ position: 'relative' }} >
                <Ionicons name="md-refresh-sharp" size={20} color="white" />
              </TouchableOpacity>
            }
            <TouchableOpacity onPress={() => handleNewAuthor()} style={{ position: 'relative' }} >
              <FontAwesome5 name="book-reader" size={20} color="white" />
              <Text style={{ fontSize: 20, position: 'absolute', fontWeight: '700', right: -10, bottom: -10, color: 'white' }}>+</Text>
            </TouchableOpacity>
          </>
        )
        break;
      case "Profile":
        return (
          <TouchableOpacity onPress={() => props.navigation.navigate("Empréstimos")}>
            <AntDesign name="profile" size={24} color="black" />
          </TouchableOpacity>
        )
      default:
        return (<></>)
    }

  }

  const handleGoBack = (name) => {
    if (name = "Profile") {
      props.setSelected(null)
    }

    props.navigation.goBack()
  }


  return (
    props &&
    <View style={[styles.container, { backgroundColor: BACKGROUND_THEME_COLOR }]}>
      <View style={styles.leftContainer}>
        {
          canGoBack &&
          <Pressable onPress={() => handleGoBack(props.route.name)}>
            <Ionicons name="caret-back" size={25} color="white" />
          </Pressable>
        }
      </View>
      <View style={styles.middleContainer}>
        <Text style={styles.textTitle}>{props.route.name}</Text>
      </View>
      <View style={styles.rightContainer}>
        {rightIconProfile(isSelected, props.route.name)}
      </View>
    </View>
  )
}

export default HeaderAutor