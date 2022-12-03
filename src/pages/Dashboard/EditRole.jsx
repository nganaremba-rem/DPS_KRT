import { Modal } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { fetchRoles } from "../../api/Api";
import { Loading } from "../../components";
import MainSkeleton from "../../components/MainSkeleton";
import { ReactTable } from "../../components/ReactTable";
import { useStateContext } from "../../context/ContextProvider";
import EditPage from "./EditPage";

const EditRole = () => {
  const { openModal, setOpenModal } = useStateContext();
  const [roleId, setRoleId] = useState();
  // fetch roles fnc

  const {
    data: roles,
    isLoading,
    isError,
    error,
  } = useQuery("roles", fetchRoles);

  // REACT-TABLE settting columns and data
  const columns = useMemo(
    () =>
      roles &&
      Object.keys(roles.data[0]).map((key) => {
        if (key === "Active State") {
          return {
            Header: key,
            accessor: key,
            Cell: ({ value }) => {
              const bgColor = value ? "bg-slate-500" : "bg-green-500";
              return (
                <div className="flex justify-center items-center">
                  <div
                    className={`w-5 h-5 text-center rounded-full ${bgColor} text-white`}
                  ></div>
                </div>
              );
            },
          };
        } else if (key === "Face Photo") {
          return {
            Header: key,
            accessor: key,
            Cell: ({ value }) => (
              <div className="w-12 h-12 overflow-hidden  rounded-full">
                <img
                  onClick={() => window.open(value)}
                  style={{
                    height: "100%",
                    objectFit: "cover",
                  }}
                  src={value}
                  alt=""
                />
              </div>
            ),
          };
        }
        return {
          Header: key,
          accessor: key,
        };
      }),
    [roles?.data],
  );

  const data = useMemo(() => roles && [...roles.data], [roles?.data]);

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
                setRoleId(row.values.id);
                setOpenModal(true);
              }}
              className="bg-violet-500 text-white px-5 py-2 rounded-full"
            >
              Edit
            </button>
          );
        },
      },
      {
        id: "Delete",
        Header: "Delete",
        Cell: ({ row }) => {
          return (
            <button
              onClick={() => window.confirm("Are you sure you want to delete?")}
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
};

export default EditRole;
