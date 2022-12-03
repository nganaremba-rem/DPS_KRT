import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "../../components";
import { useStateContext } from "../../context/ContextProvider";

const DashboardLayout = ({ children, ...props }) => {
  const { activeSidebar } = useStateContext();

  const dynamicClass = activeSidebar ? "lg:ml-[20%]" : "";
  return (
    <>
      <Sidebar />
      <div
        className={`${dynamicClass} transition-all ease-linear bg-slate-100 min-h-screen`}
      >
        <Navbar />
        <div className="p-5 flex justify-center  items-center">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
