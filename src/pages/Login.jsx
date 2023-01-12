import { FormControlLabel, Switch } from "@mui/material";
import React, { useEffect, useReducer, useState } from "react";
import { createRef } from "react";
import { useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { LoginFn } from "../api/Api";
import TextInput from "../components/Form/TextInput";
import useAuth from "../hooks/useAuth";

// Reducer state initial state
const initialState = {
  mailAddress: "",
  password: "",
  id: "",
};

// Action types to control typo errors
const Actions = {
  setUsername: "setUsername",
  setPassword: "setPassword",
  setId: "setId",
};

// reducer function to change state values
function reducer(state, action) {
  switch (action.type) {
    case Actions.setUsername:
      return { ...state, mailAddress: action.payload };
    case Actions.setPassword:
      return { ...state, password: action.payload };
    case Actions.setId:
      return { ...state, id: Date.now() };
  }
}

// Form Validation Function
function isValidateForm(state) {
  if (state.username?.trim() === "" || state.password?.trim() === "")
    return false;
  return true;
}

const Login = () => {
  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: LoginFn,
  });

  const { setUser, setMenus } = useAuth();

  // custom states
  const [formError, setFormError] = useState(null);
  const [isFormError, setIsFormError] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const passRef = useRef();
  const navigate = useNavigate();
  // reducer
  const [formStates, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (showPass) {
      passRef.current.setAttribute("type", "text");
    } else passRef.current.setAttribute("type", "password");
  }, [showPass]);

  const handleLogin = (e) => {
    e.preventDefault();
    // error out if form validation error
    if (!isValidateForm(formStates)) {
      setIsFormError(true);
      setFormError("Please enter all the fields");
      return;
    }

    // if all good submit the form
    // ! need to remove this line
    dispatch({ type: "setId" }); // adding id for json-server only
    mutate(formStates, {
      // onSuccess: () => navigate("/dashboard"),
      onError: (error) => console.log(error),
      onSuccess: (data) => {
        // console.log(data);
        if (data.data.status.code === "500") {
          setIsFormError(true);
          setFormError(data.data.status.message);
        } else if (data.data.status.code === "200") {
          setUser(data?.data?.response?.basicUserInfo);
          setMenus(data?.data?.response?.uiFunctionList);
          localStorage.setItem("user", JSON.stringify(data?.data?.response));
          navigate("/dashboard");
        }
      },
    });
  };

  return (
    <>
      <div className="flex min-h-screen w-full justify-center items-center bg-gradient-to-br from-teal-100 p-14">
        <div className="rounded-3xl shadow-lg p-10 md:min-w-[30rem] relative backdrop-blur-3xl bg-opacity-50 bg-white">
          <div className="select-none rounded-full flex justify-center items-center  text-3xl text-white bg-gradient-to-b from-teal-300 to-teal-700 w-20 h-20 shadow overflow-hidden absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
            KRT
          </div>
          <div className="text-5xl text-center font-extrabold mt-5">
            <span className="select-none bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-500">
              Login
            </span>
          </div>

          {(isError || isFormError) && (
            <>
              <div className="text-red-400 text-md font-bold mt-5">
                {error?.message || formError}
              </div>
            </>
          )}

          <form className="flex flex-col gap-4 my-5" onSubmit={handleLogin}>
            <TextInput
              onChange={(e) =>
                dispatch({ type: Actions.setUsername, payload: e.target.value })
              }
              icon={<FaUserCircle color="#444" size={25} />}
              label="Username"
              name={"mailAddress"}
            />
            <TextInput
              onChange={(e) =>
                dispatch({ type: Actions.setPassword, payload: e.target.value })
              }
              ref={passRef}
              label="Password"
              name="password"
              type="password"
              icon={<RiLockPasswordFill color="#444" size={25} />}
            />
            <FormControlLabel
              // sx={{
              //   display: "flex",
              //   alignItems: "center",
              // }}
              className="flex items-center text-gray-700 select-none"
              control={
                <Switch
                  checked={showPass}
                  onChange={() => {
                    setShowPass(!showPass);
                  }}
                  name="loading"
                  color="info"
                />
              }
              label="Show Password"
            />

            {isLoading ? (
              <>
                <div className="flex px-5 py-2 mt-4 bg-gradient-to-r from-teal-200 to-red-300 rounded-full justify-center items-center gap-2">
                  <span className="text-2xl text-slate-500">Please wait</span>
                  <PulseLoader color="#36d7b7" />
                </div>
              </>
            ) : (
              <button
                type="submit"
                className="px-10 select-none mt-4 py-2 bg-teal-500 text-white rounded-2xl text-xl hover:bg-teal-800"
              >
                Login
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
