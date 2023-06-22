import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: Dimensions.get("screen").height * 0.08,
    marginVertical: 10
    
  },
  allCenter: {
    justifyContent: 'center', alignItems: 'center'
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center', alignItems: 'center'
  }, 


  // middle
  middleContainer: {
    flex: 5,
    justifyContent: 'center', alignItems: 'center'
  },
  textTitle: {
    textTransform: "uppercase",
    fontSize: 30,
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: 'blue',
    color: "white"

  },

  // Opcao por pagina
  rightContainer: {
    flex: 1,
    justifyContent: 'center', alignItems: 'center'
  }
})