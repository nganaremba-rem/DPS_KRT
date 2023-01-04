import { Modal } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { fetchRoles } from "../../api/Api";
import { Loading } from "../../components";
import MainSkeleton from "../../components/MainSkeleton";
import { ReactTable } from "../../components/ReactTable";
import { useStateContext } from "../../context/ContextProvider";
import useAuth from "../../hooks/useAuth";
import { lazyLoad } from "../../lazyLoad";
import { getTableCols, getTableData } from "../../reactTableFn";
import EditPage from "./EditPage";

// const ReactTable = lazyLoad("./components/ReactTable", "ReactTable");

const DeleteRole = () => {
  try {
    const { openModal, setOpenModal } = useStateContext();
    const [roleId, setRoleId] = useState();
    const { user } = useAuth();
    // fetch roles fnc

    const {
      data: roles,
      isLoading,
      isError,
      error,
    } = useQuery("roles", () => fetchRoles(user.userId));

    // REACT-TABLE settting columns and data
    const columns = useMemo(
      () => roles?.data && getTableCols(roles.data),
      [roles?.data],
    );

    const data = useMemo(
      () => roles?.data && getTableData(roles.data),
      [roles?.data],
    );

    const tableHooks = (hooks) => {
      hooks.visibleColumns.push((columns) => [
        ...columns,
        {
          id: "Delete",
          Header: "Delete",
          Cell: ({ row }) => {
            return (
              <button
                onClick={() =>
                  window.confirm("Are you sure you want to delete?")
                }
                className="bg-red-700 text-white px-5 py-2 rounded-full"
              >
                Delete
              </button>
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
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <EditPage
            pageName={"Edit Roles"}
            onSubmitHandlerFnc={() => {}}
            route={`roles/${roleId}`}
          />
        </Modal>
      </>
    );
  } catch (err) {
    console.error(err);
    return <>ERROR</>;
  }
};

export default DeleteRole;
