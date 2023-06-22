import React, { createContext, useContext, useEffect, useState } from 'react';

export const TabelaContext = createContext();

const TabelaProvider = ({ children }) => {

  const [dataTable, setDataTable] = useState(null)
  const [totalContainer, setTotalContainer] = useState(null)
  const [config, setConfig] = useState(null)



  return (
    <TabelaContext.Provider
      value={{
        dataTable, setDataTable, 
        config, setConfig, 
        totalContainer, setTotalContainer
      }}
    >
      {children}
    </TabelaContext.Provider>
  )
}

export default TabelaProvider