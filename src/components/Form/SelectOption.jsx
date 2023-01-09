import AsyncSelect from "react-select/async";
import React from "react";

const SelectOption = ({
  optionsFnc,
  id,
  name,
  icon,
  label,
  formId,
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
      <AsyncSelect
        name={name}
        form={formId}
        cacheOptions
        loadOptions={optionsFnc}
        defaultOptions
        className={"shadow-sm"}
        required={required}
      />
    </div>
  );
};

export default SelectOption;
