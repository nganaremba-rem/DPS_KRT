import React from "react";
import { useMutation, useQuery } from "react-query";
import { assignCreditPoint, creditPoint } from "../../api/Api";
import FormPage from "../../components/FormPage";
import MainSkeleton from "../../components/MainSkeleton";
import useAuth from "../../hooks/useAuth";

const CreditPoint = () => {
  try {
    const { user } = useAuth();
    const { data, isLoading, isError, error } = useQuery(
      "creditPointFormData",
      creditPoint,
    );

    const {
      mutate,
      isLoading: isLoadingAssigningCredit,
      isError: isErrorAssigningCredit,
      error: errorAssigningCredit,
    } = useMutation({
      mutationFn: (data) => assignCreditPoint(data, user.userId),
    });

    if (isLoading) return <MainSkeleton />;
    if (isError) return error?.message;

    const handleSubmit = (data) => {
      console.log("Logging Mydata");
      const finalData = {
        ...data,
        giverID: user.userId,
        divCode: user?.divCd?.divCd,
      };
      mutate(finalData, {
        onSuccess: (givePointPostResponse) => {
          console.log(givePointPostResponse);
          console.log("Success");
        },
        onError: (e) => {
          console.log(e);
        },
      });
    };

    return (
      <FormPage
        formId={"creditPoint"}
        formFieldsData={data.data}
        custSubmitFnc={handleSubmit}
        formTitle="Credit Point"
        submitBtnText={"Credit Point"}
      />
    );
  } catch (err) {
    console.error(err);
    return <>ERROR</>;
  }
};

export default CreditPoint;
