import React, { useRef } from "react";
import { useMutation, useQuery } from "react-query";
import {
  assignCreditPoint,
  creditPoint,
  fetchBranchManagers,
} from "../../api/Api";
import FormPage from "../../components/FormPage";
import MainSkeleton from "../../components/MainSkeleton";
import useAuth from "../../hooks/useAuth";
import { useSnackbar } from "../../hooks/useSnackbar";

const CreditPoint = () => {
  try {
    const { user } = useAuth();
    const formRef = useRef();
    const { setAlertOptions, openSnackbar } = useSnackbar();

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
      const finalData = {
        ...data,
        giverID: user.userId,
        divCode: user?.divCd?.divCd,
      };
      mutate(finalData, {
        onSuccess: (res) => {
          console.log(res);
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
        },
        onError: (e) => {
          console.log(e);
        },
      });
    };

    return (
      <>
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
