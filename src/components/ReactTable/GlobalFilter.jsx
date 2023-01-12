import React from "react";
import { useState } from "react";
import "regenerator-runtime/runtime";
import { useAsyncDebounce } from "react-table";

export const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const [value, setValue] = useState(globalFilter);
  const count = preGlobalFilteredRows.length;

  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value);
  }, 300);

  return (
    <>
      <div className="self-start flex items-center gap-4 mb-5 sticky left-2">
        <label htmlFor="search" className="text-gray-600">
          Search
        </label>
        <input
          className="px-3 py-1 border focus:ring outline-none rounded-lg"
          type="search"
          name="search"
          id="search"
          value={value || undefined}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
        />
      </div>
    </>
  );
};
