import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './styles'

const Header = ({ configs, configTable, loading }) => {
  return (
    configs ?
      <View style={styles.container}>

        <View style={styles.innerContainer}>
          {
            configs?.map((config, index) => {
              return (
                <View
                  style={[styles.cellHeaderContainer,
                  {
                    width: config["size"],
                    borderRightColor: 'lightgrey', borderStyle: 'solid', borderRightWidth: configs.length == index - 1 ? 0 : 0.5,
                    backgroundColor: configTable.headerColor ? configTable.headerColor : "lightgrey"

                  }
                  ]}
                  key={"header" + config["name"]}>
                  <Text style={[styles.textCellHeader, { color: configTable.headerTextColor}]}>{config["alias"]}</Text>
                </View>
              )
            })
          }
        </View>
      </View> :
      <View style={styles.container}>
        <View style={[styles.innerContainer, {width: loading?.size}]}>
          <Text>aaaa</Text>
        </View>
      </View>
  )

}

export default Header