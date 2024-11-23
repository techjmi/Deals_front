import React, { createContext, useEffect, useState } from "react";

export const DataContext = createContext(null);
const Dataprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Load user from localStorage on app load
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);
  return (
    <DataContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </DataContext.Provider>
  );
};

export default Dataprovider;
