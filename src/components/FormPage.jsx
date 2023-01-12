import axios from "axios";
import React from "react";
import useAuth from "../hooks/useAuth";
import ButtonWithLoading from "./Form/ButtonWithLoading";
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
      extraData,
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

    function getOptionsData(endpoint, options, params = {}) {
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
            // dataArr = await Axios.get(endpoint, {
            //   params: { ...params },
            //   headers: {
            //     userId: user.userId,
            //   },
            // });
            dataArr = endpoint;
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
        <h1 className="text-2xl mb-5 font-extrabold text-gray-600  border-b-2">
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
            if (["text", "email", "password"].includes(input.type)) {
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

                case "drivers":
                  optionFnc = () => {
                    return getOptionsData(extraData.drivers.data, {
                      label: "userName",
                      value: "userId",
                      local: false,
                    });
                  };
                  optionFnc();
                  break;

                case "roleCd":
                  optionFnc = () => {
                    return getOptionsData(extraData.roleList.data, {
                      label: "roleNm",
                      value: "roleCd",
                      local: false,
                    });
                  };
                  optionFnc();
                  break;

                case "divCd":
                  optionFnc = () => {
                    return getOptionsData(extraData.branchList.data, {
                      label: "divNm",
                      value: "divCd",
                      local: false,
                    });
                  };
                  optionFnc();
                  break;

                case "managerId":
                  optionFnc = () => {
                    return getOptionsData(extraData.branchManagers.data, {
                      label: "userName",
                      value: "userId",
                      local: false,
                    });
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
            if (input.type === "date") {
              return (
                <div key={input.name} className="flex flex-col gap-2 ">
                  <label className="text-gray-700 pl-2" htmlFor={input.name}>
                    {input.field}
                  </label>
                  <input
                    className="px-3 py-1 text-gray-600 border rounded"
                    type={"datetime-local"}
                    name={input.name}
                    id={input.id}
                  />
                </div>
              );
            }
            if (["radio", "checkbox"].includes(input.type)) {
              return (
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 pl-2" htmlFor={input.name}>
                    {input.field}
                  </label>
                  <div className="flex flex-col gap-2 justify-center">
                    {input.options.map((option, idx) => {
                      return (
                        <div className="flex gap-2 items-center">
                          <input
                            type={input.type}
                            name={input.name}
                            id={input.id[idx]}
                          />
                          <label htmlFor={input.id[idx]}>{option}</label>
                        </div>
                      );
                    })}
                  </div>
                </div>
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
