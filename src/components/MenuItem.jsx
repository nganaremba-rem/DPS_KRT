import React from "react";
import { NavLink } from "react-router-dom";
import { FcSettings } from "react-icons/fc";
import { lazyLoad } from "../lazyLoad";

const MenuItem = ({ name, custFnc, to, icon }) => {
  const linkClass = `menu-items cursor-pointer rounded-lg px-3 py-2 w-full  flex gap-4  items-center `;
  return (
    <NavLink
      onClick={custFnc}
      to={to}
      className={({ isActive }) =>
        isActive
          ? `bg-rose-400 text-white ${linkClass}`
          : `text-gray-700 hover:bg-gray-300 ${linkClass}`
      }
      title={name}
    >
      <div className="icon">{icon || <FcSettings size={25} />}</div>
      <button className="font-bold whitespace-nowrap overflow-hidden text-ellipsis">
        {name}
      </button>
    </NavLink>
  );
};

export default MenuItem;
