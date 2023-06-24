import React, { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [isLoading, setIsLoading] = useState(null)
  const [userToken, setUserToken] = useState("a")
  const [navigateLogin, setNavigateLogin] = useState(null)
  const [user, setUser] = useState(null)

 
  return (
    <AuthContext.Provider
      value={{
        user, setUser, isLoading, setIsLoading, navigateLogin, setNavigateLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider