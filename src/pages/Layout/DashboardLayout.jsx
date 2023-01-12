import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "../../components";
import { useStateContext } from "../../context/ContextProvider";
import MainSkeleton from "../../components/MainSkeleton";

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
        <div className="px-2 sm:px-5 py-2 flex justify-center  items-center">
          <Suspense fallback={<MainSkeleton />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
