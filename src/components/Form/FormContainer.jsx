import React from "react";

const FormContainer = ({ formName, children }) => {
  return (
    <div className="m-2 bg-white rounded-xl shadow px-10 py-5 md:p-10 md:px-20">
      <h1 className="text-gray-600 text-xl font-bold border-b-2 border-b-slate-200 pb-2 mb-7">
        {formName}
      </h1>
      {children}
    </div>
  );
};

export default FormContainer;
