import React, { createContext, useState } from 'react';

export const ResponseContext = createContext();

export const ResponseProvider = ({ children }) => {
  const [responseValue, setResponseValue] = useState(null);

  return (
    <ResponseContext.Provider value={{responseValue, setResponseValue}}>
      {children}
    </ResponseContext.Provider>
  );
};