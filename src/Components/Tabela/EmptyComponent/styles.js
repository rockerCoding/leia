import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    //height: Dimensions.get("screen").height * 0.65,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly', alignItems: 'center',
  },
  textEmpty: {
    
    letterSpacing: 2,
    textTransform: "uppercase",
    fontWeight: '100'
  }
})