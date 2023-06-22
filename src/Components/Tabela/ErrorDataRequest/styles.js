import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'rgba(1,1,1,0.2)'
  },
  errorContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 15,
  },
  errorText: {
    color: "white",
    textTransform: 'uppercase',
    fontWeight: '200',
    marginTop: 20
  }

})