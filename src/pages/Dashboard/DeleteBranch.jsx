import React, { useMemo } from "react";
import { useMutation, useQuery } from "react-query";
import { deleteBranch, fetchBranches } from "../../api/Api";
import ButtonWithLoading from "../../components/Form/ButtonWithLoading";
import MainSkeleton from "../../components/MainSkeleton";
import { ReactTable } from "../../components/ReactTable";
import useAuth from "../../hooks/useAuth";
import { useSnackbar } from "../../hooks/useSnackbar";
import { getTableCols, getTableData } from "../../reactTableFn";
// const ReactTable = lazyLoad("./components/ReactTable", "ReactTable");

const DeleteBranch = () => {
  try {
    const { user } = useAuth();
    const { setAlertOptions, openSnackbar } = useSnackbar();
    // fetch employees fnc
    const {
      data: branches,
      isLoading,
      isError,
      error,
    } = useQuery("branches", () => fetchBranches(user.userId));

    const { mutate, isLoading: isLoadingDeleting } = useMutation({
      mutationFn: (data) => deleteBranch(user.userId, data),
      onSuccess: (res) => {
        console.log(res);
        if (res?.data?.status?.code !== "200") {
          setAlertOptions({
            text: res?.data?.status?.subMessages[3],
            severity: "error",
          });
        } else {
          setAlertOptions({
            text: "Deleted Successfully",
            severity: "success",
          });
          queryClient.invalidateQueries("branches");
        }
        openSnackbar();
      },
    });

    const handleDeleteBranch = (id) => {
      const readyData = {
        branchCode: id,
      };
      mutate(readyData);
    };

    // REACT-TABLE settting columns and data
    const columns = useMemo(
      () => branches?.data?.response && getTableCols(branches.data?.response),
      [branches?.data?.response],
    );

    const data = useMemo(
      () => branches?.data?.response && getTableData(branches.data?.response),
      [branches?.data?.response],
    );

    const tableHooks = (hooks) => {
      hooks.visibleColumns.push((columns) => [
        ...columns,
        {
          id: "Delete",
          Header: "Delete",
          Cell: ({ row }) => {
            return (
              <ButtonWithLoading
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete?"))
                    handleDeleteBranch(row.values.divCd);
                }}
                text="Delete"
                color="error"
                isLoading={isLoadingDeleting}
              />
            );
          },
        },
      ]);
    };

    if (isLoading) return <MainSkeleton />;
    if (isError) return <h1>{error?.message}</h1>;

    return (
      <>
        <ReactTable
          columns={columns}
          data={data}
          tableName={"Delete Branch"}
          tableHooks={tableHooks}
        />
      </>
    );
  } catch (err) {
    console.error(err);
  }
};

export default DeleteBranch;
