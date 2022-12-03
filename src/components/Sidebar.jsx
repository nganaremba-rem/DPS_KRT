import React from "react";
import { DiJqueryLogo } from "react-icons/di";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useQuery } from "react-query";
import { fetchMenus } from "../api/Api";
import { useStateContext } from "../context/ContextProvider";
import Loading from "./Loading";
import MenuGroup from "./MenuGroup";
import MenuItem from "./MenuItem";
import MenuSkeleton from "./MenuSkeleton";

const Sidebar = () => {
  const { activeSidebar, setActiveSidebar, screenSize } = useStateContext();

  const sidebarWidth = activeSidebar ? "md:w-[30%] lg:w-[20%] w-[80%]" : "w-0";

  // close sidebar for smaller devices
  const closeSidebar = () => {
    if (screenSize < 900) setActiveSidebar(false);
  };

  return (
    <>
      <div
        className={`${sidebarWidth} fixed shadow-lg z-[1000] bg-white  h-screen overflow-hidden sidebar transition-all duration-75 ease-linear`}
      >
        <div
          className="flex items-center gap-2 p-2 rounded-xl"
          style={{
            boxShadow: "0 8px 3px -10px #999",
          }}
        >
          <DiJqueryLogo size={40} className={"shrink-0"} />
          <span className="text-3xl">KRT</span>
          <span
            onClick={() => setActiveSidebar((prev) => !prev)}
            className="absolute bg-white text-gray-600 font-extrabold right-0 hover:bg-slate-300 rounded-full cursor-pointer p-2 "
          >
            <IoIosCloseCircleOutline size={25} />
          </span>
        </div>

        <section className="max-h-full overflow-auto p-3 pb-14">
          <div className="mb-10 mt-7">
            <MenuItems closeSidebar={closeSidebar} />
          </div>
        </section>
      </div>
    </>
  );
};

const MenuItems = ({ closeSidebar }) => {
  const {
    isLoading,
    isError,
    error,
    data: menuData,
  } = useQuery("menu", fetchMenus);

  if (isLoading) return <MenuSkeleton />;
  if (isError) return <h1>{error?.message}</h1>;

  return menuData.data.map((menuItem) => {
    return (
      <MenuGroup key={menuItem.name} name={menuItem.name}>
        {menuItem.operations.map((operation) => {
          return (
            <MenuItem
              name={operation.name}
              to={operation.to}
              key={operation.name}
              custFnc={closeSidebar}
            />
          );
        })}
      </MenuGroup>
    );
  });
};

export default Sidebar;