import { createContext, useEffect } from "react";
import { useState } from "react";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const userId = localStorage.getItem("user");
  const data = JSON.parse(userId);

  useEffect(() => {
    setUser(data);
  }, [userId]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
