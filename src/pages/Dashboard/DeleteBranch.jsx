import { Modal } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { fetchBranches } from "../../api/Api";
import { Loading } from "../../components";
import MainSkeleton from "../../components/MainSkeleton";
import { ReactTable } from "../../components/ReactTable";
import { useStateContext } from "../../context/ContextProvider";
import useAuth from "../../hooks/useAuth";
import { lazyLoad } from "../../lazyLoad";
import { getTableCols, getTableData } from "../../reactTableFn";
import EditPage from "./EditPage";
// const ReactTable = lazyLoad("./components/ReactTable", "ReactTable");

const DeleteBranch = () => {
  try {
    const { openModal, setOpenModal } = useStateContext();
    const [branchID, setBranchID] = useState();
    const { user } = useAuth();
    // fetch employees fnc
    const {
      data: branches,
      isLoading,
      isError,
      error,
    } = useQuery("branches", () => fetchBranches(user.userId));

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
          tableName={"Edit Branch"}
          tableHooks={tableHooks}
        />
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <EditPage
            pageName={"Edit Branch"}
            route={`branch/editBranch/${branchID}`}
          />
        </Modal>
      </>
    );
  } catch (err) {
    console.error(err);
  }
};

export default DeleteBranch;
