import { Modal } from "@mui/material";
import React, { useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { fetchDrivers, givePoint, postGivePoint } from "../../api/Api";
import FormPage from "../../components/FormPage";
import MainSkeleton from "../../components/MainSkeleton";
import SnackbarCustom from "../../components/SnackbarCustom";
import Success from "../../components/Success";
import useAuth from "../../hooks/useAuth";

const GivePoint = () => {
  const formRef = useRef();
  const [toast, setToast] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const [alertOptions, setAlertOptions] = useState({
    text: "",
    severity: "success",
  });

  const handleClose = () => setToast((prev) => ({ ...prev, open: false }));
  const openSnackbar = () => setToast((prev) => ({ ...prev, open: true }));
  const { open, vertical, horizontal } = toast;

  try {
    const { user } = useAuth();
    const [success, setSuccess] = useState(false);

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
          formRef.current.reset();
          if (res?.data?.status?.code === "500") {
            setAlertOptions({
              severity: "error",
              text: res?.data?.status?.subMessages[3],
            });
          } else {
            setAlertOptions({
              severity: "success",
              text: "Success",
            });
          }
          // setSuccess(true);
          openSnackbar();
          // setTimeout(() => {
          //   setSuccess(false);
          // }, 1000);
        },
      });
    };

    if (isLoading) return <MainSkeleton />;
    if (isError) return <h1>{error.message}</h1>;

    return (
      <>
        {/* <Modal
          children={
            <>
              <Success />
            </>
          }
          open={success}
        /> */}
        <SnackbarCustom
          open={open}
          anchorOrigin={{ vertical, horizontal }}
          onClose={handleClose}
          alertText={alertOptions.text}
          severity={alertOptions.severity}
        />

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
