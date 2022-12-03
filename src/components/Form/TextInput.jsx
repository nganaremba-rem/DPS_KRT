import React from "react";

const TextInput = ({ icon, label, name, type, onChange }) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <span className="flex  gap-2 text-lg items-center">
          {icon}
          <label className="text-slate-600" htmlFor={name}>
            {label}
          </label>
        </span>
        <input
          onChange={onChange}
          className="px-5 py-2 rounded-lg outline-none focus:ring ring-teal-600 shadow"
          type={type ? type : "text"}
          name={name}
          id={name}
        />
      </div>
    </>
  );
};

export default TextInput;
