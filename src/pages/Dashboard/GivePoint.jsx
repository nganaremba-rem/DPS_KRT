import React from "react";
import { useQuery } from "react-query";
import { givePoint } from "../../api/Api";
import FormPage from "../../components/FormPage";
import Loading from "../../components/Loading";
import MainSkeleton from "../../components/MainSkeleton";

const GivePoint = () => {
  try {
    const { data, isLoading, isError, error } = useQuery(
      "givePoint",
      givePoint,
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
          formTitle="Give Point"
          submitBtnText={"Submit"}
          custSubmitFnc={handleSubmit}
        />
      </>
    );
  } catch (err) {
    console.error(err);
    return <>ERROR</>;
  }
};

export default GivePoint;
