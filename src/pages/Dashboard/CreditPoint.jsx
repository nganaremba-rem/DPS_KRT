import { Modal } from "@mui/material";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { assignCreditPoint, creditPoint } from "../../api/Api";
import FormPage from "../../components/FormPage";
import MainSkeleton from "../../components/MainSkeleton";
import useAuth from "../../hooks/useAuth";
import { TiTick } from "react-icons/ti";
import { useRef } from "react";
import Success from "../../components/Success";

const CreditPoint = () => {
  try {
    const { user } = useAuth();
    const [isSuccess, setIsSuccess] = useState(false);
    const formRef = useRef();

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
          setIsSuccess(true);
          formRef.current.reset();
          setTimeout(() => {
            setIsSuccess(false);
          }, 1000);
        },
        onError: (e) => {
          console.log(e);
        },
      });
    };

    return (
      <>
        <Modal
          open={isSuccess}
          children={
            <>
              <Success />
            </>
          }
        />
        <FormPage
          formId={"creditPoint"}
          ref={formRef}
          isLoading={isLoadingAssigningCredit}
          formFieldsData={data.data}
          custSubmitFnc={handleSubmit}
          formTitle="Credit Point"
          submitBtnText={"Credit Point"}
        />
      </>
    );
  } catch (err) {
    console.error(err);
    return <>ERROR</>;
  }
};

export default CreditPoint;
