import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './styles'


const setColor = (bgColor) => {
  const lightColor = "white"
  const darkColor = "black"

  var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR
  var g = parseInt(color.substring(2, 4), 16); // hexToG
  var b = parseInt(color.substring(4, 6), 16); // hexToB
  return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ?
    darkColor : lightColor;
}

const Legends = ({ configTable }) => {

  let linhas = []
  let linha = []
  configTable.legends.data.forEach((item, index) => {
    if(parseInt(index / (configTable.legends.perLine - 1)) == 1) {
      linha.push(item)
      linhas.push(linha)
      linha = []
    } else {
      linha.push(item)
      if(index + 1 == configTable.legends.data.length) linhas.push(linha)
    }
  })

  let anterior = [];
  return (
    <View style={{paddingVertical: 20, backgroundColor: configTable.legends.backgroundColor}}>
      {
        linhas.map((linha, index) => {
          return (
            <View style={styles.rowContainer} key={"linhalegenda" + index}>
              {
                linha.map((legend, i) => {
                  return (
                    <Text style={[styles.legendText, { backgroundColor: legend.color, color: setColor(legend.color)} ]}
                      key={"legendalinha" + index + i}
                    >{legend.name}</Text>
                  )
                })
              }
            </View>
          )
         
        })
      }
    </View>
  )
}

export default Legends