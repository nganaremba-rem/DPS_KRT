import React from "react";

const TextField = ({
  label,
  name,
  placeholder,
  id,
  icon,
  type,
  value,
  required,
}) => {
  return (
    <div className="grid  md:items-center outline-none focus:shadow-lg  md:gap-1 gap-1">
      <label
        className="text-gray-800 flex items-center gap-2"
        htmlFor={id || name}
      >
        <div className="ico text-2xl">{icon}</div>
        <span>{label}</span>
      </label>
      <input
        className="px-5 min-w-[0] lg:min-w-[20rem] py-2 rounded-md border border-slate-300 shadow-sm"
        type={type}
        name={name}
        id={id || name}
        placeholder={placeholder}
        defaultValue={value || ""}
        required={required}
      />
    </div>
  );
};

export default TextField;
