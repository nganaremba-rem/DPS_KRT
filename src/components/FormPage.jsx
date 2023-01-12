import { Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import { Axios } from "../api/Api";
import useAuth from "../hooks/useAuth";
import ButtonWithLoading from "./Form/ButtonWithLoading";
import LoadingButton from "./Form/LoadingButton";
import SelectOption from "./Form/SelectOption";
import TextField from "./Form/TextField";

// const AiOutlinePlusCircle = lazyLoad("react-icons/ai", "AiOutlinePlusCircle");

const FormPage = React.forwardRef(
  (
    {
      formId,
      formTitle,
      custSubmitFnc,
      formFieldsData,
      submitBtnText,
      submitButtonEndIcon,
      isLoading = false,
    },
    ref,
  ) => {
    const { user } = useAuth();

    const handleSubmit = (e) => {
      e.preventDefault();
      const formObject = new FormData(e.target);
      const formData = Object.fromEntries(formObject);
      custSubmitFnc(formData);
      console.log(formData);
    };

    function getOptionsData(endpoint, options, params) {
      // const { data } = useQuery(queryKey, () => {});
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
          ref={ref}
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

                case "drivers":
                  optionFnc = () => {
                    const params = {
                      ctryCode: 123,
                      langCode: 12,
                      role: "DR",
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
          <ButtonWithLoading
            endIcon={submitButtonEndIcon}
            isLoading={isLoading}
            text={submitBtnText}
          />
        </form>
      </div>
    );
  },
);

export default FormPage;
