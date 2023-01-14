import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { fetchRoles, updateRole } from "../../api/Api";
import ButtonWithLoading from "../../components/Form/ButtonWithLoading";
import FormContainer from "../../components/Form/FormContainer";
import TextField from "../../components/Form/TextField";
import useAuth from "../../hooks/useAuth";
import { useSnackbar } from "../../hooks/useSnackbar";

const EditRoleForm = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { setAlertOptions, openSnackbar } = useSnackbar();
  const { data: allRoles } = useQuery("roles", () => fetchRoles(user.userId));

  const currentRole = useMemo(() => {
    return allRoles?.data?.response?.filter((role) => role.roleCd === id)[0];
  }, [allRoles]);

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => updateRole(data, user.userId),
    onSuccess: (res) => {
      console.log(res);
      if (res?.status.toString() !== "200") {
        setAlertOptions({
          text: res?.data?.status?.subMessages[3],
          severity: "error",
        });
      } else {
        setAlertOptions({
          text: "Updated Role Sucessfully",
          severity: "success",
        });
        queryClient.invalidateQueries("roles");
      }
      openSnackbar();
    },
  });

  const handleUpdateRole = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    formData.privilegeCode = id;
    formData.enteredByUser = user.role;
    mutate(formData);
  };

  return (
    <FormContainer formName={"Edit Role " + id}>
      <form onSubmit={handleUpdateRole} className="grid md:grid-cols-2 gap-3">
        <TextField
          name={"nameOfPrivilege"}
          id={"nameOfPrivilege"}
          type={"text"}
          label={"Role Name"}
          required={true}
          defaultValue={currentRole?.roleNm}
        />
        <ButtonWithLoading
          isLoading={isLoading}
          text="Save changes"
          color="info"
        />
      </form>
    </FormContainer>
  );
};

export default EditRoleForm;
