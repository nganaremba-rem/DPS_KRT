import React, { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { CgMenuLeft } from "react-icons/cg";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserOptions } from "../api/Api";
import { useStateContext } from "../context/ContextProvider";
import Dropdown from "./Dropdown";
import NavButton from "./NavButton";
import Notification from "./Notification";
import Button from "@mui/material/Button";
import NavbarSkeleton from "./NavbarSkeleton";

const Navbar = () => {
  const { setActiveSidebar, screenSize, setScreenSize } = useStateContext();

  const {
    data: userOptions,
    isLoading,
    isError,
    error,
  } = useQuery("userOptions", fetchUserOptions);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenSize < 900) setActiveSidebar(false);
    else setActiveSidebar(true);
  }, [screenSize]);

  const handleLogout = () => {
    if (confirm("Logout?")) {
      navigate("/");
    }
  };

  if (isLoading) return <NavbarSkeleton />;
  if (isError) return <h1>{error.message}</h1>;

  // return <NavbarSkeleton />;

  return (
    <>
      <nav
        className={` px-2 py-1 transition-all ease-linear bg-slate-100 flex items-center justify-between`}
      >
        <div className="flex items-center">
          <NavButton
            icon={<CgMenuLeft size={35} color="#36c1e3" />}
            custFnc={() => {
              setActiveSidebar((prev) => !prev);
            }}
          />
        </div>
        <div className="flex items-center">
          <Link to={"/dashboard"}>
            <NavButton icon={<AiOutlineHome size={27} color="#36c1e3" />} />
          </Link>

          {userOptions.data.options.map((option, index) => {
            if (option.name === "Notification")
              return (
                <NavButton
                  tabIndex={index}
                  key={index}
                  icon={<IoMdNotificationsOutline size={27} color="#36c1e3" />}
                >
                  <Dropdown>
                    <Notification />
                  </Dropdown>
                </NavButton>
              );
            return <NavButton key={index} size={25} name={option.name} />;
          })}
          <NavButton icon={<FaRegUserCircle size={27} color="#36c1e3" />}>
            <Dropdown>
              <div className="flex flex-col gap-2 p-2">
                <div className="font-extrabold bg-slate-300 py-2 px-3  rounded-lg text-gray-600">
                  Admin
                </div>
                <div
                  title="Shijagurumayum Nganaremba Sharma"
                  className="whitespace-nowrap max-w-[20rem] overflow-hidden text-ellipsis text-lg text-gray-500"
                >
                  Shijagurumayum Nganaremba Sharma
                </div>
                <Button
                  onClick={handleLogout}
                  variant="contained"
                  color="error"
                >
                  Logout
                </Button>
              </div>
            </Dropdown>
          </NavButton>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
