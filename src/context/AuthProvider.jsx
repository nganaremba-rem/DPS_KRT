import { createContext, useEffect, useMemo } from "react";
import { useState } from "react";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const userDataString = localStorage.getItem("user");
  const userData = useMemo(() => JSON.parse(userDataString), []);

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
