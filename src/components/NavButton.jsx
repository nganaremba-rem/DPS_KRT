import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { createContext } from "react";

export const DropdownStateContext = createContext();

const NavButton = ({ icon, name, children, custFnc, tabIndex }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const dropdownToggle = () => setDropdownVisible((prev) => !prev);

  custFnc = custFnc || dropdownToggle;

  return (
    <>
      <div
        className="relative nav-button"
        tabIndex={tabIndex}
        onBlur={() => setDropdownVisible(false)}
      >
        <button
          type="button"
          onClick={custFnc}
          className="p-2 rounded-lg cursor-pointer hover:bg-slate-300 flex items-center flex-col justify-center gap-1"
        >
          <div>{icon}</div>
          {name && (
            <div className="max-w-[5rem] text-gray-500 font-bold text-sm overflow-hidden text-ellipsis whitespace-nowrap">
              {name}
            </div>
          )}
        </button>
        <DropdownStateContext.Provider value={{ setDropdownVisible }}>
          <AnimatePresence>{dropdownVisible && children}</AnimatePresence>
        </DropdownStateContext.Provider>
      </div>
    </>
  );
};

export default NavButton;
