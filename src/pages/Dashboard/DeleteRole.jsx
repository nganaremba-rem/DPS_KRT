import { Modal } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteRole, fetchRoles } from "../../api/Api";
import { Loading } from "../../components";
import ButtonWithLoading from "../../components/Form/ButtonWithLoading";
import MainSkeleton from "../../components/MainSkeleton";
import { ReactTable } from "../../components/ReactTable";
import { useStateContext } from "../../context/ContextProvider";
import useAuth from "../../hooks/useAuth";
import { useSnackbar } from "../../hooks/useSnackbar";
import { lazyLoad } from "../../lazyLoad";
import { getTableCols, getTableData } from "../../reactTableFn";
import EditPage from "./EditPage";

// const ReactTable = lazyLoad("./components/ReactTable", "ReactTable");

const DeleteRole = () => {
  try {
    const { openModal, setOpenModal } = useStateContext();
    const [roleId, setRoleId] = useState();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const { setAlertOptions, openSnackbar } = useSnackbar();
    // fetch roles fnc

    const {
      data: roles,
      isLoading,
      isError,
      error,
    } = useQuery("roles", () => fetchRoles(user.userId));

    const { mutate, isLoading: isLoadingDeletingRole } = useMutation({
      mutationFn: (data) => deleteRole(user.userId, data),
      onSuccess: (res) => {
        console.log(res);
        if (res?.data?.status?.code !== "200") {
          setAlertOptions({
            text: res?.data?.status?.subMessages[3],
            severity: "error",
          });
        } else {
          setAlertOptions({
            text: "Deleted Role Successfully",
            severity: "success",
          });
          queryClient.invalidateQueries("roles");
        }
        openSnackbar();
      },
    });

    const handleDeleteRole = (id) => {
      console.log(id);
      mutate({
        privilegeCode: id,
      });
    };

    // REACT-TABLE settting columns and data
    const columns = useMemo(
      () => roles?.data?.response && getTableCols(roles.data?.response),
      [roles?.data?.response],
    );

    const data = useMemo(
      () => roles?.data?.response && getTableData(roles.data?.response),
      [roles?.data?.response],
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
                isLoading={isLoadingDeletingRole}
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete?"))
                    handleDeleteRole(row.values.roleCd);
                }}
                text={"Delete"}
                color={"error"}
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
          tableName={"Edit Role"}
          tableHooks={tableHooks}
        />
      </>
    );
  } catch (err) {
    console.error(err);
    return <>ERROR</>;
  }
};

export default DeleteRole;
