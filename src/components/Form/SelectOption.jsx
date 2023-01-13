import React from "react";
import { useQueryClient } from "react-query";
import AsyncSelect from "react-select/async";
import useAuth from "../../hooks/useAuth";

const SelectOption = ({
  id,
  name,
  icon,
  label,
  formId,
  required,
  // optionFnc,
  queryKey,
  fnc,
  options,
}) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const getOptionsData = (queryKey, fnc, options) => {
    return new Promise(async (resolve) => {
      try {
        const res = await queryClient.fetchQuery({
          queryFn: () => fnc(user.userId),
          queryKey: queryKey,
        });
        const result = res?.data?.response?.map((item) => {
          return {
            value: item[options.value],
            label: item[options.label],
          };
        });
        resolve(result);
      } catch (err) {
        console.log(err.message);
      }
    });
  };

  return (
    <div className="grid  md:items-center outline-none focus:shadow-lg  md:gap-1 gap-1">
      <label
        className="text-gray-700 flex items-center gap-2"
        htmlFor={id || name}
      >
        <div className="ico text-2xl">{icon}</div>
        <span>{label}</span>
      </label>

      <AsyncSelect
        name={name}
        form={formId}
        cacheOptions={true}
        isSearchable={true}
        loadOptions={() => getOptionsData(queryKey, fnc, options)}
        defaultOptions={true}
        className={"shadow-sm"}
        required={required}
      />
    </div>
  );
};

export default SelectOption;
