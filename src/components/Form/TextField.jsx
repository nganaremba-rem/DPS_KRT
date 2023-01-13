import React, { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { v4 } from "uuid";

const TextField = React.forwardRef(
  (
    {
      label,
      name,
      placeholder,
      id,
      icon,
      type,
      value = "",
      required,
      onChange,
      state,
    },
    ref,
  ) => {
    const [shown, setShown] = useState(false);

    if (type === "password") {
      return (
        <>
          <div className="flex flex-col gap-2">
            <label className="pl-2 text-gray-700" htmlFor={id || name}>
              {label}
            </label>
            <div className="border group rounded flex items-center ">
              <input
                className="h-full text-md w-full min-w-[0px] px-3 outline-none py-1"
                type={shown ? "text" : "password"}
                name={name || id}
                id={id || name}
                defaultValue={value || ""}
              />
              <div
                className="p-2 cursor-pointer select-none"
                onClick={() => setShown((prev) => !prev)}
              >
                {shown ? (
                  <BsFillEyeFill color="#777" />
                ) : (
                  <BsFillEyeSlashFill color="#777" />
                )}
              </div>
            </div>
          </div>
        </>
      );
    }

    return (
      <div className="grid  md:items-center outline-none focus:shadow-lg  md:gap-1 gap-1">
        <label
          className="text-gray-700 flex items-center gap-2"
          htmlFor={id || name}
        >
          <div className="ico text-2xl">{icon}</div>
          <span>{label}</span>
        </label>
        <input
          className="px-3 outline-none min-w-[0] lg:min-w-[10rem] py-1 rounded border border-slate-300 shadow-sm"
          type={type}
          name={name}
          id={id || name}
          placeholder={placeholder}
          required={required}
          defaultValue={value || ""}
        />
      </div>
    );
  },
);

export default TextField;
