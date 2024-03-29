import { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createRolePost } from "../../api/Api";
import ButtonWithLoading from "../../components/Form/ButtonWithLoading";
import FormContainer from "../../components/Form/FormContainer";
import TextField from "../../components/Form/TextField";
import useAuth from "../../hooks/useAuth";
import { useSnackbar } from "../../hooks/useSnackbar";

const CreateRole = () => {
  const { setAlertOptions, openSnackbar } = useSnackbar();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const formRef = useRef();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => createRolePost(data, user.userId),
    onSuccess: (res) => {
      console.log(res);
      if (res?.status?.toString() !== "200") {
        setAlertOptions({
          text: res?.data?.status?.subMessages[3],
          severity: "error",
        });
      } else {
        formRef.current.reset();
        setAlertOptions({
          text: "Created Role Successfully",
          severity: "success",
        });
        queryClient.invalidateQueries("roles");
      }
      openSnackbar();
    },
  });

  const handleCreateRole = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    formData.enteredByUser = user.role;
    mutate(formData);
  };

  return (
    <FormContainer formName={"Create New Role"}>
      <form
        ref={formRef}
        onSubmit={handleCreateRole}
        className="grid md:grid-cols-2 gap-3"
      >
        <TextField
          name={"privilegeCode"}
          id={"privilegeCode"}
          type={"text"}
          label={"Role Code"}
          required={true}
        />
        <TextField
          name={"nameOfPrivilege"}
          id={"nameOfPrivilege"}
          type={"text"}
          label={"Role Name"}
          required={true}
        />
        <ButtonWithLoading isLoading={isLoading} text={"Create New Role"} />
      </form>
    </FormContainer>
  );
};

export default CreateRole;
