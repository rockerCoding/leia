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
    flex: 1,
    backgroundColor: 'rgba(8, 11, 66, 0.8)',
    padding: 30
  },
  leiaMaisContainer: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
  },
  ltdaText: {
    marginTop: 5,
    color: 'white',
    textAlign: 'right'
  },
  contactsContainer: {
    flex: 1, 
  },
  titleContactsContainer: {
    width: "100%",
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    borderStyle: 'solid',
    marginBottom: 10
    
  },
  contactsTitleText: {
    //width: '100%',
    //textAlign: 'center',
    flex: 1,
    fontSize: 20, color: 'whitesmoke',
    fontWeight: '100'
  },
  copyright: {
    marginTop: 50,
    color: 'whitesmoke',
    textAlign: 'center'
  }
})