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

  const {
    mutate,
    isLoading: isLoadingCreating,
    isError: isErrorCreating,
    error: errorCreating,
  } = useMutation({
    mutationFn: (data) => createEmployeeApi(data, user.userId),
  });

  const { data: roleListData, isLoading: isLoadingRoleList } = useQuery(
    "roles",
    () => fetchRoles(user.userId),
  );
  const { data: branchListData, isLoading: isLoadingBranchList } = useQuery(
    "branches",
    () => fetchBranches(user.userId),
  );

  const formRef = useRef();

  const handleSubmit = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        console.log(res);
        formRef.current.reset();
        if (res?.data?.status?.code !== "500") {
          setAlertOptions(() => ({
            severity: "error",
            text: res?.data?.status?.message,
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
        key={v4()}
        ref={formRef}
        formFieldsData={data.data}
        formTitle="Create New Employee"
        submitBtnText={"Create"}
        custSubmitFnc={handleSubmit}
        SubmitButtonEndIcon={<AiOutlinePlusCircle />}
        extraData={{
          roleList: {
            data: roleListData,
            isLoading: isLoadingRoleList,
          },
          branchList: {
            data: branchListData,
            isLoading: isLoadingBranchList,
          },
        }}
      />
    </>
  );
};

export default CreateEmployee;
