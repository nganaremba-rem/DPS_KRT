import React from "react";
import { useQuery } from "react-query";
import { creditPoint } from "../../api/Api";
import FormPage from "../../components/FormPage";
import MainSkeleton from "../../components/MainSkeleton";

const CreditPoint = () => {
  const { data, isLoading, isError, error } = useQuery(
    "creditPointFormData",
    creditPoint,
  );

  if (isLoading) return <MainSkeleton />;
  if (isError) return error?.message;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Done");
  };

  return (
    <FormPage
      formFieldsData={data.data}
      custSubmitFnc={handleSubmit}
      formTitle="Credit Point"
      submitBtnText={"Credit Point"}
    />
  );
};

export default CreditPoint;
