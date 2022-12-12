import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
// import { AiOutlinePlusCircle } from "react-icons/ai";
import { getAPI } from "../api/Api";
import { endpoints } from "../endpoints";
import { lazyLoad } from "../lazyLoad";
import SelectOption from "./Form/SelectOption";
import TextField from "./Form/TextField";
import { useQuery } from "react-query";
import axios from "axios";

const AiOutlinePlusCircle = lazyLoad("react-icons/ai", "AiOutlinePlusCircle");

const FormPage = ({
  formTitle,
  custSubmitFnc,
  formFieldsData,
  submitBtnText,
  submitButtonEndIcon,
}) => {
  // const [options, setOptions] = useState();

  const setUsersOptions = async (endPoint) => {
    console.log(endPoint);
    const data = await getAPI(endPoint);
    return data.map((singleData) => {
      return {
        label: singleData["Employee Name"],
        value: singleData.Username,
      };
    });
  };

  const fetchOptions = (queryName, endpoint) => {
    return useQuery(queryName, () => {
      return axios.get(endpoint);
    });
  };

  return (
    <div className="flex w-full md:max-w-max flex-col gap-2 bg-white py-10 px-5 md:px-20 shadow-md rounded-lg">
      <h1 className="text-2xl font-extrabold text-gray-600 mb-7 border-b-2">
        {formTitle}
      </h1>
      <form
        onSubmit={custSubmitFnc}
        action=""
        className="grid md:grid-cols-2 gap-5"
      >
        {formFieldsData.map((input) => {
          if (["text", "email"].includes(input.type)) {
            return (
              <TextField
                key={input.name}
                name={input.name}
                label={input.field}
                type={input.type}
              />
            );
          }

          if (input.type === "select") {
            {
              /* let { data: options } = fetchOptions("creditPoint", input.endPoint); */
            }
            {
              /* console.log(options.data); */
            }
            let options = [];
            switch (input.id) {
              case "branchOfficeCode":
                break;

              case "driver":
                async function getUser() {
                  options = await setUsersOptions(input.endPoint);
                }
                getUser();
                break;

              default:
                break;
            }

            return (
              <SelectOption
                id={input.id}
                name={input.name}
                key={input.name}
                label={input.field}
                options={options ?? (options || {})}
              />
            );
          }
        })}

        <Button
          color={"primary"}
          size="large"
          variant="contained"
          endIcon={submitButtonEndIcon}
          className={"col-span-full"}
          type="submit"
        >
          {submitBtnText}
        </Button>
      </form>
    </div>
  );
};

export default FormPage;
