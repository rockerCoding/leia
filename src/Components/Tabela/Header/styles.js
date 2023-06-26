import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: Dimensions.get("screen").height * 0.05,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 0.5,
    borderStyle: 'solid',
    elevation: 10,
    
  },
  innerContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  cellHeaderContainer: {
    justifyContent: 'center', alignItems: 'center',
  },
  titleContainer: {
    justifyContent: 'center', alignItems: 'center', 

  },
  textCellHeader: {
    textTransform: "uppercase",
    letterSpacing: 2,
    fontWeight: '100'
  }
})