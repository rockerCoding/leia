import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: Dimensions.get("screen").height * 0.07,
    //marginVertical: 10,
    backgroundColor: 'red',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10

  },
  allCenter: {
    justifyContent: 'center', alignItems: 'center'
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center', alignItems: 'center',
    marginTop: 2
  }, 


  // middle
  middleContainer: {
    flex: 5,
    justifyContent: 'center', alignItems: 'center'
  },
  textTitle: {
    textTransform: "uppercase",
    fontSize: 20,
    color: "white",
    letterSpacing: 1

  },

  // Opcao por pagina
  rightContainer: {
    flex: 1,
    justifyContent: 'center', alignItems: 'flex-start',
    //marginRight: 5
  }
})