import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  profileContainer: {
    flex: 1,
    
  },
  headerContainer: {
    flex: 2,
    //backgroundColor: 'lightblue'
  },
  bodyContainer: {
    flex: 5,
    backgroundColor: 'white'
  }, 
 

  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'black'
  },
  topHeaderContainer: {

    flex: 6, flexDirection: 'row'
  }, 
  bottomHeaderContainer: {
    flex: 5,
    justifyContent: 'center',

  },
  textTopContainer: {
    color: 'white',
    fontWeight: '100'
  },
  profileIconContainer: {
    justifyContent: 'center', alignItems: 'center',
  },
  optionsIcons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  marginTopTextTop: {
    borderTopColor: 'whitesmoke',
    borderTopWidth: 0.5,
    borderStyle: 'solid'
  },

  //footer
  footerContainer: {
    flex: 1.2,
    backgroundColor: 'rgba(8, 11, 66, 0.8)',
    padding: 30
  },
  leiaMaisContainer: {
    flex: 1,
    borderRadius: 5,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'white',
  },
  ltdaText: {
    marginTop: 5,
    color: 'white',
    textAlign: 'right'
  }
})