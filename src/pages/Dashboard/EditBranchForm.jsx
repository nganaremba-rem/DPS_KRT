import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { fetchBranches, updateBranch } from "../../api/Api";
import ButtonWithLoading from "../../components/Form/ButtonWithLoading";
import FormContainer from "../../components/Form/FormContainer";
import TextField from "../../components/Form/TextField";
import useAuth from "../../hooks/useAuth";
import { useSnackbar } from "../../hooks/useSnackbar";

const EditBranchForm = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { setAlertOptions, openSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const { data: allBranches } = useQuery("branches", () =>
    fetchBranches(user.userId),
  );

  const currentBranch = useMemo(() => {
    return allBranches?.data?.response?.filter(
      (branch) => branch.divCd === id,
    )[0];
  }, [allBranches]);

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => updateBranch(data, user.userId),
    onSuccess: (res) => {
      if (res?.data?.status?.code !== "200") {
        setAlertOptions({
          text: res?.data?.status?.subMessages[3],
          severity: "error",
        });
      } else {
        setAlertOptions({
          text: "Updated Branch Sucessfully",
          severity: "success",
        });
        queryClient.invalidateQueries("branches");
      }
      openSnackbar();
    },
  });

  const handleUpdateBranch = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    formData.branchOfficeCode = id;
    console.log(formData);
    mutate(formData);
  };

  return (
    <FormContainer formName={`Edit Branch: ${id}`}>
      <form onSubmit={handleUpdateBranch} className="grid md:grid-cols-2 gap-3">
        <TextField
          name="branchOfficeName"
          id="branchOfficeName"
          label="Branch Office Name (営業所名)"
          required={true}
          defaultValue={currentBranch.divNm}
        />
        <TextField
          name="lockCode"
          id="lockCode"
          label="Lock Code (ロックコード)"
          required={true}
          defaultValue={currentBranch.lockCd}
        />
        <ButtonWithLoading
          isLoading={isLoading}
          text={"Save changes"}
          color={"info"}
        />
      </form>
    </FormContainer>
  );
};

export default EditBranchForm;
