import React, { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [isLoading, setIsLoading] = useState(null)
  const [userToken, setUserToken] = useState("a")
  const [user, setUser] = useState(null)

  /* const login = async (user) => {
    setIsLoading(true);

    await api.post(routes.login, user).then((response) => {

      setUser(response.data)

      setTimeout(() => {
        if(!response.data.message) setUserToken("aaa")
        setIsLoading(false)
      }, 3000);

    });

  }

  const logout = () => {
    setIsLoading(true);
    setUserToken(null)
    AsyncStorage.removeItem('userToken');
    setIsLoading(false)
  }

  const isLoggedIn = async () => {
    try {
      setIsLoading(true)
      let token = await AsyncStorage.getItem('userToken');
      setUserToken(token)
      setIsLoading(false)
    } catch (error) {
    }

  }




  useEffect(() => {
    isLoggedIn();
    
  }, []) */

  

  useEffect(() => {
  
  }, [user])
  


  return (
    <AuthContext.Provider
      value={{
        user, setUser, isLoading, setIsLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider