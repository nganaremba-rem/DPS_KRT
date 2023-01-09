import { Button } from "@mui/material";
import axios from "axios";
import React, { useRef } from "react";
import { useQuery } from "react-query";
import { Axios, getAPI } from "../api/Api";
import useAuth from "../hooks/useAuth";
import SelectOption from "./Form/SelectOption";
import TextField from "./Form/TextField";

// const AiOutlinePlusCircle = lazyLoad("react-icons/ai", "AiOutlinePlusCircle");

const FormPage = ({
  formId,
  formTitle,
  custSubmitFnc,
  formFieldsData,
  submitBtnText,
  submitButtonEndIcon,
}) => {
  // const [options, setOptions] = useState();
  const { user } = useAuth();
  const formRef = useRef();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formObject = new FormData(e.target);
    const formData = Object.fromEntries(formObject);
    custSubmitFnc(formData);
    console.log(formData);
  };

  function getOptionsData(endpoint, options, params) {
    return new Promise(async (resolve) => {
      try {
        let dataArr;
        if (options.local === true) {
          dataArr = await axios.get(endpoint, {
            headers: {
              userId: user.userId,
            },
          });
        } else {
          dataArr = await Axios.get(endpoint, {
            params: { ...params },
            headers: {
              userId: user.userId,
            },
          });
        }
        const result = dataArr.data.response.map((data) => {
          return {
            value: data[options.value],
            label: data[options.label],
          };
        });
        resolve(result);
      } catch (err) {
        console.log(err.message);
      }
    });
  }

  return (
    <div className="flex w-full md:max-w-max flex-col gap-2 bg-white py-10 px-5 md:px-20 shadow-md rounded-lg">
      <h1 className="text-2xl font-extrabold text-gray-600 mb-7 border-b-2">
        {formTitle}
      </h1>
      <form
        ref={formRef}
        id={formId}
        onSubmit={handleSubmit}
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
                required={input?.required}
              />
            );
          }

          if (input.type === "select") {
            let optionFnc;
            switch (input.devId) {
              case "branchOfficeCode":
                break;

              case "driver":
                async function getUser() {
                  options = await setUsersOptions(input.endPoint);
                }
                getUser();
                break;

              case "givePointValue":
                optionFnc = () => {
                  return getOptionsData(input.endPoint, {
                    label: "label",
                    value: "value",
                    local: true,
                  });
                };
                optionFnc();
                break;

              case "managerId":
                optionFnc = () => {
                  const params = {
                    ctryCode: 123,
                    langCode: 12,
                    role: "BM",
                  };
                  return getOptionsData(
                    input.endPoint,
                    {
                      label: "userName",
                      value: "userId",
                      local: false,
                    },
                    params,
                  );
                };
                optionFnc();
                break;

              default:
                break;
            }

            return (
              <SelectOption
                formId={formId}
                id={input.id}
                name={input.name}
                key={input.name}
                label={input.field}
                optionsFnc={optionFnc}
                required={input.required}
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
