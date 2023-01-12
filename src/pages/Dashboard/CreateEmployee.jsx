import { Modal } from "@mui/material";
import React, { useRef, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useMutation, useQuery } from "react-query";
import { createEmployee, createEmployeeApi } from "../../api/Api";
import FormPage from "../../components/FormPage";
import MainSkeleton from "../../components/MainSkeleton";
import Success from "../../components/Success";
import useAuth from "../../hooks/useAuth";

const CreateEmployee = () => {
  const { user } = useAuth();
  const [success, setSuccess] = useState(false);

  const { data, isLoading, isError, error } = useQuery(
    "createEmployee",
    createEmployee,
  );

  const {
    mutate,
    isLoading: isLoadingCreating,
    isError: isErrorCreating,
    error: errorCreating,
  } = useMutation({
    mutationFn: (data) => createEmployeeApi(data, user.userId),
  });

  const formRef = useRef();

  const handleSubmit = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        console.log(res);
        setSuccess(true);
        formRef.current.reset();
        setTimeout(() => {
          setSuccess(false);
        }, 1000);
      },
    });
  };

  if (isLoading) return <MainSkeleton />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <>
      <Modal open={success} children={<Success />} />
      <FormPage
        ref={formRef}
        formFieldsData={data.data}
        formTitle="Create New Employee"
        submitBtnText={"Create"}
        custSubmitFnc={handleSubmit}
        submitButtonEndIcon={<AiOutlinePlusCircle />}
      />
    </>
  );
};

export default CreateEmployee;
