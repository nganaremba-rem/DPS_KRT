import { createContext, useEffect, useMemo } from "react";
import { useState } from "react";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [menus, setMenus] = useState([]);
  const userDataString = localStorage.getItem("user");
  const userData = useMemo(() => JSON.parse(userDataString), []);

  useEffect(() => {
    setUser(userData?.basicUserInfo);
    setMenus(userData?.uiFunctionList);
    console.log(user);
  }, [userData]);

  return (
    <AuthContext.Provider value={{ user, setUser, menus, setMenus }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
