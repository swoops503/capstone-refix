import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Assuming the API returns user data upon successful login,
    // you can set the user state with this data.
    setUser(userData);
  };

  const logout = () => {
    // Perform logout logic, e.g., clearing user data from state
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
