import { useMutation } from "react-query";
import { createBranchPost } from "../../api/Api";
import ButtonWithLoading from "../../components/Form/ButtonWithLoading";
import FormContainer from "../../components/Form/FormContainer";
import TextField from "../../components/Form/TextField";
import useAuth from "../../hooks/useAuth";
import { useSnackbar } from "../../hooks/useSnackbar";

const CreateBranch = () => {
  const { setAlertOptions, openSnackbar } = useSnackbar();
  const { user } = useAuth();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => createBranchPost(data, user.userId),
    onSuccess: (res) => {
      if (res?.data?.status?.code !== "200") {
        setAlertOptions({
          text: res?.data?.status?.subMessages[3],
          severity: "error",
        });
      } else {
        setAlertOptions({
          text: "Created Branch Successfully",
          severity: "success",
        });
      }
      openSnackbar();
    },
  });

  const handleCreateBranch = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    mutate(formData);
  };

  return (
    <FormContainer formName={"Create New Branch"}>
      <form onSubmit={handleCreateBranch} className="grid md:grid-cols-2 gap-3">
        <TextField
          name={"branchOfficeCode"}
          id={"branchOfficeCode"}
          type={"text"}
          label={"Branch Office Code (営業所コード)"}
          required={true}
        />
        <TextField
          name={"branchOfficeName"}
          id={"branchOfficeName"}
          type={"text"}
          label={"Branch Office Name (営業所名)"}
          required={true}
        />
        <TextField
          name={"lockCode"}
          id={"lockCode"}
          type={"text"}
          label={"Lock Code (ロックコード)"}
          required={true}
        />
        <ButtonWithLoading isLoading={isLoading} text={"Create New Branch"} />
      </form>
    </FormContainer>
  );
};

export default CreateBranch;
