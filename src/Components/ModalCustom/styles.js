import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', alignItems: 'center'
  },
  modalContainer: {
    width: Dimensions.get("screen").width * 0.8,
    minHeight: Dimensions.get("screen").height * 0.3,
    backgroundColor: 'white',
    justifyContent: 'center', alignItems: 'center',
    borderRadius: 10,
    padding: 20
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center', alignItems: 'center', 
  },
  bottomContainer: {
    flex: 1, flexDirection: 'row',
    justifyContent: 'space-evenly', alignItems: 'center',
  },
  textTitle: {
    textAlign: 'center'
  },


  // buttons
  buttonContainer: {
    paddingHorizontal: 35,
    paddingVertical: 15,
    borderRadius: 10,
  },
  textButton: {
    color: 'white'
  },

  // responses
  responseContainer: {
    flex: 1,
    justifyContent: 'center', alignItems: 'center'
  },


  // loading
  textLoading: {
    letterSpacing: 2,
    textTransform: 'uppercase', marginBottom: 20
  }
})