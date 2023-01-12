import React from "react";

const TextInput = React.forwardRef(
  ({ icon, label, name, type, onChange }, ref) => {
    return (
      <>
        <div className="flex flex-col gap-2">
          <span className="flex  gap-2 text-lg items-center">
            {icon}
            <label className="text-slate-600 text-md" htmlFor={name}>
              {label}
            </label>
          </span>

          {ref ? (
            <input
              ref={ref}
              onChange={onChange}
              className="px-5 py-1 rounded-lg outline-none focus:ring ring-teal-600 shadow"
              type={type ? type : "text"}
              name={name}
              id={name}
            />
          ) : (
            <input
              onChange={onChange}
              className="px-5 py-1 rounded-lg outline-none focus:ring ring-teal-600 shadow"
              type={type ? type : "text"}
              name={name}
              id={name}
            />
          )}
        </div>
      </>
    );
  },
);

export default TextInput;
