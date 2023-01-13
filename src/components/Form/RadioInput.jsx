import React from "react";

const RadioInput = ({ field, name, options = [], id = [] }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-700 pl-2" htmlFor={name}>
        {field}
      </label>
      <div className="flex flex-col gap-2 justify-center">
        {options.map((option, idx) => {
          return (
            <div className="flex gap-2 items-center">
              <input type={"radio"} name={name} id={id[idx]} />
              <label htmlFor={id[idx]}>{option}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RadioInput;
