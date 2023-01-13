import React, { useRef, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useMutation, useQuery } from "react-query";
import { v4 } from "uuid";
import {
  createEmployee,
  createEmployeeApi,
  fetchBranches,
  fetchRoles,
} from "../../api/Api";
import FormPage from "../../components/FormPage";
import MainSkeleton from "../../components/MainSkeleton";
import SnackbarCustom from "../../components/SnackbarCustom";
import useAuth from "../../hooks/useAuth";

const CreateEmployee = () => {
  const { user } = useAuth();
  const [toast, setToast] = useState({
    open: false,
  });
  const [alertOptions, setAlertOptions] = useState({
    text: "",
    severity: "success",
  });

  const { data, isLoading, isError, error } = useQuery(
    "createEmployee",
    createEmployee,
  );

  const handleClose = () => setToast((prev) => ({ ...prev, open: false }));
  const openSnackbar = () => setToast((prev) => ({ ...prev, open: true }));

  const [formData, setFormData] = useState({
    divCd: "B10",
    divisionLc: "213",
    email: "test@gmail.com",
    passExpDt: "2023-01-13T16:29",
    passWd: "sdf",
    roleCd: "admin",
    userGivnm: "sdf",
    userGivnmk: "sadf",
    userId: "sdzlklfs",
    userName: "lklsdakf",
    userSurnm: "FamName",
    userSurnmk: "saf",
  });

  const {
    mutate,
    isLoading: isLoadingCreating,
    isError: isErrorCreating,
    error: errorCreating,
  } = useMutation({
    mutationFn: (data) => createEmployeeApi(data, user.userId),
  });

  // const { data: roleListData, isLoading: isLoadingRoleList } = useQuery(
  //   "roles",
  //   () => fetchRoles(user.userId),
  // );
  // const { data: branchListData, isLoading: isLoadingBranchList } = useQuery(
  //   "branches",
  //   () => fetchBranches(user.userId),
  // );

  const formRef = useRef();

  const handleSubmit = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        console.log(res);
        // formRef.current.reset();
        if (res?.data?.status?.code !== "200") {
          setAlertOptions(() => ({
            severity: "error",
            text: res?.data?.status?.subMessages[3],
          }));
        } else {
          setAlertOptions(() => ({
            severity: "success",
            text: "Created Successfully",
          }));
        }
        openSnackbar();
      },
    });
  };

  if (isLoading) return <MainSkeleton />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <>
      <SnackbarCustom
        open={toast.open}
        severity={alertOptions.severity}
        alertText={alertOptions.text}
        onClose={handleClose}
      />

      <FormPage
        ref={formRef}
        isLoading={isLoadingCreating}
        formFieldsData={data.data}
        formTitle="Create New Employee"
        submitBtnText={"Create"}
        custSubmitFnc={handleSubmit}
        submitButtonEndIcon={<AiOutlinePlusCircle />}
        // extraData={{
        //   roleList: {
        //     data: roleListData,
        //     isLoading: isLoadingRoleList,
        //   },
        //   branchList: {
        //     data: branchListData,
        //     isLoading: isLoadingBranchList,
        //   },
        // }}
      />
    </>
  );
};

export default CreateEmployee;
