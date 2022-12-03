import Select from "react-select";
import React from "react";

const SelectOption = ({ options, id, name, icon, label }) => {
  return (
    <div className="grid  md:items-center outline-none focus:shadow-lg  md:gap-1 gap-1">
      <label
        className="text-gray-800 flex items-center gap-2"
        htmlFor={id || name}
      >
        <div className="ico text-2xl">{icon}</div>
        <span>{label}</span>
      </label>
      <Select options={options} className={"shadow-sm"} />
    </div>
  );
};

export default SelectOption;
