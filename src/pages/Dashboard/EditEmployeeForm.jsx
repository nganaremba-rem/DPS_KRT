import { useRef } from "react";
import { useMemo } from "react";
import { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { fetchBranches, fetchEmployees, updateUser } from "../../api/Api";
import ButtonWithLoading from "../../components/Form/ButtonWithLoading";
import DateInput from "../../components/Form/DateInput";
import FormContainer from "../../components/Form/FormContainer";
import SelectOption from "../../components/Form/SelectOption";
import TextField from "../../components/Form/TextField";
import useAuth from "../../hooks/useAuth";
import { useSnackbar } from "../../hooks/useSnackbar";

const EditEmployeeForm = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { setAlertOptions, openSnackbar } = useSnackbar();
  const formRef = useRef();
  // const {data: employeeDetail, isLoading: isLoadingEmployeeDetail} = useQuery(["employee", id], fetchEmployeesById )
  const { data: allEmployees } = useQuery("employee", () =>
    fetchEmployees(user.userId),
  );

  const emp = useMemo(
    () => allEmployees?.data?.response?.filter((emp) => emp.userId == id)[0],
    [allEmployees],
  );

  const { mutate, isLoading: isLoadingMutation } = useMutation({
    mutationFn: (data) => updateUser(data, user.userId),
    onSuccess: (res) => {
      if (res?.data?.status?.code !== "200") {
        setAlertOptions({
          text: res?.data?.status?.subMessages[3],
          severity: "error",
        });
      } else {
        setAlertOptions({
          text: "Updated Successfully",
          severity: "success",
        });
        queryClient.invalidateQueries("employee");
      }
      openSnackbar();
      console.log(res);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    formData.userId = id;
    mutate(formData);
  };

  return (
    <>
      <FormContainer formName={`Edit User: ${id}`}>
        <form
          onSubmit={handleSubmit}
          ref={formRef}
          className="grid md:grid-cols-2 gap-3"
        >
          <TextField
            label={"Username"}
            name="userName"
            id="userName"
            type="text"
            defaultValue={emp.userName}
            required={true}
          />
          <TextField
            label={"Division LC"}
            name="divisionLc"
            id="divisionLc"
            type="text"
            defaultValue={emp.divisionLc}
            required={true}
          />
          <SelectOption
            required={true}
            label={"Branch Office"}
            name="divCd"
            id={"divCd"}
            options={{
              label: "divNm",
              value: "divCd",
            }}
            fnc={fetchBranches}
            defaultValue={{
              label: allEmployees?.data?.response?.filter(
                (item) => item?.divCd?.divCd === emp?.divCd?.divCd,
              )[0].divCd.divNm,
              value: emp?.divCd?.divCd,
            }}
          />

          <TextField
            label={"Family Name"}
            name="userSurnm"
            id="userSurnm"
            type="text"
            defaultValue={emp.userSurnm}
            required={true}
          />
          <TextField
            label={"First Name"}
            name="userGivnm"
            id="userGivnm"
            type="text"
            defaultValue={emp.userGivnm}
            required={true}
          />
          <TextField
            label={"Furigana Family Name（カナ）"}
            name="userSurnmk"
            id="userSurnmk"
            type="text"
            defaultValue={emp.userSurnmk}
            required={true}
          />
          <TextField
            label={"Furigana of First Name（カナ）"}
            name="userGivnmk"
            id="userGivnmk"
            type="text"
            defaultValue={emp.userGivnmk}
            required={true}
          />
          <DateInput
            field={"Pass Expiry Date"}
            name="passExpDt"
            id="passExpDt"
            type="text"
            defaultValue={emp.passExpDt}
            required={true}
          />
          <ButtonWithLoading
            text={"Save changes"}
            color="success"
            isLoading={isLoadingMutation}
          />
        </form>
      </FormContainer>
    </>
  );
};

export default EditEmployeeForm;
