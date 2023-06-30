import React, { createContext, useState } from "react";



export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    // call your authentication API here to log in the user
    setIsAuthenticated(true);
    console.log("login avvenuto con successo");
  };

  const logout = () => {
    // call your API to log out the user here
    setIsAuthenticated(false);
    console.log("logout avvenuto con successo");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const AuthContext = createContext();