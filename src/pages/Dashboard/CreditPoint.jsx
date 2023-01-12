import { Modal } from "@mui/material";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  assignCreditPoint,
  creditPoint,
  fetchBranchManagers,
} from "../../api/Api";
import FormPage from "../../components/FormPage";
import MainSkeleton from "../../components/MainSkeleton";
import useAuth from "../../hooks/useAuth";
import { TiTick } from "react-icons/ti";
import { useRef } from "react";
import Success from "../../components/Success";
import SnackbarCustom from "../../components/SnackbarCustom";

const CreditPoint = () => {
  try {
    const { user } = useAuth();
    const [isSuccess, setIsSuccess] = useState(false);
    const formRef = useRef();
    const [alertOptions, setAlertOptions] = useState({
      text: "",
      severity: "success",
    });
    const [toast, setToast] = useState({
      open: false,
      anchorOrigin: { vertical: "top", horizontal: "right" },
    });

    const handleClose = () => setToast((prev) => ({ ...prev, open: false }));
    const openSnackbar = () => setToast((prev) => ({ ...prev, open: true }));

    const { data, isLoading, isError, error } = useQuery(
      "creditPointFormData",
      creditPoint,
    );

    const { data: branchManagerData, isLoading: isLoadingBranchManagers } =
      useQuery("branchManagers", () => fetchBranchManagers(user.userId));

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
        onSuccess: (res) => {
          console.log(res);
          // setIsSuccess(true);
          formRef.current.reset();
          if (res?.data?.status?.code !== "200") {
            setAlertOptions({
              text: res?.data?.status?.message,
              severity: "error",
            });
          } else {
            setAlertOptions({
              text: "Success",
              severity: "success",
            });
          }
          openSnackbar();
          // setTimeout(() => {
          //   setIsSuccess(false);
          // }, 1000);
        },
        onError: (e) => {
          console.log(e);
        },
      });
    };

    return (
      <>
        {/* <Modal
          open={isSuccess}
          children={
            <>
              <Success />
            </>
          }
        /> */}
        <SnackbarCustom
          open={toast.open}
          anchorOrigin={toast.anchorOrigin}
          onClose={handleClose}
          alertText={alertOptions.text}
          severity={alertOptions.severity}
        />
        <FormPage
          formId={"creditPoint"}
          ref={formRef}
          isLoading={isLoadingAssigningCredit}
          formFieldsData={data.data}
          custSubmitFnc={handleSubmit}
          formTitle="Credit Point"
          submitBtnText={"Credit Point"}
          extraData={{
            branchManagers: {
              data: branchManagerData,
            },
          }}
        />
      </>
    );
  } catch (err) {
    console.error(err);
    return <>ERROR</>;
  }
};

export default CreditPoint;
