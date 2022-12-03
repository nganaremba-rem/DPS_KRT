import React from "react";
import { motion } from "framer-motion";
import { DropdownStateContext } from "./NavButton";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function NotificationItem({ info, credit, time }) {
  const { setDropdownVisible } = useContext(DropdownStateContext);
  return (
    <>
      <motion.div
        // animate={{ scale: 1 }}
        // initial={{ scale: 0 }}
        className="noti-item border-b-2 border-b-gray-100 py-4 "
      >
        <Link to={"/dashboard/point/pointRequest"}>
          <div
            onClick={() => setDropdownVisible((prev) => !prev)}
            className="hover:bg-slate-200 cursor-pointer px-2 py-3  border-l-4 border-l-red-600"
          >
            <div className="font-bold w-max">{info}</div>
            <div className="text-slate-500 items-center text-sm flex justify-between">
              <div className="info text-sm text-slate-600">
                Credit: {credit}
              </div>
              <div className="time text-xs text-slate-500">{time}</div>
            </div>
          </div>
        </Link>
      </motion.div>
    </>
  );
}
