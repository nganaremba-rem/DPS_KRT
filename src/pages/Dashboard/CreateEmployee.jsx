import { useState } from "react";
import { useMutation } from "react-query";
import { createEmployeeApi, fetchBranches, fetchRoles } from "../../api/Api";
import ButtonWithLoading from "../../components/Form/ButtonWithLoading";
import DateInput from "../../components/Form/DateInput";
import FormContainer from "../../components/Form/FormContainer";
import SelectOption from "../../components/Form/SelectOption";
import TextField from "../../components/Form/TextField";
import SnackbarCustom from "../../components/SnackbarCustom";
import useAuth from "../../hooks/useAuth";
import { AiOutlinePlusCircle } from "react-icons/ai";

const CreateEmployee = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({});
  const [toast, setToast] = useState({
    open: false,
  });
  const [alertOptions, setAlertOptions] = useState({
    text: "",
    severity: "success",
  });

  const openSnackbar = () => setToast((prev) => ({ ...prev, open: true }));
  const handleClose = () => setToast((prev) => ({ ...prev, open: false }));

  //   ! onSubmit
  const { mutate, isLoading: isLoadingCreatingUser } = useMutation({
    mutationFn: (data) => createEmployeeApi(data, user.userId),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    mutate(formData, {
      onSuccess: (res) => {
        console.log(res);
        if (res?.data?.status?.code !== "200") {
          setAlertOptions({
            text: res.data.status.message,
            severity: "error",
          });
        } else {
          setAlertOptions({
            text: "Created Successfully",
            severity: "success",
          });
        }
        openSnackbar();
      },
    });
  };

  return (
    <>
      <SnackbarCustom
        alertText={alertOptions.text}
        onClose={handleClose}
        open={toast.open}
        severity={alertOptions.severity}
      />

      <FormContainer formName="Create Employee">
        <form
          onSubmit={handleSubmit}
          action=""
          className="grid md:grid-cols-2 gap-3"
        >
          <TextField
            label="User ID"
            name={"userId"}
            id="userId"
            type="text"
            onChange={setFormData}
            required={true}
            state={formData}
          />
          <TextField
            label="Employee Name"
            name={"userName"}
            id="userName"
            type="text"
            required={true}
            onChange={setFormData}
            state={formData}
          />
          <TextField
            label="Password"
            name={"passWd"}
            id="passWd"
            type="password"
            required={true}
          />
          <TextField
            label="PIN"
            name={"divisionLc"}
            id="divisionLc"
            type="text"
            required={true}
          />
          <SelectOption
            label={"Type of User"}
            name="roleCd"
            id={"roleCd"}
            queryKey={"roles"}
            fnc={fetchRoles}
            options={{
              label: "roleNm",
              value: "roleCd",
            }}
            required={true}
          />
          <SelectOption
            label={"Branch Office Code"}
            name="divCd"
            id={"divCd"}
            queryKey={"branches"}
            fnc={fetchBranches}
            options={{
              label: "divNm",
              value: "divCd",
            }}
            required={true}
          />
          <TextField
            label="Family Name"
            name={"userSurnm"}
            id="userSurnm"
            type="text"
            required={true}
          />
          <TextField
            label="First Name"
            name={"userGivnm"}
            id="userGivnm"
            type="text"
            required={true}
          />
          <TextField
            label="Furigana Family Name（カナ）"
            name={"userSurnmk"}
            id="userSurnmk"
            type="text"
            required={true}
          />
          <TextField
            label="Furigana of First Name（カナ）"
            name={"userGivnmk"}
            id="userGivnmk"
            type="text"
            required={true}
          />
          <TextField
            label="Email Address"
            name={"email"}
            id="email"
            type="email"
            required={true}
          />
          <DateInput
            field={"Pass Expiry Date"}
            id="passExpDt"
            name={"passExpDt"}
            required={true}
          />
          <ButtonWithLoading
            isLoading={isLoadingCreatingUser}
            text={"Create"}
            endIcon={<AiOutlinePlusCircle />}
          />
        </form>
      </FormContainer>
    </>
  );
};

export default CreateEmployee;
