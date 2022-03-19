import React, { useState, createContext, useContext } from 'react';
//Creates new context & will store any type of value.
const AuthContext = createContext(null);

// This will provides function/properties to all children component.
export const AuthProvider = ({ children }) => {
  // New state to store user logedIn email.
  const [userData, setUserData] = useState(null);
  // Sets userData state with parameter values when function is called.
  const login = userValues => setUserData({...userValues});
  // Sets userData to null when anyone call logout function.
  const logout = () => setUserData(null);

  return (
    //Provides value objects to all children component.
    <AuthContext.Provider value={{ userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Can be used for using context values provided by the AuthProvider.
export const useAuthentication = () => useContext(AuthContext);