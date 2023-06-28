import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 20
  },
  middleContainer: {
    flex: 5,
    justifyContent: 'space-evenly'
  },
  buttonContainer: {
    flex: 1,
    //flexDirection: 'row',
    backgroundColor: 'orange',
    justifyContent: 'center'
  },
  bottomContainer: {
    flex: 3,
    justifyContent: 'space-around',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center', alignItems: 'center'
  },
  alertContainer: {
    width: Dimensions.get("screen").width * 0.8,
    height: Dimensions.get("screen").height * 0.3,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  topAlertContainer: {
    flex: 1,
    justifyContent: 'center', alignItems: 'center'

  },
  bottomAlertContainer: {
    /* flex: 1, */
    width: '100%', flexDirection: 'row',
    justifyContent: 'space-evenly', alignItems: 'center',
  },
  titleText: {
    textAlign: 'center'
  },
  buttonAlert: {
     width: Dimensions.get("screen").width * 0.3, 
     padding: 15,
     justifyContent: 'center',
     borderRadius: 5,
    
  },
  buttonAlertText: {
    color: 'white',
    textAlign:'center',
  }


})