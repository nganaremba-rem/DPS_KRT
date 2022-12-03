import React from "react";

const MenuGroup = ({ children, name }) => {
  return (
    <div title={name} className="menu-group mt-3">
      <div className="text-slate-400 font-extrabold uppercase mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
        {name}
      </div>
      {/* Dynamic Render */}
      {children}
      {/* Till here */}
    </div>
  );
};

export default MenuGroup;
