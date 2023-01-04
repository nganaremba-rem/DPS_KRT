import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "./Layout/DashboardLayout";

const Dashboard = () => {
  return (
    <div className="flex w-full gap-2 flex-wrap">
      <Link
        to={"/dashboard/employee/display"}
        className="card shadow-lg cursor-pointer px-5 py-2 w-[48%] pb-10 sm:max-w-[12rem]  rounded-2xl bg-gradient-to-tl from-[#9CAFB4] to-[#E9E6CC]"
      >
        <div className="card-title font-bold py-5">Employees</div>
        <div className="text-gray-700 text-xs font-bold">Total Employees</div>
        <div className="text-[#1E2554] font-extrabold text-2xl sm:text-3xl">
          12736
        </div>
      </Link>
      <Link
        to={"/dashboard/branch/display"}
        className="card px-5 cursor-pointer shadow-lg py-2 w-[48%] pb-10 sm:max-w-[12rem] rounded-2xl bg-gradient-to-tl from-[#F6D9C5] to-[#E5CEC4]"
      >
        <div className="card-title  font-bold py-5">Branches</div>
        <div className="text-gray-700 text-xs font-bold">Total Branches</div>
        <div className="text-[#1E2554] font-extrabold text-2xl sm:text-3xl">
          12736
        </div>
      </Link>
      <Link
        to={"/dashboard/role/display"}
        className="card px-5 cursor-pointer shadow-lg py-2 w-[48%] pb-10 sm:max-w-[12rem] rounded-2xl bg-gradient-to-tl from-[#c2bbbb] to-[#baccd3]"
      >
        <div className="card-title  font-bold py-5">Roles</div>
        <div className="text-gray-700 text-xs font-bold">Total Roles</div>
        <div className="text-[#1E2554] font-extrabold text-2xl sm:text-3xl">
          4
        </div>
      </Link>
    </div>
  );
};

export default Dashboard;
