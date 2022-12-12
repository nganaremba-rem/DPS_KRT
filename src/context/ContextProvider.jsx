import { createContext, useContext, useState } from "react";

const StateContext = createContext({});

const initialState = {
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [activeSidebar, setActiveSidebar] = useState(true);
  const [screenSize, setScreenSize] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <StateContext.Provider
      value={{
        activeSidebar,
        setActiveSidebar,
        initialState,
        screenSize,
        setScreenSize,
        openModal,
        setOpenModal,
        dropdownVisible,
        setDropdownVisible,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
