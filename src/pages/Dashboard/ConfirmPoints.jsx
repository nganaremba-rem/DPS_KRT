import { Modal } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { pointRequestFromBM } from "../../api/Api";
import MainSkeleton from "../../components/MainSkeleton";
import { useStateContext } from "../../context/ContextProvider";
import { lazyLoad } from "../../lazyLoad";
import EditPage from "./EditPage";
// import { ReactTable } from "../../components/ReactTable";

const ReactTable = lazyLoad("./components/ReactTable", "ReactTable");

const ConfirmPoints = () => {
  const { openModal, setOpenModal } = useStateContext();
  const [id, setId] = useState();

  const {
    isLoading,
    isError,
    error,
    data: confirmPointsReq,
  } = useQuery("confirmPointsReq", pointRequestFromBM);

  // REACT-TABLE settting columns and data
  const columns = useMemo(
    () =>
      confirmPointsReq &&
      Object.keys(confirmPointsReq.data[0]).map((key) => {
        return {
          Header: key,
          accessor: key,
        };
      }),
    [confirmPointsReq?.data],
  );

  const data = useMemo(
    () => confirmPointsReq && [...confirmPointsReq.data],
    [confirmPointsReq?.data],
  );

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Edit",
        Header: "Edit",
        Cell: ({ row }) => {
          return (
            <button
              onClick={() => {
                setId(row.values.id);
                setOpenModal(true);
              }}
              className="bg-blue-500 text-white px-5 py-2 rounded-full"
            >
              Edit
            </button>
          );
        },
      },
      {
        id: "Accept",
        Header: "Accept",
        Cell: ({ row }) => {
          return (
            <button
              onClick={() => {
                alert("Accepted");
              }}
              className="bg-green-600 text-white px-5 py-2 rounded-full"
            >
              Accept
            </button>
          );
        },
      },
      {
        id: "reject",
        Header: "Reject",
        Cell: ({ row }) => {
          return (
            <button
              onClick={() => window.confirm("Are you sure you want to delete?")}
              className="bg-red-700 text-white px-5 py-2 rounded-full"
            >
              Reject
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
        tableName={"Confirm Point Request from Branch Manager"}
        tableHooks={tableHooks}
      />
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <EditPage
          pageName={"Edit Point"}
          onSubmitHandlerFnc={() => {}}
          route={`pointRequestFromBM/${id}`}
        />
      </Modal>
    </>
  );
};

export default ConfirmPoints;
