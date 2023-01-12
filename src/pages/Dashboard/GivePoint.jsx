import { Modal } from "@mui/material";
import React, { useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { givePoint, postGivePoint } from "../../api/Api";
import FormPage from "../../components/FormPage";
import MainSkeleton from "../../components/MainSkeleton";
import Success from "../../components/Success";
import useAuth from "../../hooks/useAuth";

const GivePoint = () => {
  const formRef = useRef();

  try {
    const { user } = useAuth();
    const [success, setSuccess] = useState(false);
    const { data, isLoading, isError, error } = useQuery(
      "givePoint",
      givePoint,
    );

    const {
      mutate,
      isLoading: isLoadingGivePoint,
      isError: isErrorGivePoint,
      error: errorGivePoint,
    } = useMutation({
      mutationFn: (data) => postGivePoint(data, user.userId),
    });

    const handleSubmit = (data) => {
      const finalData = {
        ...data,
        givePointUser: user.userId,
        giveDivCode: user.branchCode,
        rcvDivCode: user.branchCode,
      };
      mutate(finalData, {
        onSuccess: (res) => {
          console.log(res);
          formRef.current.reset();
          setSuccess(true);
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
        <Modal
          children={
            <>
              <Success />
            </>
          }
          open={success}
        />
        <FormPage
          formFieldsData={data.data}
          isLoading={isLoadingGivePoint}
          ref={formRef}
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
