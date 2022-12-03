import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useQuery } from "react-query";
import { createEmployee } from "../../api/Api";
import FormPage from "../../components/FormPage";
import Loading from "../../components/Loading";
import MainSkeleton from "../../components/MainSkeleton";

const CreateEmployee = () => {
  const { data, isLoading, isError, error } = useQuery(
    "createEmployee",
    createEmployee,
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ok");
  };

  if (isLoading) return <MainSkeleton />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <>
      <FormPage
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
