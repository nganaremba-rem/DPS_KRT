import { Button, TextareaAutosize } from "@mui/material";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import Select from "react-select";
import { getMessageDropdownRoles, sendMessage } from "../../api/Api";
import MainSkeleton from "../../components/MainSkeleton";
import SnackbarCustom from "../../components/SnackbarCustom";
import useAuth from "../../hooks/useAuth";

const SendMessage = () => {
  const formRef = useRef();
  const { user } = useAuth();
  //   States
  const [receiver, setReceiver] = useState([]);
  const [message, setMessage] = useState("");
  const [openToast, setOpenToast] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    alertText: "",
    severity: "success",
  });

  // Mutation
  const { mutate: sendNow } = useMutation({
    mutationFn: (data) => sendMessage(user.userId, data),
    onSuccess: (res) => {
      if (res?.request?.status === 0) {
        setAlertOptions({
          alertText: res.message,
          severity: "error",
        });
      } else {
        setAlertOptions({
          alertText: "Message Sent Successfully",
          severity: "success",
        });
      }
      setOpenToast(true);
    },
    onError: (error) => {
      setAlertOptions({
        alertText: error.message,
        severity: "error",
      });
      setOpenToast(true);
      console.log(error);
    },
  });
  //  Fetch Roles
  const {
    data: dropdownRoles,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => getMessageDropdownRoles(user.userId),
  });

  //   Functions
  const handleCloseSnackbar = () => setOpenToast(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (receiver.length === 0 || message === "") return;
    console.log({
      to: receiver,
      message,
    });
    sendNow({
      to: receiver,
      message,
    });
    formRef.current.reset();
  };

  const options = [
    {
      label: "Admin",
      value: "admin",
    },
    {
      label: "BM",
      value: "bm",
    },
    {
      label: "HR",
      value: "hr",
    },
  ];

  //   if (isLoading) return <MainSkeleton />;
  //   if (isError) return <div>{error.message}</div>;

  return (
    <>
      <form
        ref={formRef}
        onSubmit={handleSendMessage}
        className="bg-gradient-to-r from-slate-300 w-full to-slate-200 rounded-2xl shadow px-10 py-5 flex flex-col gap-2 "
      >
        <h1 className="text-lg font-extrabold text-gray-700">Send Message</h1>
        <Select
          isMulti
          options={options}
          hideSelectedOptions={false}
          closeMenuOnSelect={false}
          onChange={(data) => {
            setReceiver(data.map((obj) => obj.value));
          }}
        />
        <TextareaAutosize
          placeholder="Message..."
          minRows={5}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          maxRows={10}
          className=" focus:outline-gray-500 cursor-text px-4 py-2 rounded"
        />
        <Button type="submit" variant="contained">
          Send
        </Button>
      </form>

      <SnackbarCustom
        open={openToast}
        onClose={handleCloseSnackbar}
        alertText={alertOptions.alertText}
        severity={alertOptions.severity}
      />
    </>
  );
};

export default SendMessage;
