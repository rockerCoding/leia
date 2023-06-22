import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(1,1,1,0.2)'
  },
  innerContainer: {
    padding: 40, 
    borderRadius: 10,
    height: Dimensions.get("screen").height / 5,
    width: '100%',
    justifyContent: 'center', alignItems: 'center'
  },
  loadingContainer: {
    backgroundColor: '#339900',
  },
  errorContainer: {
    backgroundColor: '#cc3300',
  },
  emptyContainer: {
    backgroundColor: 'white'
  },
  loadingText: {
    color: 'white'
  },
  innerText: {
    textTransform: 'uppercase', textAlign: 'center',
    marginTop: 20,
  },
  innerTextEmpty: {
    color: 'black'
  }
})