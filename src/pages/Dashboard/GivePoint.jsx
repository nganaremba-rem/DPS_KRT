import React, { useRef } from "react";
import { useMutation, useQuery } from "react-query";
import { fetchDrivers, givePoint, postGivePoint } from "../../api/Api";
import FormPage from "../../components/FormPage";
import MainSkeleton from "../../components/MainSkeleton";
import useAuth from "../../hooks/useAuth";
import { useSnackbar } from "../../hooks/useSnackbar";

const GivePoint = () => {
  const formRef = useRef();
  const { setAlertOptions, openSnackbar } = useSnackbar();

  try {
    const { user } = useAuth();

    const { data, isLoading, isError, error } = useQuery(
      "givePoint",
      givePoint,
    );

    const { data: driversData, isLoading: isLoadingDrivers } = useQuery(
      "drivers",
      () => fetchDrivers(user.userId),
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
          if (res?.data?.status?.code !== "200") {
            setAlertOptions({
              severity: "error",
              text: res?.data?.status?.subMessages[3],
            });
          } else {
            setAlertOptions({
              severity: "success",
              text: "Success",
            });
            formRef.current.reset();
          }
          openSnackbar();
        },
      });
    };

    if (isLoading) return <MainSkeleton />;
    if (isError) return <h1>{error.message}</h1>;

    return (
      <>
        <FormPage
          formFieldsData={data.data}
          isLoading={isLoadingGivePoint}
          ref={formRef}
          formTitle="Give Point"
          submitBtnText={"Submit"}
          custSubmitFnc={handleSubmit}
          extraData={{
            drivers: {
              data: driversData,
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

export default GivePoint;
