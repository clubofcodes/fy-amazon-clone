import React, { useState, createContext, useContext, useEffect } from 'react';
//Creates new context & will store any type of value.
const AuthContext = createContext(null);

// This will provides function/properties to all children component.
export const AuthProvider = ({ children }) => {

  const getValidUserData = async () => {
    const validUserResponse = await fetch("/validuser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    });

    const validUserData = await validUserResponse.json();
    // console.log("Status: ", validUserResponse.status, validUserData);
    (validUserResponse.status !== 200) ? console.log("First login") : setUserData(validUserData);
  }
  // New state to store user logedIn email.
  const [userData, setUserData] = useState(null);
  // Sets userData state with parameter values when function is called.
  const login = userValues => setUserData({ ...userValues });
  // Sets userData to null when anyone call logout function.
  const logout = () => setUserData(null);

  useEffect(() => {
    getValidUserData();
  }, []);

  return (
    //Provides value objects to all children component.
    <AuthContext.Provider value={{ userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Can be used for using context values provided by the AuthProvider.
export const useAuthentication = () => useContext(AuthContext);